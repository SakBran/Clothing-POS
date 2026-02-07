'use client';
import React, { useEffect, useState } from 'react';
import './style.css';
import { PaginationType } from '../../_models/PaginationType';
import NameConvert from '../../_services/NameConvert';
import LoadingPage from '@/app/(main)/loading';

//ဒီနေရမှာ Ant Designက Table သုံးလဲရတယ် Depedencyနဲနိုင်သမျှနဲအောင် လုပ်သာအကောင်းဆုံးပဲ
//Fetch လုပ်တာလဲ ပြချင်တဲ့ Column ကို Display Dataထဲထည့်ပေးရုံပဲ
//Fetch ကထွက်လာတဲ့ Databindingကလဲ အဆင်ပြေအောင် Componentအပြင်ပဲထုတ်ထားတယ်

export type TableFunctionType = (api: string) => Promise<PaginationType>;
interface PropsType {
    displayData: string[];
    api: string;
    fetch: (url: string) => Promise<PaginationType>;
    actionComponent?: React.FC<{ id: string }>; // add this props for userTableAction
}

export const BasicTable: React.FC<PropsType> = ({
    displayData,
    api,
    fetch,
    actionComponent // add this props for userTableAction
}) => {
    const intialValue: PaginationType = {
        data: [],
        pageIndex: 0,
        pageSize: 0,
        totalCount: 0,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false,
        sortColumn: '',
        sortOrder: '',
        filterColumn: '',
        filterQuery: ''
    };
    const [loading, setloading] = useState<boolean>(false);
    const [sortColumn, setSortColumn] = useState(displayData[1]);
    const [sortDirection, setSortDirection] = useState('desc');

    const [filterColumn, setFilterColumn] = useState(displayData[0]);
    const [filterQuery, setFilterQuery] = useState('');

    const [searchValue, setSearchValue] = useState('');

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [data, setData] = useState<PaginationType>(intialValue);

    const [url, setUrl] = useState('');
    const Permission = localStorage.getItem('permission');

    //ဒီထဲကParameterက Dotnet Core ထဲကPagination Getနဲ့ညှိပေးထားတာ
    //တကယ်လို့ပြင်ချင်ရင် Parameter တွေပြင်သုံးပေါ့
    useEffect(() => {
        let temp = `${api}?pageIndex=${pageIndex}&pageSize=${pageSize}`;

        if (sortColumn !== '') {
            temp = temp + `&sortColumn=${sortColumn}&sortOrder=${sortDirection}`;
        }
        if (filterQuery !== '' && filterColumn !== '') {
            temp = temp + `&filterColumn=${filterColumn}&filterQuery=${filterQuery}`;
        }
        setUrl(temp);
    }, [sortColumn, sortDirection, pageSize, pageIndex, filterColumn, filterQuery, api]);

    useEffect(() => {
        setloading(true);
        const call = async () => {
            try {
                if (url !== '') {
                    const temp = await fetch(url);
                    if (temp && temp.data && temp.data.length > 0) {
                        // Data exists, proceed with setting it
                        setData(temp);
                        setloading(false);
                    } else {
                        // Handle empty or invalid data'
                        setData(intialValue);
                        console.warn('No data available or invalid response');
                        setloading(false);
                    }
                }
            } catch (ex) {
                console.error('Error fetching data:', ex);
                setloading(false);
            }
        };
        call();
    }, [fetch, url]);
    const handleSort = (column: string) => {
        setSortColumn(column);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    return (
        <>
            <div className="table-container">
                <table id="basicTable">
                    <thead>
                        <tr>
                            <td>No</td>
                            {displayData.map((display: string, i) => {
                                if (display !== 'id') {
                                    return (
                                        <td key={i} onClick={() => handleSort(display)}>
                                            {NameConvert(display)}
                                            {sortColumn === display && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                                        </td>
                                    );
                                } else {
                                    return '';
                                }
                            })}
                            {displayData.includes('id') && Permission !== 'Operator' && <td>Action</td>}
                        </tr>
                    </thead>

                    {!loading && data && (
                        <tbody>
                            {data.data?.map((row, index) => {
                                const data = displayData.map((display: string, i) => {
                                    if (display !== 'id') {
                                        const cellValue = row[display];
                                        return <td key={i}>{cellValue?.toString() ?? 'N/A'}</td>;
                                    } else {
                                        return '';
                                    }
                                });

                                return (
                                    <tr key={row['id']}>
                                        <td>{index + 1 + pageIndex * pageSize}</td>
                                        {data}
                                        {/* <TableAction id={row['id']} /> */}

                                        {actionComponent && Permission !== 'Operator' ? actionComponent({ id: row['id'] }) : null}
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}

                    {loading && (
                        <tbody>
                            {Array.from({ length: Math.min(pageSize, 100) }).map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td>
                                        <div className="skeleton skeleton-text">
                                            <img src={`/layout/images/table-skeleton.svg`} alt="..." height="12" className="mr-2" />
                                        </div>
                                    </td>
                                    {displayData.map((display, colIndex) => {
                                        if (display !== 'id') {
                                            return (
                                                <td key={colIndex}>
                                                    <div className="skeleton skeleton-text">
                                                        <img src={`/layout/images/table-skeleton.svg`} alt="..." height="12" className="mr-2" />
                                                    </div>
                                                </td>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                    {displayData.includes('id') && Permission !== 'Operator' && (
                                        <td>
                                            <div className="skeleton skeleton-button">
                                                <img src={`/layout/images/table-skeleton.svg`} alt="..." height="12" className="mr-2" />
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

            <div className="pagination">
                <div
                    className="compact-pagination"
                    style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        justifyContent: 'center', // Center horizontally
                        padding: '10px 0',
                        fontSize: '14px'
                    }}
                >
                    <button
                        style={{
                            padding: '5px 10px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: pageIndex === 0 ? '#e0e0e0' : '#007bff',
                            color: '#fff',
                            cursor: pageIndex === 0 ? 'not-allowed' : 'pointer',
                            opacity: pageIndex === 0 ? 0.6 : 1
                        }}
                        disabled={pageIndex === 0}
                        onClick={() => setPageIndex(0)}
                    >
                        &laquo; First
                    </button>
                    <button
                        style={{
                            padding: '5px 10px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: pageIndex === 0 ? '#e0e0e0' : '#007bff',
                            color: '#fff',
                            cursor: pageIndex === 0 ? 'not-allowed' : 'pointer',
                            opacity: pageIndex === 0 ? 0.6 : 1
                        }}
                        disabled={pageIndex === 0}
                        onClick={() => setPageIndex(pageIndex - 1)}
                    >
                        &lt;
                    </button>
                    <span>
                        {pageIndex + 1} / {data.totalPages}
                    </span>
                    <button
                        style={{
                            padding: '5px 10px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: !data.hasNextPage ? '#e0e0e0' : '#007bff',
                            color: '#fff',
                            cursor: !data.hasNextPage ? 'not-allowed' : 'pointer',
                            opacity: !data.hasNextPage ? 0.6 : 1
                        }}
                        disabled={!data.hasNextPage}
                        onClick={() => setPageIndex(pageIndex + 1)}
                    >
                        &gt;
                    </button>
                    <button
                        style={{
                            padding: '5px 10px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: pageIndex === data.totalPages - 1 ? '#e0e0e0' : '#007bff',
                            color: '#fff',
                            cursor: pageIndex === data.totalPages - 1 ? 'not-allowed' : 'pointer',
                            opacity: pageIndex === data.totalPages - 1 ? 0.6 : 1
                        }}
                        disabled={pageIndex === data.totalPages - 1}
                        onClick={() => setPageIndex(data.totalPages - 1)}
                    >
                        Last &raquo;
                    </button>
                    <select
                        style={{
                            padding: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#fff',
                            cursor: 'pointer'
                        }}
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                        {[5, 10, 20, 50, 100, 1000, 10000].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
};
