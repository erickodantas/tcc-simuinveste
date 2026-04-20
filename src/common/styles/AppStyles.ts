import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    content: { padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
    input: { marginBottom: 15, backgroundColor: '#fff' },
    button: { marginTop: 20, paddingVertical: 6, borderRadius: 8 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
    loadingText: { marginTop: 10, fontSize: 16, color: '#555' },
    
    card: { marginBottom: 20, backgroundColor: '#fff', borderRadius: 16, elevation: 2 },
    resultLabel: { fontSize: 16, color: '#666', textTransform: 'uppercase', letterSpacing: 1 },
    resultValue: { fontSize: 36, fontWeight: 'bold', color: '#69c6dd', marginBottom: 20, marginTop: 5 },
    detailLabel: { fontSize: 14, color: '#777', marginTop: 8 },
    detailValue: { fontSize: 18, fontWeight: '600', marginBottom: 4, color: '#333' },
    
    chartTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 24, color: '#333' },
    chartContainer: { marginTop: 16, padding: 16, backgroundColor: '#ffffff', borderRadius: 16, elevation: 2 },
    
    header: {
        backgroundColor: '#fff',
        elevation: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    
    investmentCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#f0f0f0'
    },
    cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#69c6dd', marginBottom: 16 }, 
    cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
    cardLabel: { fontSize: 14, color: '#666' },
    cardValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    
    riskTag: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, fontWeight: '600', fontSize: 12, overflow: 'hidden' },
    riskLow: { color: '#1b5e20', backgroundColor: '#e8f5e9' },
    
    placeholderContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
    placeholderIcon: { marginBottom: 16 }, 
    placeholderText: { fontSize: 16, color: '#777', textAlign: 'center', maxWidth: '80%' },
});