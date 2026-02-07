'use client';
import { BasicTable } from '@/app/_components/Tables/BasicTable';
import { useExcelExport } from '@/app/_hooks/useExcelExport ';
import useQueryString from '@/app/_hooks/useQueryString';
import { PaginationType } from '@/app/_models/PaginationType';
import { Get, Post } from '@/app/_services/BasicHttpServices';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

type Props = {
    id: string;
};

const ResendAction = ({ id }: Props) => {
    const router = useRouter();
    const SendModal = (id: string) => {
        Swal.fire({
            title: 'Do you want to send the changes?',
            showCancelButton: true,
            confirmButtonText: 'Send'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const sendAction = async () => {
                    const response = await Post('Operation', { id: id });
                    if (response) {
                        Swal.fire('Send!', 'Data is successfully transfered', 'success');
                        router.refresh();
                    } else {
                        Swal.fire('Error!', 'Something went wrong', 'error');
                    }
                };
                sendAction();
            }
        });
    };
    return (
        <td>
            <Link
                onClick={(e) => {
                    e.preventDefault();
                    SendModal(id);
                }}
                href={''}
                style={{ cursor: 'pointer' }}
            >
                Re Send
            </Link>
        </td>
    );
};

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
    
    const formatDateTime = (value: string) => {
        if (!value || !value.includes('T')) return 'N/A';
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
                roDate: formatDateTime(item.roDate),
                receivedDatetime: formatDateTime(item.receivedDatetime)
            }))
        };
    };

    const { exportTableToExcel } = useExcelExport();

    const handleExportToExcel = async () => {
        await exportTableToExcel({
            tableId: 'basicTable',
            fileName: 'Failed List Report',
            sheetName: 'Failed List Report'
        });
    };

    return (
        <div className="col-12 xl:col-12">
            <div className="card">
                <div className="row">
                    <div className="col-12">
                        <form className="grid formgrid" onSubmit={generateQueryString}>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="roDateFrom" className="mb-2">
                                    RO Date From
                                </label>
                                <input type="date" id="roDateFrom" name="roDateFrom" className="p-inputtext p-component" />
                            </div>
                            <div className="field col-12 md:col-6 flex flex-column">
                                <label htmlFor="roDateTo" className="mb-2">
                                    RO Date To
                                </label>
                                <input type="date" id="roDateTo" name="roDateTo" className="p-inputtext p-component" />
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
                                <label htmlFor="ceirId" className="mb-2">
                                    RO No
                                </label>
                                <input type="text" id="ceirId" name="ceirId" className="p-inputtext p-component" />
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
                            api={'Operation/FailedList'}
                            displayData={['ceirid', 'receivedDatetime', 'maccsCEIRID', 'roNo', 'roDate', 'cd', 'ct', 'at', 'rf', 'sendBy', 'sentDatetime', 'id', 'csCode', 'av']}
                            fetch={async (url) => {
                                const response = await Get(url + '&' + queryString);
                                return transformUserData(response);
                            }}
                            actionComponent={ResendAction}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
