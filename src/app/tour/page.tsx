import { redirect } from 'next/navigation';
import { getDestinationByName, getDestinationBySlug } from '@/lib/destinations';
import { getTravelStyleByName } from '@/lib/travel-styles';

type TourPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function first(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function TourIndexPage({ searchParams }: TourPageProps) {
  const params = await searchParams;
  const destinationQuery = first(params.destination) ?? first(params.q);
  if (destinationQuery) {
    const match =
      getDestinationByName(destinationQuery) ??
      getDestinationBySlug(destinationQuery);
    if (match) redirect(`/destinations/${match.slug}`);
  }

  const styleQuery = first(params.style);
  if (styleQuery) {
    const match = getTravelStyleByName(styleQuery);
    if (match) redirect(`/travel-styles/${match.slug}`);
  }

  redirect('/destinations');
}
