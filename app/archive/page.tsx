import { getIndexData } from '@/lib/data';
import { groupByDate } from '@/lib/archive';
import ArchiveGroupComponent from '@/components/archive-group';
import EmptyState from '@/components/empty-state';

export default async function ArchivePage() {
  const docs = await getIndexData();
  const groups = groupByDate(docs);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        归档
      </h1>

      <p style={{ color: '#666', marginBottom: '2rem' }}>
        共 {docs.length} 条记录
      </p>

      {groups.length === 0 ? (
        <EmptyState message="暂无归档内容" />
      ) : (
        <ArchiveGroupComponent groups={groups} />
      )}
    </div>
  );
}
