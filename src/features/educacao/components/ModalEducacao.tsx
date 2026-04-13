import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "react-native-paper";
import { ConteudoEducacional } from "../data/mockEducacao";
import { styles } from "../styles/EducacaoStyles";

interface Props {
  visivel: boolean;
  conteudo: ConteudoEducacional | null;
  aoFechar: () => void;
  quizJaAcertado?: boolean;
  aoAcertarQuiz?: (id: string) => void;
}

export function ModalConteudoAnimado({
  visivel,
  conteudo,
  aoFechar,
  quizJaAcertado,
  aoAcertarQuiz,
}: Props) {
  const theme = useTheme();
  const animacaoFlip = useRef(new Animated.Value(0)).current;
  const [virado, setVirado] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);
  const [animando, setAnimando] = useState(false);


  const frontAnimatedStyle = useMemo(
    () => ({
      transform: [
        {
          rotateY: animacaoFlip.interpolate({
            inputRange: [0, 180],
            outputRange: ["0deg", "180deg"],
          }),
        },
      ],
    }),
    [animacaoFlip],
  );

  const backAnimatedStyle = useMemo(
    () => ({
      transform: [
        {
          rotateY: animacaoFlip.interpolate({
            inputRange: [0, 180],
            outputRange: ["180deg", "360deg"],
          }),
        },
      ],
    }),
    [animacaoFlip],
  );

  useEffect(() => {
    if (visivel && conteudo) {
      const jaAcertou = quizJaAcertado || false;
      setVirado(jaAcertou);
      setOpcaoSelecionada(
        jaAcertou && conteudo.tipo === "quiz"
          ? conteudo.indiceRespostaCorreta!
          : null,
      );
      animacaoFlip.setValue(jaAcertou ? 180 : 0);
      setAnimando(false);
    }
  }, [visivel, conteudo?.id]);
  if (!conteudo) return null;

  const flipCard = (callback?: () => void) => {
    setAnimando(true); // 1. Dá a ordem para tirar a sombra
    animacaoFlip.stopAnimation();
    setTimeout(() => {
      Animated.spring(animacaoFlip, {
        toValue: virado ? 0 : 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setAnimando(false);
          if (callback) callback();
        }
      });
    }, 50);
    setVirado(!virado);
  };

  const handleOpcaoQuiz = (index: number) => {
    if (quizJaAcertado) return;

    setOpcaoSelecionada(index);
    flipCard(() => {
      if (index === conteudo.indiceRespostaCorreta && aoAcertarQuiz) {
        aoAcertarQuiz(conteudo.id);
      }
    });
  };

  const isQuiz = conteudo.tipo === "quiz";
  const acertouAgora =
    isQuiz && opcaoSelecionada === conteudo.indiceRespostaCorreta;

  return (
    <Modal
      transparent
      visible={visivel}
      animationType="fade"
      onRequestClose={aoFechar}
    >
      <TouchableWithoutFeedback onPress={aoFechar}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.cardContainer}>
              {/* FRENTE DO CARD */}
              <Animated.View
                pointerEvents={virado ? "none" : "auto"}
                style={[
                  styles.card,
                  styles.cardFace,
                  frontAnimatedStyle,
                  { elevation: animando ? 0 : 5 },
                ]}
              >
                {/* Container Flexível para o Texto (Empurra o resto para baixo) */}
                <View style={styles.centroCard}>
                  <Text style={styles.tituloSecundario}>
                    {isQuiz ? "Quiz" : "Flashcard"}
                  </Text>
                  <Text style={styles.pergunta}>{conteudo.pergunta}</Text>
                </View>

                {/* Container do Rodapé (Fixo na parte inferior) */}
                <View style={styles.rodapeCard}>
                  {isQuiz ? (
                    <View style={styles.opcoesContainer}>
                      {conteudo.opcoes?.map((opcao, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.botaoOpcao,
                            quizJaAcertado &&
                              index === conteudo.indiceRespostaCorreta &&
                              styles.botaoCorreto,
                          ]}
                          onPress={() => handleOpcaoQuiz(index)}
                          disabled={quizJaAcertado}
                        >
                          <Text style={styles.textoOpcao}>
                            {opcao}{" "}
                            {quizJaAcertado &&
                            index === conteudo.indiceRespostaCorreta
                              ? "✓"
                              : ""}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.botaoVirar}
                      onPress={() => flipCard()}
                    >
                      <Text style={{ color: theme.colors.primary }}>
                        Toque para virar
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </Animated.View>

              {/* VERSO DO CARD */}
              <Animated.View
                pointerEvents={virado ? "auto" : "none"}
                style={[
                  styles.card,
                  styles.cardFace,
                  styles.cardBack,
                  backAnimatedStyle,
                  { elevation: animando ? 0 : 5 },
                ]}
              >
                {isQuiz ? (
                  <View style={styles.conteudoVerso}>
                    {acertouAgora || quizJaAcertado ? (
                      <View style={styles.sucessoContainer}>
                        <Text
                          style={[styles.resultadoTitulo, { color: "green" }]}
                        >
                          Correto! ✓
                        </Text>
                        <Text style={styles.perguntaVerso}>
                          {conteudo.pergunta}
                        </Text>
                        <View
                          style={[
                            styles.botaoOpcao,
                            styles.botaoCorreto,
                            { width: "100%", padding: 12 },
                          ]}
                        >
                          <Text style={styles.textoOpcao}>
                            {conteudo.opcoes?.[conteudo.indiceRespostaCorreta!]}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.botaoRefazer}
                          onPress={aoFechar}
                        >
                          <Text style={{ color: theme.colors.primary }}>
                            Fechar e continuar
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <>
                        <Text
                          style={[styles.resultadoTitulo, { color: "red" }]}
                        >
                          Incorreto ✗
                        </Text>
                        <Text style={styles.explicacao}>
                          {conteudo.explicacaoErro}
                        </Text>
                        <TouchableOpacity
                          style={styles.botaoRefazer}
                          onPress={() => flipCard()}
                        >
                          <Text style={{ color: theme.colors.primary }}>
                            Tentar novamente
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.conteudoVerso}
                    onPress={() => flipCard()}
                    activeOpacity={0.9}
                  >
                    <Text style={styles.resposta}>{conteudo.resposta}</Text>
                  </TouchableOpacity>
                )}
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
