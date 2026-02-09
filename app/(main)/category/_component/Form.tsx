'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { Get, Post, Put } from '@/app/_services/BasicHttpServices';
import Swal from 'sweetalert2';
import { API_Variable, Message_Variable, FormData } from '../constant';
import axiosInstance from '@/app/_services/AxiosInstance';

//Replace this for your actual data model

const isActives = [
    { label: 'Active', value: '0' },
    { label: 'In-Active', value: '1' }
];

interface ParentCategory {
    name: string;
    id: string;
}

interface selectType {
    label: string;
    value: string;
}
const parentCategoriesAPICall = async () => {
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
    const responseData: ParentCategory[] = JSON.parse(JSON.stringify(data));
    const response: selectType[] = responseData.map((item) => ({ label: item.name, value: item.id }));
    return response;
};

const DataEntryForm: React.FC<{ onLoadData?: FormData }> = ({ onLoadData }) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            categoryName: ''
        }
    });
    const [parentCategories, setParentCategories] = React.useState<selectType[]>([]);
    useEffect(() => {
        const fetchParentCategories = async () => {
            const categories = await parentCategoriesAPICall();
            setParentCategories(categories);
        };
        fetchParentCategories();
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
                    <label htmlFor="categoryName">Category Name</label>
                    <Controller
                        name="categoryName"
                        control={control}
                        rules={{ required: 'Category name is required.' }}
                        render={({ field }) => <InputText id="categoryName" {...field} className={classNames({ 'p-invalid': errors.categoryName })} />}
                    />
                    {getFormErrorMessage('categoryName')}
                </div>
                <div className="field">
                    <label htmlFor="parentCategoryId">Parent Category</label>
                    <Controller
                        name="parentCategoryId"
                        control={control}
                        render={({ field }) => <Dropdown id="parentCategoryId" {...field} options={parentCategories} optionLabel="label" optionValue="value" className={classNames({ 'p-invalid': errors.parentCategoryId })} />}
                    />
                    {getFormErrorMessage('parentCategoryId')}
                </div>

                {/* End Geneate Form with AI, Use react-hook-form and Prime React and C# model */}
                <Button type="submit" label="Submit" className="mt-2" />
            </form>
        </div>
    );
};
export default DataEntryForm;
