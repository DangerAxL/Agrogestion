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
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
});

interface Feeding {
    id: number;
    quantity: number;
    date: string;
    animal: {
        name: string;
    };
    feed_type: {
        name: string;
    };
}

interface Props {
    feedings: Feeding[];
    weightGains: Record<string, {
        daily: number;
        monthly: number;
        semesterly: number;
    }>;
}

const FeedingsReportPdf: React.FC<Props> = ({ feedings, weightGains }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Feedings Report</Text>
            <Text>Monitor feeding activities</Text>
            <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <View style={[styles.tableCol, { width: '20%' }]}>
                        <Text style={styles.tableCell}>Animal</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '20%' }]}>
                        <Text style={styles.tableCell}>Feed Type</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '15%' }]}>
                        <Text style={styles.tableCell}>Quantity</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '20%' }]}>
                        <Text style={styles.tableCell}>Date</Text>
                    </View>
                </View>
                {feedings.map((feeding) => (
                    <View key={feeding.id} style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '20%' }]}>
                            <Text style={styles.tableCell}>{feeding.animal.name}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '20%' }]}>
                            <Text style={styles.tableCell}>{feeding.feed_type.name}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '15%' }]}>
                            <Text style={styles.tableCell}>{feeding.quantity}</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '20%' }]}>
                            <Text style={styles.tableCell}>{feeding.date}</Text>
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Weight Gains Summary</Text>
                {Object.entries(weightGains).map(([feedType, gains]) => (
                    <Text key={feedType} style={{ fontSize: 12, marginBottom: 5 }}>
                        {feedType}: Daily {gains.daily.toFixed(2)} kg • Monthly {gains.monthly.toFixed(2)} kg • Semesterly {gains.semesterly.toFixed(2)} kg
                    </Text>
                ))}
            </View>
        </Page>
    </Document>
);

export default FeedingsReportPdf;