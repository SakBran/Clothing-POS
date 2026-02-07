/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import axiosInstance from '@/app/_services/AxiosInstance';
import Swal from 'sweetalert2';

const LoginPage = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { layoutConfig, authChecked, setAuthChecked } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    const handleLogin = () => {
        const auth = async () => {
            const data = {
                username: username,
                password: password
            };

            // Show loading
            Swal.fire({
                title: 'Logging in...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading(null);
                }
            });

            try {
                const resp = await axiosInstance.post('auth/Login', data);
                const temp = await resp.data;

                if (!temp || !temp.token) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login failed',
                        text: 'Invalid response from server.'
                    });
                    console.error('Invalid response:', temp);
                    return;
                }

                // Save token
                localStorage.setItem('token', temp.token);
                setAuthChecked(true);

                // Save other optional info
                if (temp.userId) {
                    localStorage.setItem('userId', temp.userId);
                } else {
                    console.warn('Missing userId in response');
                }

                if (temp.permission) {
                    localStorage.setItem('permission', temp.permission);
                } else {
                    console.warn('Missing permission in response');
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Login successful',
                    showConfirmButton: false,
                    timer: 1500
                });

                // Redirect after short delay
                setTimeout(() => {
                    router.push('/');
                }, 1600);
            } catch (error) {
                console.error('Login error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: 'Something went wrong.'
                });
            }
        };

        auth();
    };
    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src={`/layout/images/logo.png`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                            <div className="text-900 text-3xl font-medium mb-3">Welcome, User!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Username
                            </label>
                            <InputText id="email1" type="text" placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)} className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <InputText id="password1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />
                            {/* <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password> */}

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                </div>
                                {/* <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Forgot password?
                                </a> */}
                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl" onClick={() => handleLogin()}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
