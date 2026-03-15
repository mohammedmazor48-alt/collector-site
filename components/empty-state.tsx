export default function EmptyState({ message }: { message: string }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      color: '#999',
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
      <p style={{ fontSize: '1.1rem' }}>{message}</p>
    </div>
  );
}
