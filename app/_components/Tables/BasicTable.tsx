'use client';
import React, { useEffect, useState } from 'react';
import './style.css';
import { PaginationType } from '../../_models/PaginationType';
import NameConvert from '../../_services/NameConvert';
import LoadingPage from '@/app/(main)/loading';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

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
    // parse displayData entries like "name:အမည်" => { field: "name", label: "အမည်" }
    const parsedDisplay = displayData.map((d) => {
        const parts = d.split(':');
        return {
            field: parts[0].trim(),
            label: parts[1] ? parts.slice(1).join(':').trim() : undefined // support colons in label
        };
    });

    const [loading, setloading] = useState<boolean>(false);
    const [sortColumn, setSortColumn] = useState(parsedDisplay[1]?.field ?? parsedDisplay[0]?.field ?? '');
    const [filterColumn, setFilterColumn] = useState(parsedDisplay[0]?.field ?? '');

    const [sortDirection, setSortDirection] = useState('desc');
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

    const filterOptions = parsedDisplay
        .filter((p) => p.field !== 'id')
        .map((p) => ({
            label: p.label ?? NameConvert(p.field),
            value: p.field
        }));

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '12px'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center'
                    }}
                >
                    <Dropdown
                        value={filterColumn}
                        options={filterOptions}
                        onChange={(e) => {
                            setFilterColumn(e.value);
                            setPageIndex(0);
                        }}
                        placeholder="Column"
                        style={{ minWidth: '180px' }}
                    />

                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            value={filterQuery}
                            onChange={(e) => {
                                setFilterQuery(e.target.value);
                                setPageIndex(0);
                            }}
                            placeholder="Search..."
                        />
                    </span>
                </div>
            </div>
            <div className="table-container">
                <table id="basicTable">
                    {/* <thead>
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
                    </thead> */}
                    <thead>
                        <tr>
                            <th>စဥ်</th>
                            {parsedDisplay.map((p, i) => {
                                if (p.field !== 'id') {
                                    return (
                                        <th key={i} onClick={() => handleSort(p.field)} style={{ cursor: 'pointer', userSelect: 'none' }}>
                                            {p.label ?? NameConvert(p.field)}
                                            {sortColumn === p.field && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                                        </th>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                            {parsedDisplay.some((p) => p.field === 'id') && Permission !== 'Operator' && <th>ဆောက်ရွက်ရန်</th>}
                        </tr>
                    </thead>

                    {!loading && data && (
                        <tbody>
                            {data.data?.map((row, index) => {
                                const cells = parsedDisplay.map((p, i) => {
                                    if (p.field !== 'id') {
                                        const cellValue = row[p.field];
                                        return <td key={i}>{cellValue?.toString() ?? 'N/A'}</td>;
                                    } else {
                                        return null;
                                    }
                                });

                                return (
                                    <tr key={row['id'] ?? index}>
                                        <td>{index + 1 + pageIndex * pageSize}</td>
                                        {cells}
                                        {actionComponent && Permission !== 'Operator' && <td>{React.createElement(actionComponent, { id: row['id'] })}</td>}
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}

                    {loading && (
                        <tbody>
                            <tr>
                                <td>
                                    <div className="skeleton skeleton-text">
                                        <img src={`/layout/images/table-skeleton.svg`} alt="..." height="12" className="mr-2" />
                                    </div>
                                </td>

                                {parsedDisplay.map((p, colIndex) => {
                                    if (p.field !== 'id') {
                                        return (
                                            <td key={colIndex}>
                                                <div className="skeleton skeleton-text">
                                                    <img src={`/layout/images/table-skeleton.svg`} alt="..." height="12" className="mr-2" />
                                                </div>
                                            </td>
                                        );
                                    }
                                    return null;
                                })}

                                {parsedDisplay.some((p) => p.field === 'id') && Permission !== 'Operator' && (
                                    <td>
                                        <div className="skeleton skeleton-button">
                                            <img src={`/layout/images/table-skeleton.svg`} alt="..." height="12" className="mr-2" />
                                        </div>
                                    </td>
                                )}
                            </tr>
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
