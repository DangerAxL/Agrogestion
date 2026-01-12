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
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    list: {
        marginLeft: 10,
    },
    listItem: {
        fontSize: 12,
        marginBottom: 5,
    },
});

interface Props {
    breedsByLot: Record<string, Record<string, number>>;
    chartImage: string;
}

const BreedsReportPdf: React.FC<Props> = ({ breedsByLot, chartImage }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Breeds Report</Text>
            <Text>Breeds distribution by lot</Text>
            {chartImage && <Image style={styles.chart} src={chartImage} />}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Details</Text>
                {Object.entries(breedsByLot).map(([lotName, breeds]) => (
                    <View key={lotName} style={styles.section}>
                        <Text style={styles.sectionTitle}>{lotName}</Text>
                        <View style={styles.list}>
                            {Object.entries(breeds).map(([breedName, count]) => (
                                <Text key={breedName} style={styles.listItem}>
                                    {breedName}: {count}
                                </Text>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default BreedsReportPdf;