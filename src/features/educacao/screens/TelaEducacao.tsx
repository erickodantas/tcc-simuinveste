import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Appbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { secoesEducacionais } from '../data/catalogoEducacional';
import { ConteudoEducacional } from '../types/ConteudoEducacional';
import { ModalEducacao } from '../components/ModalEducacao';
import { styles as globalStyles } from '../../../common/styles/AppStyles';
import { styles } from '../styles/EducacaoStyles';
import { useProgresso } from '../../../contexts/ProgressoContext';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function TelaEducacaoInicial() {
  const { nivelAtual, evoluirNivel } = useProgresso();
  const [conteudoAtivo, setConteudoAtivo] = useState<ConteudoEducacional | null>(null);
  const [secaoAtivaId, setSecaoAtivaId] = useState<string | null>(null);
  const [quizzesAcertados, setQuizzesAcertados] = useState<string[]>([]);
  const [secoesExpandidas, setSecoesExpandidas] = useState<string[]>([]);

  const toggleSecao = (id: string, bloqueada: boolean) => {
    if (bloqueada) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSecoesExpandidas(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const abrirConteudo = (conteudo: ConteudoEducacional, secaoId: string) => {
    setSecaoAtivaId(secaoId);
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

  useEffect(() => {
    if (!secaoAtivaId) return;
    const secao = secoesEducacionais.find(s => s.id === secaoAtivaId);
    if (!secao) return;

    const quizzesDaSecao = secao.conteudos.filter(c => c.tipo === 'quiz');
    if (quizzesDaSecao.length === 0) return;

    const completouTodos = quizzesDaSecao.every(q => quizzesAcertados.includes(q.id));
    if (completouTodos && secao.nivel === nivelAtual) {
      evoluirNivel(secao.nivel + 1);
    }
  }, [quizzesAcertados, secaoAtivaId, nivelAtual, evoluirNivel]); 

  return (
    <View style={globalStyles.container}>
      <ScrollView style={styles.scroll}>
        {secoesEducacionais.map((secao) => {
          const isBloqueada = secao.nivel > nivelAtual;
          const isExpandida = secoesExpandidas.includes(secao.id);

          return (
            <View key={secao.id} style={[styles.secaoContainer, isBloqueada && { opacity: 0.5 }]}>
              {/* CABEÇALHO DA GAVETA (ACCORDION) */}
              <TouchableOpacity 
                style={styles.cabecalhoSecao} 
                onPress={() => toggleSecao(secao.id, isBloqueada)}
                activeOpacity={isBloqueada ? 1 : 0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <MaterialCommunityIcons 
                    name={isBloqueada ? 'lock' : (isExpandida ? 'folder-open' : 'folder')} 
                    size={24} 
                    color={isBloqueada ? '#999' : '#333'} 
                  />
                  <Text style={[styles.secaoTitulo, isBloqueada && { color: '#999' }]}>
                    {secao.titulo} (Nível {secao.nivel})
                  </Text>
                </View>
                {!isBloqueada && (
                  <MaterialCommunityIcons 
                    name={isExpandida ? 'chevron-up' : 'chevron-down'} 
                    size={24} 
                    color="#666" 
                  />
                )}
              </TouchableOpacity>
              
              {/* CONTEÚDOS DA SEÇÃO (EXIBIDOS APENAS SE EXPANDIDA) */}
              {isExpandida && (
                <View style={styles.conteudoGaveta}>
                  {secao.conteudos.map((conteudo) => {
                    const isQuiz = conteudo.tipo === 'quiz';
                    const jaAcertou = quizzesAcertados.includes(conteudo.id);

                    return (
                      <TouchableOpacity 
                        key={conteudo.id} 
                        style={styles.itemRetangulo}
                        activeOpacity={0.7}
                        onPress={() => abrirConteudo(conteudo, secao.id)}
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
              )}
            </View>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>

      <ModalEducacao 
        visivel={!!conteudoAtivo} 
        conteudo={conteudoAtivo} 
        aoFechar={() => setConteudoAtivo(null)}
        quizJaAcertado={conteudoAtivo ? quizzesAcertados.includes(conteudoAtivo.id) : false}
        aoAcertarQuiz={registrarAcerto}
      />
    </View>
  );
}