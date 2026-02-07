/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src={`/layout/images/logo.png`} alt="Logo" height="35" className="mr-2" />
            Created & Maintained by
            <span className="font-medium ml-2">SHWE DIGIT</span>
        </div>
    );
};

export default AppFooter;
