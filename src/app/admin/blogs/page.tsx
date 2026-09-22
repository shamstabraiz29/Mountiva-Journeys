import type { Metadata } from 'next';
import BlogsAdmin from '@/components/admin/BlogsAdmin';

export const metadata: Metadata = {
  title: 'Blogs',
};

export default function AdminBlogsPage() {
  return <BlogsAdmin />;
}
