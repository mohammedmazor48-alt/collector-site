import Link from 'next/link';
import type { DocIndex } from '@/lib/types';
import { formatDate, getTypeLabel, getTypeColor } from '@/lib/utils';
import TagList from './tag-list';

export default function DocCard({ doc }: { doc: DocIndex }) {
  return (
    <div style={{
      background: '#fff',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid #e5e5e5',
      marginBottom: '1rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <span style={{
          fontSize: '0.75rem',
          padding: '0.25rem 0.75rem',
          borderRadius: '12px',
        }} className={getTypeColor(doc.type)}>
          {getTypeLabel(doc.type)}
        </span>
        <span style={{ fontSize: '0.875rem', color: '#666' }}>
          {formatDate(doc.created_at)}
        </span>
      </div>

      <Link href={doc.detail_path} style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#333',
        display: 'block',
        marginBottom: '0.5rem',
      }}>
        {doc.title}
      </Link>

      {doc.summary && (
        <p style={{
          color: '#666',
          fontSize: '0.95rem',
          marginBottom: '0.75rem',
          lineHeight: '1.6',
        }}>
          {doc.summary.length > 150 ? doc.summary.slice(0, 150) + '...' : doc.summary}
        </p>
      )}

      {doc.tags && doc.tags.length > 0 && (
        <TagList tags={doc.tags} />
      )}
    </div>
  );
}
