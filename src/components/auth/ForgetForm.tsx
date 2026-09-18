'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const fieldClass =
  'h-12 rounded-md border-accent/15 bg-background px-3.5 text-sm shadow-none transition-colors focus-visible:border-accent/40';

export default function ForgetForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent'>('idle');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    // UI-only for now — wire to auth provider later
    window.setTimeout(() => setStatus('sent'), 600);
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-start">
        <span className="flex size-12 items-center justify-center rounded-full bg-accent text-highlight">
          <CheckCircle2 size={22} strokeWidth={1.6} aria-hidden />
        </span>
        <h2 className="mt-6 text-2xl font-medium tracking-[-0.03em]">
          Check your email
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
          If an account exists for{' '}
          <span className="font-medium text-foreground">{email}</span>, we&apos;ll
          send a reset link shortly.
        </p>
        <Button href="/auth/signin" variant="primary" size="lg" className="mt-8">
          Back to sign in
          <ArrowRight size={16} aria-hidden />
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="forget-email">Email</Label>
        <Input
          id="forget-email"
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

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === 'submitting'}
        className="w-full"
      >
        {status === 'submitting' ? 'Sending…' : 'Send reset link'}
        {status !== 'submitting' ? <ArrowRight size={16} aria-hidden /> : null}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Remembered it?{' '}
        <Link
          href="/auth/signin"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
