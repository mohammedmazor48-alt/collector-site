import ReactMarkdown from 'react-markdown';

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <div style={{
      background: '#fff',
      padding: '2rem',
      borderRadius: '8px',
      border: '1px solid #e5e5e5',
      lineHeight: '1.8',
    }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
