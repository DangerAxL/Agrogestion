import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

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
    chart: {
        marginBottom: 20,
        width: '100%',
        height: 300,
    },
    table: {
        width: 'auto',
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
    },
    tableCell: {
        fontSize: 12,
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
    },
});

interface LotStats {
    id: number;
    name: string;
    total_animals: number;
    active_animals: number;
    inactive_animals: number;
    average_weight: number;
}

interface Props {
    lotsStats: LotStats[];
    chartImage: string;
}

const LotsReportPdf: React.FC<Props> = ({ lotsStats, chartImage }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Lots Report</Text>
            <Text>Lot statistics overview</Text>
            {chartImage && <Image style={styles.chart} src={chartImage} />}
            <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Name</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Total Animals</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Active Animals</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Average Weight</Text>
                    </View>
                </View>
                {lotsStats.map((lot) => (
                    <View key={lot.id} style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{lot.name}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{lot.total_animals}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{lot.active_animals}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{lot.average_weight.toFixed(2)}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default LotsReportPdf;