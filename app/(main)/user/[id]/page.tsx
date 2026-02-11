'use client';
import React, { use, useEffect, useState } from 'react';
import { GetSingle } from '@/app/_services/BasicHttpServices';
import Swal from 'sweetalert2';
import LoadingPage from '../../loading';
import DataEntryForm from '../_component/Form';
import { API_Variable, FormData } from '../constant';

interface Props {
    params: Promise<{ id: string }>;
}

const Edit = ({ params }: Props) => {
    const unwrappedParams = use(params);
    const [pageData, setPageData] = useState<FormData | undefined>(undefined);
    const [loading, setloading] = useState<boolean>(false);

    useEffect(() => {
        setloading(true);
        const fetchPageData = async () => {
            const response = await GetSingle(`${API_Variable}/${unwrappedParams.id}`);

            if (!response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            }
            setPageData(response);
            setloading(false);
        };
        fetchPageData();
    }, [unwrappedParams]);

    return (
        <div className="col-12 xl:col-12">
            <div className="card">
                {loading && <LoadingPage></LoadingPage>}
                {!loading && pageData && <DataEntryForm onLoadData={pageData} />}
            </div>
        </div>
    );
};

export default Edit;
