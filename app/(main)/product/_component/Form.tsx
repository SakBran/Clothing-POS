'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Post, Put } from '@/app/_services/BasicHttpServices';
import Swal from 'sweetalert2';
import { API_Variable, Message_Variable, FormData } from '../constant';
import axiosInstance from '@/app/_services/AxiosInstance';
import { Dropdown } from 'primereact/dropdown';

//Replace this for your actual data model

const isActives = [
    { label: 'Active', value: '0' },
    { label: 'In-Active', value: '1' }
];

interface Option {
    name: string;
    id: string;
}

interface selectType {
    label: string;
    value: string;
}
const categoriesAPICall = async () => {
    const url = 'optionbox/categories';
    const resp = await axiosInstance.get(url);
    if (resp.status < 200 || resp.status >= 300) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        });
    }
    const data = await resp.data;
    const responseData: Option[] = JSON.parse(JSON.stringify(data));
    const response: selectType[] = responseData.map((item) => ({ label: item.name, value: item.id }));
    return response;
};
const brandAPICall = async () => {
    const url = 'optionbox/brands';
    const resp = await axiosInstance.get(url);
    if (resp.status < 200 || resp.status >= 300) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        });
    }
    const data = await resp.data;
    const responseData: Option[] = JSON.parse(JSON.stringify(data));
    const response: selectType[] = responseData.map((item) => ({ label: item.name, value: item.id }));
    return response;
};

const DataEntryForm: React.FC<{ onLoadData?: FormData }> = ({ onLoadData }) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormData>();

    const [brands, setBrands] = React.useState<selectType[]>([]);
    const [categories, setCategories] = React.useState<selectType[]>([]);
    useEffect(() => {
        const fetchBrands = async () => {
            const brands = await brandAPICall();
            setBrands(brands);
        };

        const fetchCategories = async () => {
            const categories = await categoriesAPICall();
            setCategories(categories);
        };
        fetchBrands();
        fetchCategories();
    }, []);

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
                    <label htmlFor="productName">Product Name</label>
                    <Controller name="productName" control={control} rules={{ required: 'Product name is required.' }} render={({ field }) => <InputText id="productName" {...field} className={classNames({ 'p-invalid': errors.productName })} />} />
                    {getFormErrorMessage('productName')}
                </div>
                <div className="field">
                    <label htmlFor="brandId">Brand</label>
                    <Controller name="brandId" control={control} render={({ field }) => <Dropdown id="brandId" {...field} options={brands} optionLabel="label" optionValue="value" className={classNames({ 'p-invalid': errors.brandId })} />} />
                    {getFormErrorMessage('brandId')}
                </div>

                <div className="field">
                    <label htmlFor="categoryId">Category</label>
                    <Controller
                        name="categoryId"
                        control={control}
                        render={({ field }) => <Dropdown id="categoryId" {...field} options={categories} optionLabel="label" optionValue="value" className={classNames({ 'p-invalid': errors.categoryId })} />}
                    />
                    {getFormErrorMessage('categoryId')}
                </div>

                <div className="field">
                    <label htmlFor="description">Description</label>
                    <Controller name="description" control={control} rules={{ required: 'Description is required.' }} render={({ field }) => <InputText id="description" {...field} className={classNames({ 'p-invalid': errors.description })} />} />
                    {getFormErrorMessage('description')}
                </div>

                <div className="field">
                    <label htmlFor="isActive">Active/In-active</label>
                    <Controller
                        name="isActive"
                        control={control}
                        rules={{ required: 'This field is required.' }}
                        render={({ field }) => <Dropdown id={field.name} {...field} options={isActives} placeholder="Active/Inactive" className={classNames({ 'p-invalid': errors.isActive })} />}
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
