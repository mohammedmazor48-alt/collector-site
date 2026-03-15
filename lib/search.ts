import type { DocIndex } from './types';

export function searchDocs(docs: DocIndex[], query: string): DocIndex[] {
  if (!query.trim()) return docs;

  const q = query.toLowerCase().trim();

  return docs.filter((doc) => {
    return (
      doc.title?.toLowerCase().includes(q) ||
      doc.summary?.toLowerCase().includes(q) ||
      doc.type?.toLowerCase().includes(q) ||
      doc.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  });
}
