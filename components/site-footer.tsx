export default function SiteFooter() {
  return (
    <footer style={{
      background: '#fff',
      borderTop: '1px solid #e5e5e5',
      padding: '1.5rem 2rem',
      textAlign: 'center',
      color: '#666',
      fontSize: '0.9rem',
    }}>
      <p>Collector Site © {new Date().getFullYear()}</p>
    </footer>
  );
}
