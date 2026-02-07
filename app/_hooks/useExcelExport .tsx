import { useCallback } from 'react';
import ExcelJS from 'exceljs';
import { getCurrentDateString } from '../_services/GetCurrentDateTime';

interface ExcelExportOptions {
    tableId: string;
    fileName: string;
    sheetName?: string;
    includeTimestamp?: boolean;
}

export const useExcelExport = () => {
    const exportTableToExcel = useCallback(async ({ tableId, fileName, sheetName = 'Report', includeTimestamp = true }: ExcelExportOptions) => {
        console.log('Exporting to Excel...');

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(sheetName);

        const table = document.getElementById(tableId) as HTMLTableElement;
        if (!table) {
            console.error(`Table with id "${tableId} not found.`);
            return;
        }

        const rows = Array.from(table.rows);

        // Add header row with styling
        if (rows.length > 0) {
            const headerCells = Array.from(rows[0].cells).map((cell) => cell.textContent || '');
            const headerRow = worksheet.addRow(headerCells);
            headerRow.font = { bold: true };
            headerRow.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' }
            };
        }

        // Add data rows
        for (let i = 1; i < rows.length; i++) {
            const cells = Array.from(rows[i].cells).map((cell) => cell.textContent || '');
            worksheet.addRow(cells);
        }

        // Auto-fit columns
        worksheet.columns.forEach((column) => {
            column.width = 15;
        });

        // Generate and download file
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        const timestamp = includeTimestamp ? `_${getCurrentDateString()} ` : '';
        a.download = `${fileName}${timestamp}.xlsx`;

        a.click();
        window.URL.revokeObjectURL(url);
        console.log('Export completed.');
    }, []);

    return { exportTableToExcel };
};

// const exportToExcel = async () => {
//     console.log('Exporting to Excel...');
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('CEIRD Report');

//     const table = document.getElementById('basicTable') as HTMLTableElement;
//     if (!table) return;

//     const rows = Array.from(table.rows);

//     // Add header row with styling
//     if (rows.length > 0) {
//         const headerCells = Array.from(rows[0].cells).map((cell) => cell.textContent || '');
//         const headerRow = worksheet.addRow(headerCells);
//         headerRow.font = { bold: true };
//         headerRow.fill = {
//             type: 'pattern',
//             pattern: 'solid',
//             fgColor: { argb: 'FFE0E0E0' }
//         };
//     }

//     // Add data rows
//     for (let i = 1; i < rows.length; i++) {
//         const cells = Array.from(rows[i].cells).map((cell) => cell.textContent || '');
//         worksheet.addRow(cells);
//     }

//     // Auto-fit columns
//     worksheet.columns.forEach((column) => {
//         column.width = 15;
//     });

//     // Generate and download file
//     const buffer = await workbook.xlsx.writeBuffer();
//     const blob = new Blob([buffer], {
//         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     const time = getCurrentDateString();
//     a.download = 'CEIRD_Report_' + time + '.xlsx';
//     a.click();
//     window.URL.revokeObjectURL(url);
//     console.log('Export completed.');
// };
