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

interface Animal {
    id: number;
    caravana: string;
    breed?: {
        name: string;
    };
    lot?: {
        name: string;
    };
    weight_entry: number;
    weight_current: number;
    status: string;
    active: boolean;
    entry_date?: string;
    withdrawal_date?: string;
}

interface Props {
    animals: Animal[];
}

const AnimalsReportPdf: React.FC<Props> = ({ animals }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Animals Report</Text>
            <Text>Inventory of all animals</Text>
            <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <View style={[styles.tableCol, { width: '15%' }]}>
                        <Text style={styles.tableCell}>Caravana</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '15%' }]}>
                        <Text style={styles.tableCell}>Breed</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '15%' }]}>
                        <Text style={styles.tableCell}>Lot</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '15%' }]}>
                        <Text style={styles.tableCell}>Status</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '10%' }]}>
                        <Text style={styles.tableCell}>Active</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '15%' }]}>
                        <Text style={styles.tableCell}>Weight Entry</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '15%' }]}>
                        <Text style={styles.tableCell}>Weight Current</Text>
                    </View>
                </View>
                {animals.map((animal) => (
                    <View key={animal.id} style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '15%' }]}>
                            <Text style={styles.tableCell}>{animal.caravana}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '15%' }]}>
                            <Text style={styles.tableCell}>{animal.breed?.name || ''}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '15%' }]}>
                            <Text style={styles.tableCell}>{animal.lot?.name || ''}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '15%' }]}>
                            <Text style={styles.tableCell}>{animal.status}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '10%' }]}>
                            <Text style={styles.tableCell}>{animal.active ? 'Yes' : 'No'}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '15%' }]}>
                            <Text style={styles.tableCell}>{animal.weight_entry}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '15%' }]}>
                            <Text style={styles.tableCell}>{animal.weight_current}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default AnimalsReportPdf;