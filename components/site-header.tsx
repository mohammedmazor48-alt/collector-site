import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header style={{
      background: '#fff',
      borderBottom: '1px solid #e5e5e5',
      padding: '1rem 2rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link href="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#333',
          textDecoration: 'none',
        }}>
          Collector Site
        </Link>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/" style={{ color: '#666' }}>首页</Link>
          <Link href="/search" style={{ color: '#666' }}>搜索</Link>
          <Link href="/archive" style={{ color: '#666' }}>归档</Link>
        </nav>
      </div>
    </header>
  );
}
