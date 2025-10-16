//estilos

import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    content: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    input: { marginBottom: 15 },
    button: { marginTop: 20, paddingVertical: 8 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 10, fontSize: 16 },
    card: { marginBottom: 20 },
    resultLabel: { fontSize: 18, color: '#333' },
    resultValue: { fontSize: 32, fontWeight: 'bold', color: '#6200ee', marginBottom: 20 },
    detailLabel: { fontSize: 16, color: '#555' },
    detailValue: { fontSize: 18, fontWeight: '500', marginBottom: 10 },
    chartTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
    chartContainer: { marginTop: 20, padding: 10, backgroundColor: '#fff', borderRadius: 10 },
});

export default styles;