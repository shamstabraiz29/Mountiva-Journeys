'use client';

import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminSearch from '@/components/admin/AdminSearch';
import AdminTable from '@/components/admin/AdminTable';
import RowActions from '@/components/admin/RowActions';
import { getToursForStyle } from '@/lib/tours';
import { travelStyles } from '@/lib/travel-styles';

export default function TravelStylesAdmin() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return travelStyles;
    return travelStyles.filter(
      (item) =>
        item.name.toLowerCase().includes(needle) ||
        item.label.toLowerCase().includes(needle) ||
        item.slug.includes(needle),
    );
  }, [query]);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Catalogue"
        title="Travel styles"
        description="How journeys are grouped on the public site — valley, trek, adventure, culture."
        action={{
          href: '/admin/travel-styles/new',
          label: 'New travel style',
          icon: <Plus size={16} aria-hidden />,
        }}
      />

      <div className="mb-4 flex items-center justify-between gap-3">
        <AdminSearch
          value={query}
          onChange={setQuery}
          placeholder="Search styles"
        />
        <p className="text-xs text-muted-foreground">
          {filtered.length} of {travelStyles.length}
        </p>
      </div>

      <AdminTable
        columns={['Style', 'Tagline', 'Tours', '']}
        empty={filtered.length === 0}
      >
        {filtered.map((style) => {
          const count = getToursForStyle(style.name).length;
          return (
            <tr
              key={style.slug}
              className="border-b border-accent/8 last:border-0"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={style.image}
                    alt=""
                    className="size-11 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium tracking-[-0.01em]">{style.label}</p>
                    <p className="text-xs text-muted-foreground">{style.name}</p>
                  </div>
                </div>
              </td>
              <td className="max-w-sm px-4 py-3 text-muted-foreground">
                {style.tagline}
              </td>
              <td className="px-4 py-3 tabular-nums">{count}</td>
              <td className="px-4 py-3">
                <RowActions
                  editHref={`/admin/travel-styles/${style.slug}/edit`}
                  viewHref={`/travel-styles/${style.slug}`}
                  deleteTitle={`Delete ${style.label}?`}
                  deleteDescription="This is a design preview. The style will stay on the public site."
                />
              </td>
            </tr>
          );
        })}
      </AdminTable>
    </div>
  );
}
