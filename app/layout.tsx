import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Collector Site - 知识库查询站',
  description: '本地内容采集系统查询站',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader />
        <main style={{ minHeight: 'calc(100vh - 140px)', padding: '2rem 1rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {children}
          </div>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
