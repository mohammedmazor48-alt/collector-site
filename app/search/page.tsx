'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { DocIndex } from '@/lib/types';
import { searchDocs } from '@/lib/search';
import SearchBar from '@/components/search-bar';
import DocCard from '@/components/doc-card';
import EmptyState from '@/components/empty-state';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [allDocs, setAllDocs] = useState<DocIndex[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/index.json')
      .then((res) => res.json())
      .then((data) => {
        setAllDocs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load data:', err);
        setLoading(false);
      });
  }, []);

  const results = query ? searchDocs(allDocs, query) : [];

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        搜索
      </h1>

      <SearchBar />

      {query && (
        <div style={{ marginBottom: '1rem', color: '#666' }}>
          搜索 &ldquo;{query}&rdquo; 找到 {results.length} 条结果
        </div>
      )}

      {query && results.length === 0 && (
        <EmptyState message="没有找到匹配的内容" />
      )}

      {results.length > 0 && (
        <div>
          {results.map((doc) => (
            <DocCard key={doc.id} doc={doc} />
          ))}
        </div>
      )}

      {!query && (
        <EmptyState message="请输入搜索关键词" />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <SearchContent />
    </Suspense>
  );
}
