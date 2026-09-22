import type { Metadata } from 'next';
import AdminShell from '@/components/admin/AdminShell';

export const metadata: Metadata = {
  title: {
    default: 'Admin | Mountiva Journeys',
    template: '%s | Admin',
  },
  description: 'Create and shape destinations, tours, travel styles, and stories.',
};

export default function AdminLayout({ children }: LayoutProps<'/admin'>) {
  return <AdminShell>{children}</AdminShell>;
}
