import { getIndexData, getStatsData } from '@/lib/data';
import StatsCards from '@/components/stats-cards';
import DocCard from '@/components/doc-card';
import EmptyState from '@/components/empty-state';
import { formatDate } from '@/lib/utils';

export default async function HomePage() {
  const [docs, stats] = await Promise.all([
    getIndexData(),
    getStatsData(),
  ]);

  const recentDocs = docs.slice(0, 20);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          知识库查询站
        </h1>
        <p style={{ color: '#666', fontSize: '1rem' }}>
          本地内容采集系统 - 查询与浏览
        </p>
        {stats && (
          <p style={{ color: '#999', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            最后更新: {formatDate(stats.updated_at)}
          </p>
        )}
      </div>

      {stats && <StatsCards stats={stats} />}

      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
        最近更新
      </h2>

      {recentDocs.length === 0 ? (
        <EmptyState message="暂无内容" />
      ) : (
        <div>
          {recentDocs.map((doc) => (
            <DocCard key={doc.id} doc={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
