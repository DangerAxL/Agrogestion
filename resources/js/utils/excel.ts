import * as XLSX from 'xlsx';

export const exportToExcel = <T>(
    data: T[],
    columns: { key: keyof T; header: string }[],
    filename: string
) => {
    // Map data to rows based on columns
    const rows = data.map((item) => {
        const row: Record<string, any> = {};
        columns.forEach((col) => {
            // Handle nested properties if key contains dots (e.g., 'lot.name')
            const keys = (col.key as string).split('.');
            let value: any = item;
            for (const k of keys) {
                value = value?.[k];
            }
            row[col.header] = value;
        });
        return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
};
