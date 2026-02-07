'use client';
import React, { use, useEffect, useState } from 'react';
import UserForm, { FormData } from '../_component/SystemSetting';
import { GetSingle } from '@/app/_services/BasicHttpServices';
import Swal from 'sweetalert2';
import LoadingPage from '../../loading';

interface Props {
    params: Promise<{ id: string }>;
}

const Edit = ({ params }: Props) => {
    const unwrappedParams = use(params);
    const [user, setUser] = useState<FormData | undefined>(undefined);
    const [loading, setloading] = useState<boolean>(false);

    useEffect(() => {
        setloading(true);
        const fetchUser = async () => {
            const response = await GetSingle(`SystemSetting/${unwrappedParams.id}`);

            if (!response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            }
            setUser(response);
            setloading(false);
        };
        fetchUser();
    }, [unwrappedParams]);

    return (
        <div className="col-12 xl:col-12">
            <div className="card">
                {loading && <LoadingPage></LoadingPage>}
                {!loading && user && <UserForm onLoadData={user} />}
            </div>
        </div>
    );
};

export default Edit;
