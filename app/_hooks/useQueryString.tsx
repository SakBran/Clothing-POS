import { useState } from 'react';

const useQueryString = () => {
    const [queryString, setQueryString] = useState('');

    const generateQueryString = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formObject: Record<string, string> = {};

        // Convert FormData to an object
        formData.forEach((value, key) => {
            formObject[key] = value.toString(); // Ensure values are strings
        });

        // Convert object to query string
        const params = new URLSearchParams(formObject).toString();

        setQueryString(params);
        return params; // Returning the query string for further use
    };

    return { queryString, generateQueryString };
};

export default useQueryString;
