import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    table: {
        width: 'auto',
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
    },
    tableCell: {
        fontSize: 10,
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
    },
});

interface Supply {
    id: number;
    name: string;
    category: string;
    quantity: number;
    unit: string;
}

interface Props {
    supplies: Supply[];
}

const SuppliesReportPdf: React.FC<Props> = ({ supplies }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Supplies Report</Text>
            <Text style={{ marginBottom: 10 }}>Inventory status of supplies</Text>
            <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <View style={[styles.tableCol, { width: '40%' }]}>
                        <Text style={styles.tableCell}>Name</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '30%' }]}>
                        <Text style={styles.tableCell}>Category</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '30%' }]}>
                        <Text style={styles.tableCell}>Quantity / Unit</Text>
                    </View>
                </View>
                {supplies.map((supply) => (
                    <View key={supply.id} style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '40%' }]}>
                            <Text style={styles.tableCell}>{supply.name}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '30%' }]}>
                            <Text style={styles.tableCell}>{supply.category}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '30%' }]}>
                            <Text style={styles.tableCell}>{supply.quantity} {supply.unit}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default SuppliesReportPdf;
