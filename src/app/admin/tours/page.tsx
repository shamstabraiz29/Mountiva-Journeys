import type { Metadata } from 'next';
import ToursAdmin from '@/components/admin/ToursAdmin';

export const metadata: Metadata = {
  title: 'Tours',
};

export default function AdminToursPage() {
  return <ToursAdmin />;
}
