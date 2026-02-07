import { Metadata } from 'next';
import Layout from '../../layout/layout';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'အကောက်ခွန်ဦးစီးဌာန၊ MACCS ဌာနခွဲ',
    description: 'Admin management console for MACCSS CEIR ID.',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'အကောက်ခွန်ဦးစီးဌာန၊ MACCS ဌာနခွဲ',
        url: 'https://customs.gov.mm/',
        description: 'Admin management console for MACCSS CEIR ID.',
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
