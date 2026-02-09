'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Post, Put } from '@/app/_services/BasicHttpServices';
import Swal from 'sweetalert2';
import { API_Variable, Message_Variable, FormData } from '../constant';

//Replace this for your actual data model

const isActives = [
    { label: 'Active', value: '0' },
    { label: 'In-Active', value: '1' }
];

const DataEntryForm: React.FC<{ onLoadData?: FormData }> = ({ onLoadData }) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormData>();

    useEffect(() => {
        if (onLoadData) {
            Object.entries(onLoadData).forEach(([key, value]) => {
                setValue(key as keyof FormData, value);
            });
        }
    }, [onLoadData, setValue]);

    const onSubmit = (data: FormData) => {
        console.log(data);
        const processedData = async () => {
            let response;
            if (data && data.id) {
                response = await Put(API_Variable, data.id, data);
            } else {
                response = await Post(API_Variable, data);
            }

            if (!response) {
                const errorData = await response;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorData.toString()
                });
                return;
            }

            if (data && data.id) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `${Message_Variable} updated successfully`
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `${Message_Variable} created successfully`
                });
            }
        };
        processedData();
    };

    const getFormErrorMessage = (name: keyof FormData) => {
        return errors[name] ? <small className="p-error">{errors[name]?.message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="p-fluid">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Start Geneate Form with AI, Use react-hook-form and Prime React and C# model */}
                <div className="field">
                    <label htmlFor="branchName">Branch Name</label>
                    <Controller name="branchName" control={control} rules={{ required: 'Branch name is required.' }} render={({ field }) => <InputText id="branchName" {...field} className={classNames({ 'p-invalid': errors.branchName })} />} />
                    {getFormErrorMessage('branchName')}
                </div>
                <div className="field">
                    <label htmlFor="address">Address</label>
                    <Controller name="address" control={control} rules={{ required: 'Address is required.' }} render={({ field }) => <InputText id="address" {...field} className={classNames({ 'p-invalid': errors.address })} />} />
                    {getFormErrorMessage('address')}
                </div>

                {/* End Geneate Form with AI, Use react-hook-form and Prime React and C# model */}
                <Button type="submit" label="Submit" className="mt-2" />
            </form>
        </div>
    );
};

export default DataEntryForm;
