import Swal from 'sweetalert2';
import { PaginationType } from '../_models/PaginationType';
import axiosInstance from './AxiosInstance';

export const Get = async (url: string): Promise<PaginationType> => {
    const resp = await axiosInstance.get(url);
    if (resp.status < 200 || resp.status >= 300) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        });
    }
    const data = await resp.data;
    const responseData: PaginationType = JSON.parse(JSON.stringify(data));
    return responseData;
};

export const GetSingle = async (url: string): Promise<any> => {
    const resp = await axiosInstance.get(url);
    if (resp.status < 200 || resp.status >= 300) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        });
    }
    const data = await resp.data;
    const responseData: PaginationType = JSON.parse(JSON.stringify(data));
    return responseData;
};

export const Post = async (url: string, data: unknown): Promise<any> => {
    try {
        const resp = await axiosInstance.post(url, data);
        return resp.data;
    } catch (error: any) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error?.response?.data?.message || 'Something went wrong!'
        });
        throw error; // Optional: rethrow if you want to handle it further up
    }
};

export const Put = async (url: string, id: string, data: unknown): Promise<any> => {
    try {
        const jsonObject = data as { [key: string]: unknown };
        jsonObject.id = id;

        const resp = await axiosInstance.put(`${url}/${id}`, jsonObject);
        return resp.data;
    } catch (error: any) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error?.response?.data?.message || 'Something went wrong!'
        });
        throw error; // Optional: rethrow for upstream handling
    }
};

export const Delete = async (url: string, id: string): Promise<any> => {
    try {
        const resp = await axiosInstance.delete(`${url}/${id}`);

        Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: 'Successfully Deleted!'
        });

        return resp.data;
    } catch (error: any) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error?.response?.data?.message || 'Something went wrong!'
        });
        throw error; // Optional: rethrow if upstream handling is needed
    }
};
