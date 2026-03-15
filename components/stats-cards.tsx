import type { Stats } from '@/lib/types';
import { getTypeLabel } from '@/lib/utils';

export default function StatsCards({ stats }: { stats: Stats }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem',
    }}>
      <div style={{
        background: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #e5e5e5',
      }}>
        <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
          总文档数
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
          {stats.total_docs}
        </div>
      </div>
      {Object.entries(stats.by_type).map(([type, count]) => (
        <div key={type} style={{
          background: '#fff',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e5e5e5',
        }}>
          <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
            {getTypeLabel(type)}
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
            {count}
          </div>
        </div>
      ))}
    </div>
  );
}
