import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FaqForm from '@/components/admin/FaqForm';
import { getFaqItem } from '@/lib/faq';

export const metadata: Metadata = {
  title: 'Edit question',
};

export default async function EditFaqPage({
  params,
}: PageProps<'/admin/faq/[id]/edit'>) {
  const { id } = await params;
  const item = getFaqItem(id);
  if (!item) notFound();
  return (
    <FaqForm
      initial={{
        topic: item.topic,
        question: item.question,
        answer: item.answer,
      }}
    />
  );
}
