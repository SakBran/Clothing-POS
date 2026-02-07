'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { Post, Put } from '@/app/_services/BasicHttpServices';
import Swal from 'sweetalert2';

export interface FormData {
    id: string;
    sourceFolder: string;
    completeFolder: string;
    toReadFileName: string;
    toReadFileNameStartWith: string;
    ceirid: string;
    roNo: string;
    roDate: string;
    cd: string;
    ct: string;
    at: string;
    rf: string;
    authorizationTokenURL_CEIR: string;
    paymentConfirmationURL_CEIR: string;
}

const SystemSettingForm: React.FC<{ onLoadData?: FormData }> = ({ onLoadData }) => {
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
                response = await Put(`SystemSetting`, data.id, data);
            } else {
                response = await Post('SystemSetting', data);
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
                    text: 'Setting updated successfully'
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Setting created successfully'
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
                <div className="field">
                    <label htmlFor="sourceFolder">Source Folder</label>
                    <Controller name="sourceFolder" control={control} rules={{ required: 'Source Folder is required.' }} render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.sourceFolder })} />} />
                    {getFormErrorMessage('sourceFolder')}
                </div>

                <div className="field">
                    <label htmlFor="completeFolder">Complete Folder</label>
                    <Controller
                        name="completeFolder"
                        control={control}
                        rules={{ required: 'Complete Folder is required.' }}
                        render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.completeFolder })} />}
                    />
                    {getFormErrorMessage('completeFolder')}
                </div>

                <div className="field">
                    <label htmlFor="toReadFileName">To Read File Name</label>
                    <Controller name="toReadFileName" control={control} rules={{ required: 'This field is required.' }} render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.toReadFileName })} />} />
                    {getFormErrorMessage('toReadFileName')}
                </div>

                <div className="field">
                    <label htmlFor="toReadFileNameStartWith">File Name Starts With</label>
                    <Controller
                        name="toReadFileNameStartWith"
                        control={control}
                        rules={{ required: 'This field is required.' }}
                        render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.toReadFileNameStartWith })} />}
                    />
                    {getFormErrorMessage('toReadFileNameStartWith')}
                </div>

                <div className="field">
                    <label htmlFor="authorizationTokenURL_CEIR">Authorization Token URL</label>
                    <Controller
                        name="authorizationTokenURL_CEIR"
                        control={control}
                        rules={{ required: 'This field is required.' }}
                        render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.authorizationTokenURL_CEIR })} />}
                    />
                    {getFormErrorMessage('authorizationTokenURL_CEIR')}
                </div>

                <div className="field">
                    <label htmlFor="paymentConfirmationURL_CEIR">Payment Confirmation URL</label>
                    <Controller
                        name="paymentConfirmationURL_CEIR"
                        control={control}
                        rules={{ required: 'This field is required.' }}
                        render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.paymentConfirmationURL_CEIR })} />}
                    />
                    {getFormErrorMessage('paymentConfirmationURL_CEIR')}
                </div>

                <Button type="submit" label="Submit" className="mt-2" />
            </form>
        </div>
    );
};

export default SystemSettingForm;
