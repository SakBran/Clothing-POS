'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { Post, Put } from '@/app/_services/BasicHttpServices';
import Swal from 'sweetalert2';

const API_Variable = 'Brand';
const Message_Variable = 'Brand';
//Replace this for your actual data model
export interface FormData {
    brandName: string;
    isActive: string;
    id: string;
}

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
                    <label htmlFor="brandName">Brand Name</label>
                    <Controller name="brandName" control={control} rules={{ required: 'Brand name is required.' }} render={({ field }) => <InputText id="brandName" {...field} className={classNames({ 'p-invalid': errors.brandName })} />} />
                    {getFormErrorMessage('brandName')}
                </div>
                <div className="field">
                    <label htmlFor="isActive">Active / Inactive</label>
                    <Controller
                        name="isActive"
                        control={control}
                        rules={{ required: 'Status is required.' }}
                        render={({ field }) => (
                            <Dropdown
                                id="isActive"
                                value={field.value}
                                onChange={(e) => field.onChange(e.value)}
                                options={isActives}
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Select status"
                                className={classNames({ 'p-invalid': errors.isActive })}
                            />
                        )}
                    />
                    {getFormErrorMessage('isActive')}
                </div>
                {/* End Geneate Form with AI, Use react-hook-form and Prime React and C# model */}
                <Button type="submit" label="Submit" className="mt-2" />
            </form>
        </div>
    );
};

export default DataEntryForm;
