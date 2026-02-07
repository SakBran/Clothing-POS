import { Metadata } from 'next';
import Layout from '../../layout/layout';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'အထည်ဆိုင် POS စနစ်',
    description: 'အထည်ဆိုင် အရောင်း/အဝယ် စီမံခန့်ခွဲမှု စနစ်',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'အထည်ဆိုင် အရောင်း/အဝယ် စီမံခန့်ခွဲမှု စနစ်',
        url: 'https://customs.gov.mm/',
        description: 'အထည်ဆိုင် အရောင်း/အဝယ် စီမံခန့်ခွဲမှု စနစ်',
        images: ['https://www.primefaces.org/static/social/sakai-react.png'],
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <Layout>{children}</Layout>;
}
