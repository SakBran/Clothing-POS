/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    // Administrator – All permission, user management, edit CEIRD နှင့် Resent တို့ပါပြုလုပ်နိုင်ပါမည်။
    // Incharge – view all, edit CEIRD နှင့် Resent တို့ပါပြုလုပ်နိုင်ပါမည်။
    // Operator – View only
    const Administrator: AppMenuItem[] = [
        {
            label: 'Users',
            items: [
                { label: 'Users', icon: 'pi pi-fw pi-users', to: '/user/list' },
                { label: 'Add new user', icon: 'pi pi-fw pi-user-plus', to: '/user/new' }
            ]
        },
        {
            label: 'IRD-CEIR ID List',
            items: [{ label: 'CEIR ID List', icon: 'pi pi-fw pi-server', to: '/CEIRD' },
                    {label: 'Manual List', icon: 'pi pi-fw pi-server', to: '/Manual' }
            ]
        },
        {
            label: 'Operations',
            items: [
                { label: 'Sent List', icon: 'pi pi-fw pi-file-export', to: '/sentList' },
                { label: 'Failed List', icon: 'pi pi-fw pi-ban', to: '/failedList' },
                { label: 'Not Sent List', icon: 'pi pi-fw pi-wrench', to: '/notSentList' },
                { label: 'Duplicate List', icon: 'pi pi-fw pi-clone', to: '/duplicateList' },
                { label: 'Delete List', icon: 'pi pi-fw pi-trash', to: '/deleteList' }
            ]
        },
        {
            label: 'Logs',
            items: [{ label: 'User Logs', icon: 'pi pi-fw pi-book', to: '/userLogs' }]
        },
        {
            label: 'Report',
            items: [
                { label: 'Payment Report', icon: 'pi pi-fw pi-chart-bar', to: '/successfulPaymentReport' },
                { label: 'Report 2', icon: 'pi pi-fw pi-chart-bar', to: '/2' },
                { label: 'Report 3', icon: 'pi pi-fw pi-chart-bar', to: '/3' }
            ]
        },
        {
            label: 'Settings',
            items: [
                { label: 'System Setting', icon: 'pi pi-fw pi-cog', to: '/setting/list' },
                { label: 'Add new Setting', icon: 'pi pi-fw pi-plus-circle', to: '/setting/new' }
            ]
        }
    ];
    const InchargeAndOperator: AppMenuItem[] = [
          {
            label: 'IRD-CEIR ID List',
            items: [{ label: 'CEIR ID List', icon: 'pi pi-fw pi-server', to: '/CEIRD' },
                    {label: 'Manual List', icon: 'pi pi-fw pi-server', to: '/Manual' }
            ]
        },
        {
            label: 'Operations',
            items: [
                { label: 'Sent List', icon: 'pi pi-fw pi-file-export', to: '/sentList' },
                { label: 'Failed List', icon: 'pi pi-fw pi-ban', to: '/failedList' },
                { label: 'Not Sent List', icon: 'pi pi-fw pi-wrench', to: '/notSentList' },
                { label: 'Duplicate List', icon: 'pi pi-fw pi-clone', to: '/duplicateList' },
                { label: 'Delete List', icon: 'pi pi-fw pi-trash', to: '/deleteList' }
            ]
        },

        {
            label: 'Report',
            items: [
                { label: 'Report 1', icon: 'pi pi-fw pi-chart-bar', to: '/1' },
                { label: 'Report 2', icon: 'pi pi-fw pi-chart-bar', to: '/2' },
                { label: 'Report 3', icon: 'pi pi-fw pi-chart-bar', to: '/3' }
            ]
        }
    ];

    const Permission = localStorage.getItem('permission');
    var model: AppMenuItem[] = [];
    if (Permission) {
        if (Permission == 'Administrator') {
            model = [...Administrator];
        } else {
            model = [...InchargeAndOperator];
        }
    }

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
