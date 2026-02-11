'use client';
import { BasicTable } from '@/app/_components/Tables/BasicTable';
import { PaginationType } from '@/app/_models/PaginationType';
import { Delete, Get } from '@/app/_services/BasicHttpServices';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';
import { API_Variable, Next_Link_Variable, TableColumns } from '../constant';

type Props = {
    id: string;
};

const TableAction = ({ id }: Props) => {
    const router = useRouter();

    const DeleteData = async (id: string) => {
        // const response = await Delete('User', id);
        Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonText: 'Yes'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const deleteAction = async () => {
                    const response = await Delete(API_Variable, id);
                    Swal.fire('Deleted!', 'Data is successfully deleted', 'success');
                    router.refresh();
                };
                deleteAction();
            }
        });
    };
    return (
        <>
            <Link href={`/${Next_Link_Variable}/${id}`} style={{ cursor: 'pointer' }}>
                ပြင်ဆင်ရန်
            </Link>
            |
            <Link
                onClick={(e) => {
                    e.preventDefault();
                    DeleteData(id);
                }}
                href={''}
            >
                ​ဖျက်ရန်
            </Link>
        </>
    );
};

const transformData = (data: PaginationType): PaginationType => {
    return {
        ...data,
        data: data.data.map((item) => ({
            ...item,
            isActive: item.isActive == '0' ? 'Active' : item.isActive == '1' ? 'InActive' : 'N/A'
        }))
    };
};

const page = () => {
    return (
        <div className="col-12 xl:col-12">
            <div className="card">
                <BasicTable
                    api={API_Variable}
                    displayData={TableColumns}
                    fetch={async (url) => {
                        const response = await Get(url);
                        return transformData(response);
                    }}
                    actionComponent={TableAction}
                />
            </div>
        </div>
    );
};

export default page;
