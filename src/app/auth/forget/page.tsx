import type { Metadata } from 'next';
import AuthShell from '@/components/auth/AuthShell';
import ForgetForm from '@/components/auth/ForgetForm';

export const metadata: Metadata = {
  title: 'Forgot password | Mountiva Journeys',
  description: 'Reset your Mountiva Journeys account password.',
};

export default function ForgetPage() {
  return (
    <AuthShell
      eyebrow="Account help"
      title="Reset your password"
      description="Enter the email on your account and we'll send a reset link."
    >
      <ForgetForm />
    </AuthShell>
  );
}
