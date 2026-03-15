export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {tags.map((tag, index) => (
        <span
          key={index}
          style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            background: '#f0f0f0',
            color: '#666',
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
