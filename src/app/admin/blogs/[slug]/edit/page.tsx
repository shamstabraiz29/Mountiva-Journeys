import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogForm from '@/components/admin/BlogForm';
import { getBlogPost } from '@/lib/blogs';

export const metadata: Metadata = {
  title: 'Edit story',
};

export default async function EditBlogPage({
  params,
}: PageProps<'/admin/blogs/[slug]/edit'>) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return <BlogForm initial={post} />;
}
