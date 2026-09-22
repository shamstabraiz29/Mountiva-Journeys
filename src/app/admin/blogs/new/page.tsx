import type { Metadata } from 'next';
import BlogForm from '@/components/admin/BlogForm';

export const metadata: Metadata = {
  title: 'New story',
};

export default function NewBlogPage() {
  return <BlogForm />;
}
