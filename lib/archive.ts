import type { DocIndex } from './types';

export interface ArchiveGroup {
  year: string;
  months: {
    month: string;
    days: {
      day: string;
      docs: DocIndex[];
    }[];
  }[];
}

export function groupByDate(docs: DocIndex[]): ArchiveGroup[] {
  const grouped = new Map<string, Map<string, Map<string, DocIndex[]>>>();

  docs.forEach((doc) => {
    try {
      const date = new Date(doc.created_at);
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');

      if (!grouped.has(year)) {
        grouped.set(year, new Map());
      }
      const yearMap = grouped.get(year)!;

      if (!yearMap.has(month)) {
        yearMap.set(month, new Map());
      }
      const monthMap = yearMap.get(month)!;

      if (!monthMap.has(day)) {
        monthMap.set(day, []);
      }
      monthMap.get(day)!.push(doc);
    } catch (error) {
      console.error('Failed to parse date:', doc.created_at, error);
    }
  });

  const result: ArchiveGroup[] = [];

  Array.from(grouped.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .forEach(([year, monthMap]) => {
      const months = Array.from(monthMap.entries())
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([month, dayMap]) => ({
          month,
          days: Array.from(dayMap.entries())
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([day, docs]) => ({
              day,
              docs,
            })),
        }));

      result.push({ year, months });
    });

  return result;
}
