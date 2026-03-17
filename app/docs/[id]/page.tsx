import { notFound } from 'next/navigation';
import { getDocById, getAllDocIds } from '@/lib/data';
import { formatDate, getTypeLabel, getTypeColor } from '@/lib/utils';
import TagList from '@/components/tag-list';
import MarkdownViewer from '@/components/markdown-viewer';

export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  const ids = await getAllDocIds();
  return ids.map((id) => ({ id }));
}

export default async function DocDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getDocById(id);

  if (!doc) {
    notFound();
  }

  return (
    <div>
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #e5e5e5',
        marginBottom: '2rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
          }} className={getTypeColor(doc.type)}>
            {getTypeLabel(doc.type)}
          </span>
          <span style={{ fontSize: '0.875rem', color: '#666' }}>
            创建: {formatDate(doc.created_at)}
          </span>
          {doc.updated_at !== doc.created_at && (
            <span style={{ fontSize: '0.875rem', color: '#666' }}>
              更新: {formatDate(doc.updated_at)}
            </span>
          )}
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {doc.title}
        </h1>

        {doc.summary && (
          <p style={{
            color: '#666',
            fontSize: '1rem',
            marginBottom: '1rem',
            lineHeight: '1.6',
          }}>
            {doc.summary}
          </p>
        )}

        {doc.tags && doc.tags.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <TagList tags={doc.tags} />
          </div>
        )}

        <div style={{
          fontSize: '0.875rem',
          color: '#999',
          borderTop: '1px solid #e5e5e5',
          paddingTop: '1rem',
        }}>
          <div style={{ marginBottom: '0.25rem' }}>
            <strong>来源:</strong> {doc.source}
          </div>
          {doc.duration && (
            <div style={{ marginBottom: '0.25rem' }}>
              <strong>时长:</strong> {Math.floor(doc.duration / 60)} 分 {Math.floor(doc.duration % 60)} 秒
            </div>
          )}
          {doc.language && (
            <div>
              <strong>语言:</strong> {doc.language}
            </div>
          )}
        </div>
      </div>

      {doc.markdown_missing || !doc.markdown ? (
        <div style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #e5e5e5',
          textAlign: 'center',
          color: '#999',
        }}>
          <p>Markdown 内容不可用</p>
        </div>
      ) : (
        <MarkdownViewer content={doc.markdown} />
      )}
    </div>
  );
}
