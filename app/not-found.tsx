import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
    }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        404
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem' }}>
        页面未找到
      </p>
      <Link href="/" style={{
        display: 'inline-block',
        padding: '0.75rem 2rem',
        background: '#0070f3',
        color: '#fff',
        borderRadius: '6px',
        textDecoration: 'none',
      }}>
        返回首页
      </Link>
    </div>
  );
}
