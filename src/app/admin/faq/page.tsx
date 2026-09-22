import type { Metadata } from 'next';
import FaqAdmin from '@/components/admin/FaqAdmin';

export const metadata: Metadata = {
  title: 'FAQ',
};

export default function AdminFaqPage() {
  return <FaqAdmin />;
}
