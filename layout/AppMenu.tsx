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
            items: [
                { label: 'CEIR ID List', icon: 'pi pi-fw pi-server', to: '/CEIRD' },
                { label: 'Manual List', icon: 'pi pi-fw pi-server', to: '/Manual' }
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
            items: [
                { label: 'CEIR ID List', icon: 'pi pi-fw pi-server', to: '/CEIRD' },
                { label: 'Manual List', icon: 'pi pi-fw pi-server', to: '/Manual' }
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

    const Management: AppMenuItem[] = [
        {
            label: 'Branch Management',
            icon: 'pi pi-fw pi-building',
            items: [
                { label: 'Branch List', icon: 'pi pi-fw pi-list', to: '/branch/list' },
                { label: 'Add New Branch', icon: 'pi pi-fw pi-plus-circle', to: '/branch/new' }
            ]
        },
        {
            label: 'Brand Management',
            icon: 'pi pi-fw pi-tags',
            items: [
                { label: 'Brand List', icon: 'pi pi-fw pi-tag', to: '/brand/list' },
                { label: 'Add New Brand', icon: 'pi pi-fw pi-plus-circle', to: '/brand/new' }
            ]
        },
        {
            label: 'Category Management',
            icon: 'pi pi-fw pi-sitemap',
            items: [
                { label: 'Category List', icon: 'pi pi-fw pi-list', to: '/category/list' },
                { label: 'Add New Category', icon: 'pi pi-fw pi-plus-circle', to: '/category/new' }
            ]
        },
        {
            label: 'Product Management',
            icon: 'pi pi-fw pi-box',
            items: [
                { label: 'Product List', icon: 'pi pi-fw pi-list', to: '/product/list' },
                { label: 'Add New Product', icon: 'pi pi-fw pi-plus-circle', to: '/product/new' }
            ]
        },
        {
            label: 'Product Variant Management',
            icon: 'pi pi-fw pi-clone',
            items: [
                { label: 'Variant List', icon: 'pi pi-fw pi-list', to: '/product-variant/list' },
                { label: 'Add New Variant', icon: 'pi pi-fw pi-plus-circle', to: '/product-variant/new' }
            ]
        },
        {
            label: 'Purchase Management',
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
                { label: 'Purchase Orders', icon: 'pi pi-fw pi-list', to: '/purchase-order/list' },
                { label: 'New Purchase Order', icon: 'pi pi-fw pi-plus-circle', to: '/purchase-order/new' }
            ]
        },
        {
            label: 'Sales Management',
            icon: 'pi pi-fw pi-wallet',
            items: [
                { label: 'Sales List', icon: 'pi pi-fw pi-list', to: '/sale/list' },
                { label: 'New Sale', icon: 'pi pi-fw pi-plus-circle', to: '/sale/new' }
            ]
        },
        {
            label: 'Stock Management',
            icon: 'pi pi-fw pi-database',
            items: [
                { label: 'Stock List', icon: 'pi pi-fw pi-list', to: '/stock/list' },
                { label: 'Stock Movements', icon: 'pi pi-fw pi-arrows-h', to: '/stock-movement/list' }
            ]
        },
        {
            label: 'Supplier Management',
            icon: 'pi pi-fw pi-truck',
            items: [
                { label: 'Supplier List', icon: 'pi pi-fw pi-list', to: '/supplier/list' },
                { label: 'Add New Supplier', icon: 'pi pi-fw pi-plus-circle', to: '/supplier/new' }
            ]
        }
    ];

    const Permission = localStorage.getItem('permission');
    var model: AppMenuItem[] = [];
    if (Permission) {
        if (Permission == 'Administrator') {
            model = [...Administrator, ...Management];
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
