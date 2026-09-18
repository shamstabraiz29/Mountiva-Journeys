import type { Metadata } from 'next';
import AuthShell from '@/components/auth/AuthShell';
import SignUpForm from '@/components/auth/SignUpForm';

export const metadata: Metadata = {
  title: 'Sign up | Mountiva Journeys',
  description: 'Create a Mountiva Journeys account to plan northern Pakistan trips.',
};

export default function SignUpPage() {
  return (
    <AuthShell
      eyebrow="Join Mountiva"
      title="Create your account"
      description="Save enquiries, follow journeys, and plan Gilgit-Baltistan trips in one place."
    >
      <SignUpForm />
    </AuthShell>
  );
}
