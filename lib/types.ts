export interface DocIndex {
  id: string;
  title: string;
  type: string;
  summary: string;
  tags: string[];
  status: string;
  created_at: string;
  updated_at: string;
  source: string;
  detail_path: string;
}

export interface Stats {
  total_docs: number;
  by_type: Record<string, number>;
  updated_at: string;
}

export interface DocDetail {
  id: string;
  title: string;
  type: string;
  summary: string;
  tags: string[];
  status: string;
  source: string;
  created_at: string;
  updated_at: string;
  note_path: string;
  meta_path: string;
  markdown: string | null;
  content_html?: string | null;
  content_text: string;
  summary_data: any;
  duration?: number;
  language: string;
  author?: string | null;
  published_at?: string | null;
  captured_at: string;
  markdown_missing?: boolean;
}
