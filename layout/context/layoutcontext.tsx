'use client';
import React, { useState, createContext, useEffect } from 'react';
import { LayoutState, ChildContainerProps, LayoutConfig, LayoutContextProps } from '@/types';
import LoginPage from '@/app/(full-page)/auth/login/page';

export const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutProvider = ({ children }: ChildContainerProps) => {
    const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
        ripple: true,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'lara-light-blue',
        scale: 12
    });

    const [authChecked, setAuthChecked] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true); // <- new state

    const [layoutState, setLayoutState] = useState<LayoutState>({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });

    const onMenuToggle = () => {
        if (isOverlay()) {
            setLayoutState((prev) => ({ ...prev, overlayMenuActive: !prev.overlayMenuActive }));
        }

        if (isDesktop()) {
            setLayoutState((prev) => ({ ...prev, staticMenuDesktopInactive: !prev.staticMenuDesktopInactive }));
        } else {
            setLayoutState((prev) => ({ ...prev, staticMenuMobileActive: !prev.staticMenuMobileActive }));
        }
    };

    const showProfileSidebar = () => {
        setLayoutState((prev) => ({ ...prev, profileSidebarVisible: !prev.profileSidebarVisible }));
    };

    const isOverlay = () => layoutConfig.menuMode === 'overlay';

    const isDesktop = () => window.innerWidth > 991;

    const value: LayoutContextProps = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onMenuToggle,
        showProfileSidebar,
        authChecked,
        setAuthChecked
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        setAuthChecked(!!token);
        setCheckingAuth(false); // <- update when check is done
    }, []);

    if (checkingAuth) {
        // You can return a spinner or blank screen here
        return null;
    }

    return <LayoutContext.Provider value={value}>{!authChecked ? <LoginPage /> : children}</LayoutContext.Provider>;
};
