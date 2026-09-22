import type { Metadata } from 'next';
import TravelStylesAdmin from '@/components/admin/TravelStylesAdmin';

export const metadata: Metadata = {
  title: 'Travel styles',
};

export default function AdminTravelStylesPage() {
  return <TravelStylesAdmin />;
}
