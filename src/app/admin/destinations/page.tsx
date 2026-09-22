import type { Metadata } from 'next';
import DestinationsAdmin from '@/components/admin/DestinationsAdmin';

export const metadata: Metadata = {
  title: 'Destinations',
};

export default function AdminDestinationsPage() {
  return <DestinationsAdmin />;
}
