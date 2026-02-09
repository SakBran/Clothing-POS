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
            label: 'အသုံးပြုသူ စီမံခန့်ခွဲမှု',
            items: [
                { label: 'အသုံးပြုသူများစာရင်း', icon: 'pi pi-fw pi-users', to: '/user/list' },
                { label: 'အသုံးပြုသူအသစ်ထည့်ရန်', icon: 'pi pi-fw pi-user-plus', to: '/user/new' },
                { label: 'အသုံးပြုသူ စီမံခန့်ခွဲမှု လမ်းညွှန်', icon: 'pi pi-fw pi-user-plus', to: '/tutorial/user' }
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
            label: 'ဆိုင်ခွဲ စီမံခန့်ခွဲမှု',
            icon: 'pi pi-fw pi-building',
            items: [
                { label: 'ဆိုင်ခွဲစာရင်း', icon: 'pi pi-fw pi-list', to: '/branch/list' },
                { label: 'ဆိုင်ခွဲအသစ်ထည့်ရန်', icon: 'pi pi-fw pi-plus-circle', to: '/branch/new' },
                { label: 'ဆိုင်ခွဲ စီမံခန့်ခွဲမှု လမ်းညွှန်', icon: 'pi pi-fw pi-file', to: '/tutorial/branch' }
            ]
        },
        {
            label: 'အမှတ်တံဆိပ် စီမံခန့်ခွဲမှု',
            icon: 'pi pi-fw pi-tags',
            items: [
                { label: 'အမှတ်တံဆိပ်စာရင်း', icon: 'pi pi-fw pi-tag', to: '/brand/list' },
                { label: 'အမှတ်တံဆိပ်အသစ်ထည့်ရန်', icon: 'pi pi-fw pi-plus-circle', to: '/brand/new' },
                { label: 'အမှတ်တံဆိပ် စီမံခန့်ခွဲမှု လမ်းညွှန်', icon: 'pi pi-fw pi-file', to: '/tutorial/brand' }
            ]
        },
        {
            label: 'အမျိုးအစား စီမံခန့်ခွဲမှု',
            icon: 'pi pi-fw pi-sitemap',
            items: [
                { label: 'အမျိုးအစားစာရင်း', icon: 'pi pi-fw pi-list', to: '/category/list' },
                { label: 'အမျိုးအစားအသစ်ထည့်ရန်', icon: 'pi pi-fw pi-plus-circle', to: '/category/new' },
                { label: 'အမျိုးအစား စီမံခန့်ခွဲမှု လမ်းညွှန်', icon: 'pi pi-fw pi-file', to: '/tutorial/category' }
            ]
        },
        {
            label: 'ပစ္စည်း စီမံခန့်ခွဲမှု',
            icon: 'pi pi-fw pi-box',
            items: [
                { label: 'ပစ္စည်းစာရင်း', icon: 'pi pi-fw pi-list', to: '/product/list' },
                { label: 'ပစ္စည်းအသစ်ထည့်ရန်', icon: 'pi pi-fw pi-plus-circle', to: '/product/new' },
                { label: 'ပစ္စည်း စီမံခန့်ခွဲမှု လမ်းညွှန်', icon: 'pi pi-fw pi-file', to: '/tutorial/product' }
            ]
        },
        {
            label: 'ပစ္စည်းအမျိုးကွဲ စီမံခန့်ခွဲမှု',
            icon: 'pi pi-fw pi-clone',
            items: [
                { label: 'အမျိုးကွဲစာရင်း', icon: 'pi pi-fw pi-list', to: '/product-variant/list' },
                { label: 'အမျိုးကွဲအသစ်ထည့်ရန်', icon: 'pi pi-fw pi-plus-circle', to: '/product-variant/new' },
                { label: 'ပစ္စည်းအမျိုးကွဲ စီမံခန့်ခွဲမှု လမ်းညွှန်', icon: 'pi pi-fw pi-file', to: '/tutorial/product-variant' }
            ]
        },
        {
            label: 'အဝယ် စီမံခန့်ခွဲမှု',
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
                { label: 'အဝယ်အမှာစာများ', icon: 'pi pi-fw pi-list', to: '/purchase-order/list' },
                { label: 'အဝယ်အမှာစာအသစ်', icon: 'pi pi-fw pi-plus-circle', to: '/purchase-order/new' },
                { label: 'အဝယ် စီမံခန့်ခွဲမှု လမ်းညွှန်', icon: 'pi pi-fw pi-file', to: '/tutorial/purchase-order' }
            ]
        },
        {
            label: 'အရောင်း စီမံခန့်ခွဲမှု',
            icon: 'pi pi-fw pi-wallet',
            items: [
                { label: 'အရောင်းစာရင်း', icon: 'pi pi-fw pi-list', to: '/sale/list' },
                { label: 'အရောင်းအသစ်', icon: 'pi pi-fw pi-plus-circle', to: '/sale/new' },
                { label: 'အရောင်း စီမံခန့်ခွဲမှု လမ်းညွှန်', icon: 'pi pi-fw pi-file', to: '/tutorial/sale' }
            ]
        },
        {
            label: 'ကုန်လက်ကျန် စီမံခန့်ခွဲမှု',
            icon: 'pi pi-fw pi-database',
            items: [
                { label: 'ကုန်လက်ကျန်စာရင်း', icon: 'pi pi-fw pi-list', to: '/stock/list' },
                { label: 'ကုန်လက်ကျန်အပြောင်းလဲများ', icon: 'pi pi-fw pi-arrows-h', to: '/stock-movement/list' },
                { label: 'ကုန်လက်ကျန် စီမံခန့်ခွဲမှု လမ်းညွှန်', icon: 'pi pi-fw pi-file', to: '/tutorial/stock' }
            ]
        },
        {
            label: 'ပေးသွင်းသူ/ဒိုင် စီမံခန့်ခွဲမှု',
            icon: 'pi pi-fw pi-truck',
            items: [
                { label: 'ပေးသွင်းသူ/ဒိုင် စာရင်း', icon: 'pi pi-fw pi-list', to: '/supplier/list' },
                { label: 'ပေးသွင်းသူ/ဒိုင် အသစ်ထည့်ရန်', icon: 'pi pi-fw pi-plus-circle', to: '/supplier/new' },
                { label: 'ပေးသွင်းသူ/ဒိုင် စီမံခန့်ခွဲမှု လမ်းညွှန်', icon: 'pi pi-fw pi-file', to: '/tutorial/supplier' }
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
