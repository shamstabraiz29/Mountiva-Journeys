'use client';

import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminSearch from '@/components/admin/AdminSearch';
import AdminTable from '@/components/admin/AdminTable';
import RowActions from '@/components/admin/RowActions';
import { getFaqItems } from '@/lib/faq';

export default function FaqAdmin() {
  const [query, setQuery] = useState('');
  const items = useMemo(() => getFaqItems(), []);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(needle) ||
        item.topic.toLowerCase().includes(needle),
    );
  }, [items, query]);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Help"
        title="FAQ"
        description="Answers grouped by topic on the public help page."
        action={{
          href: '/admin/faq/new',
          label: 'New question',
          icon: <Plus size={16} aria-hidden />,
        }}
      />

      <div className="mb-4 flex items-center justify-between gap-3">
        <AdminSearch
          value={query}
          onChange={setQuery}
          placeholder="Search questions"
        />
        <p className="text-xs text-muted-foreground">
          {filtered.length} of {items.length}
        </p>
      </div>

      <AdminTable
        columns={['Question', 'Topic', '']}
        empty={filtered.length === 0}
      >
        {filtered.map((item) => (
          <tr key={item.id} className="border-b border-accent/8 last:border-0">
            <td className="px-4 py-3">
              <p className="font-medium tracking-[-0.01em]">{item.question}</p>
              <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                {item.answer}
              </p>
            </td>
            <td className="px-4 py-3 text-muted-foreground">{item.topic}</td>
            <td className="px-4 py-3">
              <RowActions
                editHref={`/admin/faq/${item.id}/edit`}
                viewHref="/faq"
                deleteTitle="Delete this question?"
                deleteDescription="This is a design preview. The question will stay on the public FAQ."
              />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
