'use client';

import { Plus, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminSearch from '@/components/admin/AdminSearch';
import AdminTable from '@/components/admin/AdminTable';
import RowActions from '@/components/admin/RowActions';
import { destinations } from '@/lib/destinations';
import { getToursForDestination } from '@/lib/tours';

export default function DestinationsAdmin() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return destinations;
    return destinations.filter(
      (item) =>
        item.name.toLowerCase().includes(needle) ||
        item.region.toLowerCase().includes(needle) ||
        item.slug.includes(needle),
    );
  }, [query]);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Catalogue"
        title="Destinations"
        description="Places on the public site — each one can hold packages, a map, and a gallery."
        action={{
          href: '/admin/destinations/new',
          label: 'New destination',
          icon: <Plus size={16} aria-hidden />,
        }}
      />

      <div className="mb-4 flex items-center justify-between gap-3">
        <AdminSearch
          value={query}
          onChange={setQuery}
          placeholder="Search destinations"
        />
        <p className="text-xs text-muted-foreground">
          {filtered.length} of {destinations.length}
        </p>
      </div>

      <AdminTable
        columns={['Place', 'Region', 'Packages', 'Status', '']}
        empty={filtered.length === 0}
      >
        {filtered.map((destination) => {
          const count = getToursForDestination(destination.slug).length;
          return (
            <tr
              key={destination.slug}
              className="border-b border-accent/8 last:border-0"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={destination.image}
                    alt=""
                    className="size-11 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium tracking-[-0.01em]">
                      {destination.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      /{destination.slug}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {destination.region}
              </td>
              <td className="px-4 py-3 tabular-nums">{count}</td>
              <td className="px-4 py-3">
                {destination.featured ? (
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
                  editHref={`/admin/destinations/${destination.slug}/edit`}
                  viewHref={`/destinations/${destination.slug}`}
                  deleteTitle={`Delete ${destination.name}?`}
                  deleteDescription="This is a design preview. The destination will stay on the public site."
                />
              </td>
            </tr>
          );
        })}
      </AdminTable>
    </div>
  );
}
