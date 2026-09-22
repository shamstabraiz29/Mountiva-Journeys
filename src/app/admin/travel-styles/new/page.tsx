import type { Metadata } from 'next';
import TravelStyleForm from '@/components/admin/TravelStyleForm';

export const metadata: Metadata = {
  title: 'New travel style',
};

export default function NewTravelStylePage() {
  return <TravelStyleForm />;
}
