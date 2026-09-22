import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DestinationForm from '@/components/admin/DestinationForm';
import { getDestinationBySlug } from '@/lib/destinations';

export const metadata: Metadata = {
  title: 'Edit destination',
};

export default async function EditDestinationPage({
  params,
}: PageProps<'/admin/destinations/[slug]/edit'>) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();
  return <DestinationForm initial={destination} />;
}
