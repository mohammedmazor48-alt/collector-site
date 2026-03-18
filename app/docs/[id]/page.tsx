import { notFound } from 'next/navigation';
import { getDocById, getAllDocIds } from '@/lib/data';
import { formatDate, getTypeLabel, getTypeColor } from '@/lib/utils';
import TagList from '@/components/tag-list';
import MarkdownViewer from '@/components/markdown-viewer';

export const dynamic = 'force-static';
export const revalidate = false;

// 清理 markdown 内容，去掉 YAML frontmatter 和混乱的元数据
function cleanMarkdown(markdown: string): string {
  // 去掉 YAML frontmatter (---...---)
  let cleaned = markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  
  // 去掉 "## 基本信息" 部分（包含类型、来源、作者等）
  cleaned = cleaned.replace(/## 基本信息\s*\n[\s\S]*?(?=\n## |$)/, '');
  
  // 去掉 "## 附注" 部分
  cleaned = cleaned.replace(/## 附注\s*\n[\s\S]*?$/, '');
  
  // 去掉 "id: ... type: ..." 这种混乱的元数据行
  cleaned = cleaned.replace(/^id:\s*.+$/gm, '');
  cleaned = cleaned.replace(/^type:\s*.+$/gm, '');
  cleaned = cleaned.replace(/^title:\s*.+$/gm, '');
  cleaned = cleaned.replace(/^source:\s*.+$/gm, '');
  cleaned = cleaned.replace(/^captured_at:\s*.+$/gm, '');
  cleaned = cleaned.replace(/^author:\s*.+$/gm, '');
  cleaned = cleaned.replace(/^published_at:\s*.+$/gm, '');
  cleaned = cleaned.replace(/^language:\s*.+$/gm, '');
  cleaned = cleaned.replace(/^tags:\s*.+$/gm, '');
  cleaned = cleaned.replace(/^status:\s*.+$/gm, '');
  cleaned = cleaned.replace(/^content_hash:\s*.+$/gm, '');
  cleaned = cleaned.replace(/^summary:\s*.+$/gm, '');
  
  // 清理多余的空行
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  
  return cleaned.trim();
}

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
          {doc.duration && (
            <div style={{ marginBottom: '0.25rem' }}>
              <strong>时长:</strong> {Math.floor(doc.duration / 60)} 分 {Math.floor(doc.duration % 60)} 秒
            </div>
          )}
          {doc.source && doc.source.startsWith('http') && (
            <div style={{ marginBottom: '0.25rem' }}>
              <strong>来源:</strong>{' '}
              <a href={doc.source} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff' }}>
                {doc.source.length > 60 ? doc.source.substring(0, 60) + '…' : doc.source}
              </a>
            </div>
          )}
        </div>
      </div>

      {doc.content_html ? (
        <div
          className="wechat-article-content"
          dangerouslySetInnerHTML={{ __html: doc.content_html }}
          style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
            lineHeight: '1.8',
            fontSize: '1rem',
            overflowX: 'hidden',
          }}
        />
      ) : doc.markdown_missing || !doc.markdown ? (
        <div style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #e5e5e5',
          textAlign: 'center',
          color: '#999',
        }}>
          <p>内容不可用</p>
        </div>
      ) : (
        <MarkdownViewer content={cleanMarkdown(doc.markdown)} />
      )}
    </div>
  );
}
