import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TourForm from '@/components/admin/TourForm';
import { tours } from '@/lib/tours';

export const metadata: Metadata = {
  title: 'Edit tour',
};

export default async function EditTourPage({
  params,
}: PageProps<'/admin/tours/[id]/edit'>) {
  const { id } = await params;
  const tour = tours.find((item) => item.id === id);
  if (!tour) notFound();
  return <TourForm initial={tour} />;
}
