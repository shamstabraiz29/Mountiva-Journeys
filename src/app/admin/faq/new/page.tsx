import type { Metadata } from 'next';
import FaqForm from '@/components/admin/FaqForm';

export const metadata: Metadata = {
  title: 'New question',
};

export default function NewFaqPage() {
  return <FaqForm />;
}
