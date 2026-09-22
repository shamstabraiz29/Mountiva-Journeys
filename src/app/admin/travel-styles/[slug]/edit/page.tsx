import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TravelStyleForm from '@/components/admin/TravelStyleForm';
import { getTravelStyleBySlug } from '@/lib/travel-styles';

export const metadata: Metadata = {
  title: 'Edit travel style',
};

export default async function EditTravelStylePage({
  params,
}: PageProps<'/admin/travel-styles/[slug]/edit'>) {
  const { slug } = await params;
  const style = getTravelStyleBySlug(slug);
  if (!style) notFound();
  return <TravelStyleForm initial={style} />;
}
