import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  scroll: {
    padding: 16,
  },
  secaoContainer: {
    marginBottom: 32,
  },
  secaoTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  itemRetangulo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  itemIconeNome: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemTitulo: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: '85%',
    height: 460,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    position: "absolute",
    backfaceVisibility: "hidden",
  },
  cardFace: {
    padding: 24,
  },
  centroCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rodapeCard: {
    width: '100%',
    marginTop: 16,
  },
  cardBack: {
    transform: [{ rotateY: "180deg" }],
  },
  tituloSecundario: {
    fontSize: 14,
    color: "#888",
    marginBottom: 16,
    textAlign: "center",
    textTransform: "uppercase",
  },
  pergunta: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginVertical: 10, 
  },
  resposta: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
    lineHeight: 26,
  },
  botaoVirar: {
    alignItems: "center",
    padding: 12,
  },
  conteudoVerso: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  opcoesContainer: {
    gap: 10,
  },
  botaoOpcao: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    width: "100%",
  },
  botaoCorreto: {
    backgroundColor: "#e8f5e9",
    borderColor: "#4caf50",
  },
  textoOpcao: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  resultadoTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  explicacao: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },
  botaoRefazer: {
    padding: 16,
    marginTop: 16,
  },
  sucessoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  perguntaVerso: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
    fontStyle: "italic",
  },
  cabecalhoSecao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  conteudoGaveta: {
    paddingLeft: 16,
    marginTop: 8,
  },
});