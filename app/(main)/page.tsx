/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../_services/AxiosInstance';
import Swal from 'sweetalert2';

interface GetDailyResponse {
    sent: number;
    notSent: number;
    failed: number;
    ceirid: number;
    sentList: CustomsData[];
    ceiridList: CeiridFromIrd[];
}

interface CustomsData {
    id: string;
    receivedDatetime?: string; // ISO format DateTime string
    ceirid?: string;
    oldCeirid?: string;
    maccsCeirid?: string;
    roNo?: string;
    roDate?: string;
    cd?: number;
    ct?: number;
    at?: number;
    rf?: number;
    sendBy?: string;
    sendById?: string;
    sentDatetime?: string;
    remark?: string;
    editBy?: string;
    editById?: string;
    editDatetime?: string;
    status?: string;
    editCeirid?: string;
}

interface CeiridFromIrd {
    id: string;
    ceirid: string;
    receivedDatetime: string;
    isSent: boolean;
    sendDatetime?: string;
}

const Dashboard = () => {
    const [data, setData] = useState<GetDailyResponse>();

    useEffect(() => {
        const dailyRequestAPI = async () => {
            const resp = await axiosInstance.get('Dashboard');
            if (resp.status < 200 || resp.status >= 300) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            }
            const tempData = await resp.data;
            setData(tempData);
        };
        dailyRequestAPI();
    }, []);

    const formatCurrency = (value: number) => {
        return value?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const formatDateTime = (value?: string | null) => {
    if (!value || !value.includes('T')) return ' ';
    const [date, time] = value.split('T');
    const formattedTime = time?.split('.')[0]; 
    return `${date} ${formattedTime}`;
};

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Sent</span>
                            <div className="text-900 font-medium text-xl">{data?.sent}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-file-export text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Today </span>
                    <span className="text-500">sent count</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Failed</span>
                            <div className="text-900 font-medium text-xl">{data?.failed}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-ban text-orange-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Today </span>
                    <span className="text-500">failed count</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Not Sent</span>
                            <div className="text-900 font-medium text-xl">{data?.notSent}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-wrench text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Today </span>
                    <span className="text-500">not sent count</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">CEIRID From IRD</span>
                            <div className="text-900 font-medium text-xl">{data?.ceirid}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-clone text-purple-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Today </span>
                    <span className="text-500">total count for CEIRID from IRD</span>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Today Sent list</h5>
                    <DataTable value={data?.sentList} rows={5} paginator responsiveLayout="scroll">
                        <Column field="ceirid" header="CEIR ID" sortable style={{ width: '35%' }} />
                        {/* <Column field="sentDatetime" header="Sent Datetime" sortable style={{ width: '35%' }} body={(data) => formatCurrency(data.price)} /> */}
                        <Column field="sentDatetime" header="Sent Datetime" sortable style={{ width: '35%' }} body={(rowData) => formatDateTime(rowData.sentDatetime)}
                        />
                    </DataTable>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Today CEIRID Sent list from IRD</h5>
                    <DataTable value={data?.ceiridList} rows={5} paginator responsiveLayout="scroll">
                        <Column field="ceirid" header="CEIR ID" sortable style={{ width: '35%' }} />
                        <Column field="receivedDatetime" header="Received Datetime" sortable style={{ width: '35%' }} />
                        <Column field="isSent" header="Is Sent" sortable style={{ width: '30%' }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
