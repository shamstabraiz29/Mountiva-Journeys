import type { Metadata } from 'next';
import AuthShell from '@/components/auth/AuthShell';
import SignInForm from '@/components/auth/SignInForm';

export const metadata: Metadata = {
  title: 'Sign in | Mountiva Journeys',
  description: 'Sign in to your Mountiva Journeys account.',
};

export default function SignInPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to Mountiva"
      description="Access saved journeys, enquiries, and your northern trip plans."
    >
      <SignInForm />
    </AuthShell>
  );
}
