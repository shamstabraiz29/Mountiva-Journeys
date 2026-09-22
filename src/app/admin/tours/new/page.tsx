import type { Metadata } from 'next';
import TourForm from '@/components/admin/TourForm';

export const metadata: Metadata = {
  title: 'New tour',
};

export default function NewTourPage() {
  return <TourForm />;
}
