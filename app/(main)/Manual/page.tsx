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
    const [stationCode, setStationCode] = useState("");
    const stationCodes = [
        { code: 'A1', name: 'HEAD QUARTER' },
        { code: 'A3', name: 'YANGON AIRPORT(IM&EX CUSTOMS WAREHOUSE)' },
        { code: 'A4', name: 'YANGON AIRPORT(EXPORT CUSTOMS WAREHOUSE)' },
        { code: 'A5', name: 'THILAWA SPECIAL ECONOMIC ZONE' },
        { code: 'H1', name: 'MYAWADDY OFFICE' },
        { code: 'H9', name: 'KAYIN (BONDED WAREHOUSE)' },
        { code: 'L9', name: 'MON (BONDED WAREHOUSE)' }, 
        { code: 'H2', name: 'MYAWADDY BORDER CONTROL FACILITIES' },
        { code: 'A6', name: 'DRY PORT YANGON' },
        { code: 'K6', name: 'DRY PORT MANDALAY' },
        { code: 'A9', name: 'HEAD QUARTER (BONDED WAREHOUSE)' },
        { code: 'N1', name: 'MUSE OFFICE' },
        { code: 'N3', name: 'CHIN SHWE HAW OFFICE' },
        { code: 'N8', name: 'TAUNG GYI OFFICE' },
        { code: 'D7', name: 'BAGO CHECK POINT' },
        { code: 'K9', name: 'MANDALAY (BONDED WAREHOUSE)' },
        { code: 'N2', name: 'TACHILEIK OFFICE' },
        { code: 'N4', name: 'KENG TUNG OFFICE' },
        { code: 'K1', name: 'MANDALAY OFFICE' },
        { code: 'Q1', name: 'KAWTHAUNG OFFICE' },
        { code: 'Q2', name: 'MYEIK OFFICE' },
        { code: 'Q8', name: 'TANINTHARYI OFFICE ' },
        { code: 'B1', name: 'NAY PYI TAW OFFICE' }
    ];

    const formatDateTime = (value: string | null | undefined) => {
        if (!value || !value.includes('T')) return 'N/A'; // fallback if null, empty, or invalid
        const [date, time] = value.split('T');
        const formattedTime = time?.split('.')[0];
        return `${date} ${formattedTime}`;
    };
    const transformUserData = (data: PaginationType): PaginationType => {
        return {
            ...data,
            data: data.data.map((item) => ({
                ...item,
                isSent: item.isSent === true ? 'Yes' : item.isSent === false ? 'No' : 'No',
                sendDatetime: formatDateTime(item.sendDatetime),
                receivedDatetime: formatDateTime(item.receivedDatetime)
            }))
        };
    };

    const { exportTableToExcel } = useExcelExport();

    const handleExportToExcel = async () => {
        await exportTableToExcel({
            tableId: 'basicTable',
            fileName: 'CEIRD Report',
            sheetName: 'CEIRD Report'
        });
    };

    return (
        <div className="col-12 xl:col-12">
            <div className="card">
                <div className="row">
                    <div className="col-12">
                        <form className="grid formgrid" onSubmit={generateQueryString}>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="receivedDatetimeFrom" className="mb-2">
                                    Received Date From
                                </label>
                                <input type="date" id="receivedDatetimeFrom" name="receivedDatetimeFrom" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="receivedDatetimeTo" className="mb-2">
                                    Received Date To
                                </label>
                                <input type="date" id="receivedDatetimeTo" name="receivedDatetimeTo" className="p-inputtext p-component" />
                            </div>
                             <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="ceirId" className="mb-2">
                                    CEIR ID
                                </label>
                                <input type="text" id="ceirId" name="ceirId" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="releaseOrderNo" className="mb-2">
                                    Release Order No
                                </label>
                                <input type="text" id="releaseOrderNo" name="releaseOrderNo" className="p-inputtext p-component" />
                            </div>
                             <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="stationCode" className="mb-2">
                                    StationCode
                                </label>
                                <select
                                    id="stationCode"
                                    name="stationCode"
                                    className="p-inputtext p-component"
                                    value={stationCode}
                                    onChange={(e) => setStationCode(e.target.value)}
                                >
                                    <option value="">-- Select Station Code --</option>
                                    {stationCodes.map((station) => (
                                        <option key={station.code} value={station.code}>
                                            {station.code} : {station.name}
                                        </option>
                                    ))}
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
                            api={'ManualData/Filter'}
                            displayData={['ceirid', 'releaseOrderNo','receivedDatetime','cd', 'ct', 'at', 'rf', 'userId','csCode', 'av']}
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
