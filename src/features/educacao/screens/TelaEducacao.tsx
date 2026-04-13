import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { secoesEducacionais, ConteudoEducacional } from '../data/mockEducacao';
import { ModalConteudoAnimado } from '../components/ModalEducacao';
import { styles as globalStyles } from '../../../common/styles/AppStyles';
import { styles } from '../styles/EducacaoStyles';

export function TelaEducacaoInicial() {
  const [conteudoAtivo, setConteudoAtivo] = useState<ConteudoEducacional | null>(null);
  const [quizzesAcertados, setQuizzesAcertados] = useState<string[]>([]); // Estado em memória temporário

  const abrirConteudo = (conteudo: ConteudoEducacional) => {
    setConteudoAtivo(conteudo);
  };

  const registrarAcerto = (id: string) => {
    setQuizzesAcertados((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  return (
    <View style={globalStyles.container}>
      <Appbar.Header style={{ backgroundColor: '#fff', elevation: 0 }}>
        <Appbar.Content title="Aprender" />
      </Appbar.Header>

      <ScrollView style={styles.scroll}>
        {secoesEducacionais.map((secao) => (
          <View key={secao.id} style={styles.secaoContainer}>
            <Text style={styles.secaoTitulo}>{secao.titulo}</Text>
            
            {secao.conteudos.map((conteudo) => {
              const isQuiz = conteudo.tipo === 'quiz';
              const jaAcertou = quizzesAcertados.includes(conteudo.id);

              return (
                <TouchableOpacity 
                  key={conteudo.id} 
                  style={styles.itemRetangulo}
                  activeOpacity={0.7}
                  onPress={() => abrirConteudo(conteudo)}
                >
                  <View style={styles.itemIconeNome}>
                    <MaterialCommunityIcons 
                      name={isQuiz ? 'help-circle-outline' : 'cards-outline'} 
                      size={24} 
                      color={isQuiz ? '#e91e63' : '#2196f3'} 
                    />
                    <Text style={styles.itemTitulo}>{conteudo.titulo}</Text>
                  </View>
                  
                  {isQuiz && jaAcertou && (
                    <MaterialCommunityIcons name="check-circle" size={20} color="green" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>

      <ModalConteudoAnimado 
        visivel={!!conteudoAtivo} 
        conteudo={conteudoAtivo} 
        aoFechar={() => setConteudoAtivo(null)}
        quizJaAcertado={conteudoAtivo ? quizzesAcertados.includes(conteudoAtivo.id) : false}
        aoAcertarQuiz={registrarAcerto}
      />
    </View>
  );
}

