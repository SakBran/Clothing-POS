'use client';
import React, { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Post, Put } from '@/app/_services/BasicHttpServices';
import Swal from 'sweetalert2';
import { API_Variable, Message_Variable, FormData } from '../constant';
import axiosInstance from '@/app/_services/AxiosInstance';
import { Dropdown } from 'primereact/dropdown';
import { Steps } from 'primereact/steps';
import { InputNumber } from 'primereact/inputnumber';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
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
        watch,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            productName: '',
            description: '',
            brandId: '',
            categoryId: '',
            isActive: true,
            variants: []
        }
    });

    const [brands, setBrands] = React.useState<selectType[]>([]);
    const [categories, setCategories] = React.useState<selectType[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const { fields, append, prepend, remove } = useFieldArray({
        control,
        name: 'variants'
    });

    const items = [{ label: 'Basic Info' }, { label: 'Variants' }, { label: 'Confirm' }];

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
    const variants = watch('variants') || [];

    return (
        <div className="p-fluid">
            <Steps model={items} activeIndex={activeIndex} />

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                {/* STEP 1 */}
                {activeIndex === 0 && (
                    <>
                        <div className="field">
                            <label htmlFor="productName">Product Name</label>
                            <Controller
                                name="productName"
                                control={control}
                                rules={{ required: 'Product name is required.' }}
                                render={({ field }) => <InputText id="productName" {...field} className={classNames({ 'p-invalid': errors.productName })} />}
                            />
                            {getFormErrorMessage('productName')}
                        </div>

                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <Controller
                                name="description"
                                control={control}
                                rules={{ required: 'Description is required.' }}
                                render={({ field }) => <InputText id="description" {...field} className={classNames({ 'p-invalid': errors.description })} />}
                            />
                            {getFormErrorMessage('description')}
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
                            <label htmlFor="isActive">Active / In-active</label>
                            <Controller
                                name="isActive"
                                control={control}
                                rules={{ required: 'This field is required.' }}
                                render={({ field }) => <Dropdown {...field} options={isActives} placeholder="Active/Inactive" className={classNames({ 'p-invalid': errors.isActive })} />}
                            />
                            {getFormErrorMessage('isActive')}
                        </div>
                    </>
                )}

                {/* STEP 2 */}
                {activeIndex === 1 && (
                    <>
                        <div className="mb-3">
                            <Button
                                type="button"
                                icon="pi pi-plus"
                                label="Add Variant"
                                size="small"
                                className="p-button-outlined"
                                onClick={() =>
                                    prepend({
                                        sizeCode: '',
                                        colorCode: '',
                                        factoryBarcode: '',
                                        internalSKU: '',
                                        costPrice: 0,
                                        sellingPrice: 0,
                                        isActive: '0'
                                    })
                                }
                            />
                        </div>

                        {fields.map((field, index) => (
                            <div key={field.id} className="p-3 mb-3 border-1 surface-border border-round">
                                <h6 className="m-0 mb-2">Variant #{index + 1}</h6>

                                {/* Size */}
                                <div className="field">
                                    <label>Size</label>
                                    <Controller name={`variants.${index}.sizeCode`} control={control} rules={{ required: true }} render={({ field }) => <InputText {...field} />} />
                                </div>

                                {/* Color */}
                                <div className="field">
                                    <label>Color</label>
                                    <Controller name={`variants.${index}.colorCode`} control={control} rules={{ required: true }} render={({ field }) => <InputText {...field} />} />
                                </div>

                                {/* SKU */}
                                <div className="field">
                                    <label>Factory Barcode</label>
                                    <Controller name={`variants.${index}.factoryBarcode`} control={control} render={({ field }) => <InputText {...field} />} />
                                </div>
                                {/* SKU */}
                                <div className="field">
                                    <label>Internal SKU</label>
                                    <Controller name={`variants.${index}.internalSKU`} control={control} render={({ field }) => <InputText {...field} />} />
                                </div>

                                {/* Cost */}
                                <div className="field">
                                    <label>Cost Price</label>
                                    <Controller
                                        name={`variants.${index}.costPrice`}
                                        control={control}
                                        render={({ field }) => <InputNumber value={field.value ?? 0} onValueChange={(e) => field.onChange(e.value)} mode="decimal" minFractionDigits={0} />}
                                    />
                                </div>

                                {/* Selling */}
                                <div className="field">
                                    <label>Selling Price</label>
                                    <Controller
                                        name={`variants.${index}.sellingPrice`}
                                        control={control}
                                        render={({ field }) => <InputNumber value={field.value ?? 0} onValueChange={(e) => field.onChange(e.value)} mode="decimal" minFractionDigits={0} />}
                                    />
                                </div>

                                <Button type="button" severity="danger" label="Remove" icon="pi pi-trash" size="small" className="p-button-text" onClick={() => remove(index)} />
                            </div>
                        ))}
                    </>
                )}

                {/* STEP 3 */}
                {activeIndex === 2 && (
                    <div className="surface-card p-4 border-round shadow-1">
                        {/* Header */}
                        <div className="flex align-items-center justify-content-between mb-3">
                            <h5 className="m-0">Confirm Data</h5>
                        </div>

                        {/* Summary Grid */}
                        <div className="grid text-sm row-gap-2">
                            <div className="col-4 font-semibold text-color-secondary">Product</div>
                            <div className="col-8">{watch('productName')}</div>

                            <div className="col-4 font-semibold text-color-secondary">Description</div>
                            <div className="col-8 line-height-3">{watch('description')}</div>

                            <div className="col-4 font-semibold text-color-secondary">Brand</div>
                            <div className="col-8">{brands?.find((b) => b.value === watch('brandId'))?.label}</div>

                            <div className="col-4 font-semibold text-color-secondary">Category</div>
                            <div className="col-8">{categories?.find((b) => b.value === watch('categoryId'))?.label}</div>

                            <div className="col-4 font-semibold text-color-secondary">Status</div>
                            <div className="col-8">
                                <span className={`font-semibold ${watch('isActive') ? 'text-green-600' : 'text-red-500'}`}>{watch('isActive') ? 'Active' : 'Inactive'}</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-top-1 surface-border my-4" />

                        {/* Variants */}
                        <h6 className="mb-2">Variants</h6>

                        <DataTable value={variants} size="small" stripedRows responsiveLayout="scroll" tableStyle={{ tableLayout: 'fixed', width: '100%' }}>
                            <Column header="#" body={(_, options) => options.rowIndex + 1} style={{ width: '20%' }} />
                            <Column field="sizeCode" header="Size" style={{ width: '20%' }} />
                            <Column field="colorCode" header="Color" style={{ width: '20%' }} />
                            <Column field="costPrice" header="Cost Price" style={{ width: '20%' }} />
                            <Column field="sellingPrice" header="Selling Price" style={{ width: '20%' }} />
                        </DataTable>
                    </div>
                )}

                {/* NAVIGATION */}
                <div className="flex justify-content-between align-items-center mt-4">
                    {/* LEFT */}
                    <div>{activeIndex > 0 && <Button type="button" label="Back" icon="pi pi-arrow-left" severity="secondary" onClick={() => setActiveIndex((i) => i - 1)} />}</div>

                    {/* RIGHT */}
                    <div className="flex gap-2">
                        {activeIndex < items.length - 1 && <Button type="button" label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => setActiveIndex((i) => i + 1)} />}

                        {activeIndex === items.length - 1 && <Button type="submit" icon="pi pi-arrow-right" iconPos="right" label="Submit" />}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DataEntryForm;
