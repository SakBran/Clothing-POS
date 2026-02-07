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
    name: string;
    email: string;
    permission: string;
    password: string;
    isActive: string;
    fullName: string;
    id: string;
}

const roles = [
    { label: 'Administrator', value: 'Administrator' },
    { label: 'Incharge', value: 'Incharge' },
    { label: 'Operator', value: 'Operator' }
];

const isActives = [
    { label: 'Active', value: '0' },
    { label: 'In-Active', value: '1' }
];

const UserForm: React.FC<{ onLoadData?: FormData }> = ({ onLoadData }) => {
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
                response = await Put(`User`, data.id, data);
            } else {
                response = await Post('User', data);
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
                    text: 'User updated successfully'
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'User created successfully'
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
                    <label htmlFor="fullName">Full Name</label>
                    <Controller name="fullName" control={control} rules={{ required: 'Username is required.' }} render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.fullName })} />} />
                    {getFormErrorMessage('fullName')}
                </div>

                <div className="field">
                    <label htmlFor="username">Username</label>
                    <Controller name="name" control={control} rules={{ required: 'Username is required.' }} render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.name })} />} />
                    {getFormErrorMessage('name')}
                </div>

                <div className="field">
                    <label htmlFor="role">Permission</label>
                    <Controller
                        name="permission"
                        control={control}
                        rules={{ required: 'Role is required.' }}
                        render={({ field }) => <Dropdown id={field.name} {...field} options={roles} placeholder="Select a role" className={classNames({ 'p-invalid': errors.permission })} />}
                    />
                    {getFormErrorMessage('permission')}
                </div>

                <div className="field">
                    <label htmlFor="role">Password</label>
                    <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.password })} />} />
                    {getFormErrorMessage('password')}
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

                <Button type="submit" label="Submit" className="mt-2" />
            </form>
        </div>
    );
};

export default UserForm;
