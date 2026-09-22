import type { Metadata } from 'next';
import DestinationForm from '@/components/admin/DestinationForm';

export const metadata: Metadata = {
  title: 'New destination',
};

export default function NewDestinationPage() {
  return <DestinationForm />;
}
