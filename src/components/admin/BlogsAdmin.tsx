'use client';

import { Plus, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminSearch from '@/components/admin/AdminSearch';
import AdminTable from '@/components/admin/AdminTable';
import RowActions from '@/components/admin/RowActions';
import { blogPosts, formatBlogDate } from '@/lib/blogs';

export default function BlogsAdmin() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return blogPosts;
    return blogPosts.filter(
      (item) =>
        item.title.toLowerCase().includes(needle) ||
        item.category.toLowerCase().includes(needle) ||
        item.slug.includes(needle),
    );
  }, [query]);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Journal"
        title="Blogs"
        description="Season guides, field notes, and destination stories."
        action={{
          href: '/admin/blogs/new',
          label: 'New story',
          icon: <Plus size={16} aria-hidden />,
        }}
      />

      <div className="mb-4 flex items-center justify-between gap-3">
        <AdminSearch
          value={query}
          onChange={setQuery}
          placeholder="Search stories"
        />
        <p className="text-xs text-muted-foreground">
          {filtered.length} of {blogPosts.length}
        </p>
      </div>

      <AdminTable
        columns={['Story', 'Category', 'Published', 'Status', '']}
        empty={filtered.length === 0}
      >
        {filtered.map((post) => (
          <tr key={post.slug} className="border-b border-accent/8 last:border-0">
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt=""
                  className="size-11 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <p className="font-medium tracking-[-0.01em]">{post.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {post.readMinutes} min · {post.author}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-muted-foreground">{post.category}</td>
            <td className="px-4 py-3 text-muted-foreground">
              {formatBlogDate(post.publishedAt)}
            </td>
            <td className="px-4 py-3">
              {post.featured ? (
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
                editHref={`/admin/blogs/${post.slug}/edit`}
                viewHref={`/blogs/${post.slug}`}
                deleteTitle={`Delete this story?`}
                deleteDescription="This is a design preview. The post will stay on the public site."
              />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
