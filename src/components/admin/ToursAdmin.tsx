'use client';

import { Plus, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminSearch from '@/components/admin/AdminSearch';
import AdminTable from '@/components/admin/AdminTable';
import RowActions from '@/components/admin/RowActions';
import { formatDays, formatPrice, tours } from '@/lib/tours';

export default function ToursAdmin() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return tours;
    return tours.filter(
      (item) =>
        item.name.toLowerCase().includes(needle) ||
        item.destination.toLowerCase().includes(needle) ||
        item.id.includes(needle),
    );
  }, [query]);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Catalogue"
        title="Tours"
        description="Packages travellers can enquire about — itinerary, stays, and pricing."
        action={{
          href: '/admin/tours/new',
          label: 'New tour',
          icon: <Plus size={16} aria-hidden />,
        }}
      />

      <div className="mb-4 flex items-center justify-between gap-3">
        <AdminSearch
          value={query}
          onChange={setQuery}
          placeholder="Search tours"
        />
        <p className="text-xs text-muted-foreground">
          {filtered.length} of {tours.length}
        </p>
      </div>

      <AdminTable
        columns={['Tour', 'Destination', 'Length', 'From', 'Status', '']}
        empty={filtered.length === 0}
      >
        {filtered.map((tour) => (
          <tr key={tour.id} className="border-b border-accent/8 last:border-0">
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tour.image}
                  alt=""
                  className="size-11 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium tracking-[-0.01em]">{tour.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {tour.styles.join(' · ')}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-muted-foreground">
              {tour.destination}
            </td>
            <td className="px-4 py-3">{formatDays(tour.days)}</td>
            <td className="px-4 py-3 tabular-nums">
              {formatPrice(tour.priceFrom).replace(/^From /, '')}
            </td>
            <td className="px-4 py-3">
              {tour.featured ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-highlight/80 px-2 py-0.5 text-[11px] font-medium text-foreground">
                  <Star size={11} className="fill-current" />
                  Featured
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">Live</span>
              )}
            </td>
            <td className="px-4 py-3">
              <RowActions
                editHref={`/admin/tours/${tour.id}/edit`}
                viewHref={`/tour/${tour.id}`}
                deleteTitle={`Delete ${tour.name}?`}
                deleteDescription="This is a design preview. The tour will stay on the public site."
              />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
