'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/Button';
import GoogleAuthButton, {
  AuthDivider,
} from '@/components/auth/GoogleAuthButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const fieldClass =
  'h-12 rounded-md border-accent/15 bg-background px-3.5 text-sm shadow-none transition-colors focus-visible:border-accent/40';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    // UI-only for now — wire to auth provider later
    window.setTimeout(() => setStatus('idle'), 600);
  }

  return (
    <div className="space-y-5">
      <GoogleAuthButton label="Continue with Google" />
      <AuthDivider label="or email" />

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="signin-email">Email</Label>
          <Input
            id="signin-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className={fieldClass}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="signin-password">Password</Label>
            <Link
              href="/auth/forget"
              className="text-[13px] font-medium text-accent underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="signin-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className={fieldClass}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === 'submitting'}
          className="w-full"
        >
          {status === 'submitting' ? 'Signing in…' : 'Sign in'}
          {status !== 'submitting' ? (
            <ArrowRight size={16} aria-hidden />
          ) : null}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          New to Mountiva?{' '}
          <Link
            href="/auth/signup"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
