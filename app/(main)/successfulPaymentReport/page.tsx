//v2
'use client';

import { BasicTable } from '@/app/_components/Tables/BasicTable';
import { useExcelExport } from '@/app/_hooks/useExcelExport ';
import useQueryString from '@/app/_hooks/useQueryString';

import { Post } from '@/app/_services/BasicHttpServices';
import { useState } from 'react';

const Page = () => {
    const { exportTableToExcel } = useExcelExport();
    const { queryString, generateQueryString } = useQueryString();

    const formatDateTime = (value: string | null | undefined) => {
        if (!value ) return 'N/A';
        const [date, time] = value.split('T');
        const formattedTime = time?.split('.')[0];
        return `${date} ${formattedTime}`;
    };

    const transformUserData = (data: any) => {
        // Since your API doesn't return paginated data, we need to handle it differently
        if (Array.isArray(data)) {
            return {
                data: data.map((item) => ({
                    ...item,
                   
                     ceirId: item.CeirId,
                      notificationDateTime: formatDateTime(item.NotificationDateTime || item.DateTime),
            releaseOrderNumber: item.ReleaseOrderNumber,
            sumCt: item.SUM_CT,
            sumCd: item.SUM_CD,
            sumAit: item.SUM_AIT,
            sumRf: item.SUM_RF
                })),
                totalCount: data.length,
                pageIndex: 0,
                pageSize: data.length
            };
        }
        return data;
    };

    // Convert query string to Post data
    const getPostData = () => {
        console.warn('Query String:', queryString);
        if (!queryString) {
            return {
                beginDate: '2000-01-01',
                endDate: '2100-12-30'
            };
        }
        const params = new URLSearchParams(queryString);
        return {
            beginDate: params.get('sentDateFrom') || '2020-01-01',
            endDate: params.get('sentDateTo') || '2100-12-30'
        };
    };

    const handleExportToExcel = async () => {
        await exportTableToExcel({
            tableId: 'basicTable',
            fileName: 'Successful_Payment_Report',
            sheetName: 'Successful Payment Report'
        });
    };

    return (
        <div className="col-12 xl:col-12">
            <div className="card">
                <div className="row">
                    <div className="col-12">
                        <form className="grid formgrid" onSubmit={generateQueryString}>
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

                            <div className="field col-12">
                                <div className="flex justify-content-end gap-2">
                                    <button type="submit" className="p-button p-component p-button-primary">
                                        Filter
                                    </button>
                                    {/* <button type="button" className="p-button p-component p-button-secondary" onClick={handleExportToExcel}>
                                        Export to Excel
                                    </button> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <BasicTable
                            api={'sussessfulPayments'}
                            displayData={['ceirId','notificationDateTime', 'releaseOrderNumber', 'sumCt', 'sumCd', 'sumAit', 'sumRf', 'csCode', 'av']}
                            fetch={async (url) => {
                                const baseUrl = url.split('?')[0];
                                const postData = getPostData();
                                const response = await Post(baseUrl, postData);
                                console.log("post",response);
                                return transformUserData(response);
                            }}
                            key={queryString} // re-render when queryString changes
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
