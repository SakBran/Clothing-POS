'use client';
import { BasicTable } from '@/app/_components/Tables/BasicTable';
import useQueryString from '@/app/_hooks/useQueryString';
import { PaginationType } from '@/app/_models/PaginationType';
import { Get } from '@/app/_services/BasicHttpServices';
import React, { useState } from 'react';
import ExcelJS from 'exceljs';
import { getCurrentDateString } from '@/app/_services/GetCurrentDateTime';
import { useExcelExport } from '@/app/_hooks/useExcelExport ';

const Page = () => {
    const { queryString, generateQueryString } = useQueryString();

    const formatDateTime = (value: string) => {
        if (!value) return '';
        const [date, time] = value.split('T');
        const formattedTime = time?.split('.')[0];
        return `${date} ${formattedTime}`;
    };
    const transformUserData = (data: PaginationType): PaginationType => {
        return {
            ...data,
            data: data.data.map((item) => ({
                ...item,
                isSent: item.isSent == 'True' ? 'Yes' : item.isSent == 'False' ? 'isSent' : 'No',
                sentDatetime: formatDateTime(item.sentDatetime),
                receivedDatetime: formatDateTime(item.receivedDatetime)
            }))
        };
    };

    const { exportTableToExcel } = useExcelExport();

    const handleExportToExcel = async () => {
        await exportTableToExcel({
            tableId: 'basicTable',
            fileName: 'Delete List Report',
            sheetName: 'Delete List Report'
        });
    };

    return (
        <div className="col-12 xl:col-12">
            <div className="card">
                <div className="row">
                    <div className="col-12">
                        <form className="grid formgrid" onSubmit={generateQueryString}>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="fromDate" className="mb-2">
                                    Delete Date From
                                </label>
                                <input type="date" id="fromDate" name="fromDate" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="toDate" className="mb-2">
                                    Delete Date To
                                </label>
                                <input type="date" id="toDate" name="toDate" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="sentDateFrom" className="mb-2">
                                    Sent Date From
                                </label>
                                <input type="date" id="sentDateFrom" name="sentDateFrom" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="sentDateTo" className="mb-2">
                                    Sent Date To
                                </label>
                                <input type="date" id="sentDateTo" name="sentDateTo" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="ceirId" className="mb-2">
                                    CEIR ID
                                </label>
                                <input type="text" id="ceirId" name="ceirId" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="isSent" className="mb-2">
                                    Is Sent
                                </label>
                                <select id="isSent" name="isSent" className="p-inputtext p-component">
                                    <option value="true">Sent</option>
                                    <option value="false">Not Sent</option>
                                </select>
                            </div>
                            <div className="field col-12">
                                <div className="flex justify-content-end gap-2">
                                    <button type="submit" className="p-button p-component p-button-primary">
                                        Filter
                                    </button>
                                    <button type="button" className="p-button p-component p-button-secondary" onClick={handleExportToExcel}>
                                        Export to Excel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <BasicTable
                            api={'DeleteLogs/Filter'}
                            displayData={['ceirid', 'receivedDatetime', 'isSent', 'sendDatetime']}
                            fetch={async (url) => {
                                const response = await Get(url + '&' + queryString);
                                return transformUserData(response);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
