'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ArchiveGroup } from '@/lib/archive';
import { getTypeLabel, formatDateShort } from '@/lib/utils';

export default function ArchiveGroupComponent({ groups }: { groups: ArchiveGroup[] }) {
  return (
    <div>
      {groups.map((yearGroup) => (
        <YearSection key={yearGroup.year} yearGroup={yearGroup} />
      ))}
    </div>
  );
}

function YearSection({ yearGroup }: { yearGroup: ArchiveGroup }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2
        onClick={() => setIsOpen(!isOpen)}
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {isOpen ? '▼' : '▶'} {yearGroup.year}
      </h2>
      {isOpen && (
        <div style={{ paddingLeft: '1.5rem' }}>
          {yearGroup.months.map((monthGroup) => (
            <MonthSection key={monthGroup.month} monthGroup={monthGroup} />
          ))}
        </div>
      )}
    </div>
  );
}

function MonthSection({ monthGroup }: { monthGroup: ArchiveGroup['months'][0] }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3
        onClick={() => setIsOpen(!isOpen)}
        style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '0.75rem',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {isOpen ? '▼' : '▶'} {monthGroup.month} 月
      </h3>
      {isOpen && (
        <div style={{ paddingLeft: '1.5rem' }}>
          {monthGroup.days.map((dayGroup) => (
            <DaySection key={dayGroup.day} dayGroup={dayGroup} />
          ))}
        </div>
      )}
    </div>
  );
}

function DaySection({ dayGroup }: { dayGroup: ArchiveGroup['months'][0]['days'][0] }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <h4 style={{
        fontSize: '1rem',
        fontWeight: '600',
        color: '#666',
        marginBottom: '0.5rem',
      }}>
        {dayGroup.day} 日
      </h4>
      <ul style={{ listStyle: 'none', marginLeft: '1rem' }}>
        {dayGroup.docs.map((doc) => (
          <li key={doc.id} style={{ marginBottom: '0.5rem' }}>
            <Link href={doc.detail_path} style={{ color: '#0070f3' }}>
              {doc.title}
            </Link>
            <span style={{
              marginLeft: '0.5rem',
              fontSize: '0.75rem',
              color: '#999',
            }}>
              [{getTypeLabel(doc.type)}]
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
