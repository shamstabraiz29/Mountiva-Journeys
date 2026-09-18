import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Account | Mountiva Journeys',
  description: 'Sign in or create a Mountiva Journeys account.',
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-full bg-secondary">{children}</div>;
}
