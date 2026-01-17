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

interface Weighing {
    id: number;
    weight: number;
    date: string;
    animal: {
        name: string;
    };
}

interface Props {
    weighings: Weighing[];
}

const WeighingsReportPdf: React.FC<Props> = ({ weighings }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Weighings Report</Text>
            <Text style={{ marginBottom: 10 }}>Track animal weight changes</Text>
            <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <View style={[styles.tableCol, { width: '40%' }]}>
                        <Text style={styles.tableCell}>Animal</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '30%' }]}>
                        <Text style={styles.tableCell}>Weight (kg)</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '30%' }]}>
                        <Text style={styles.tableCell}>Date</Text>
                    </View>
                </View>
                {weighings.map((weighing) => (
                    <View key={weighing.id} style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '40%' }]}>
                            <Text style={styles.tableCell}>{weighing.animal.name}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '30%' }]}>
                            <Text style={styles.tableCell}>{weighing.weight}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '30%' }]}>
                            <Text style={styles.tableCell}>{weighing.date}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default WeighingsReportPdf;
