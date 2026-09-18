'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { uniqueDestinations } from '@/lib/tours';

const months = [
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'Flexible',
] as const;

const tripTypes = [
  { value: 'package', label: 'Ready package' },
  { value: 'custom', label: 'Custom trip' },
  { value: 'women', label: 'Women-only' },
  { value: 'question', label: 'Just a question' },
] as const;

const fieldClass =
  'h-12 rounded-md border-accent/15 bg-background px-3.5 text-sm shadow-none transition-colors focus-visible:border-accent/40';

const selectClass =
  'h-12 w-full data-[size=default]:h-12 rounded-md border-accent/15 bg-background px-3.5 text-sm shadow-none transition-colors focus-visible:border-accent/40 focus-visible:ring-0';

type FormState = {
  name: string;
  email: string;
  phone: string;
  destination: string;
  month: string;
  travelers: string;
  tripType: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  destination: '',
  month: '',
  travelers: '',
  tripType: '',
  message: '',
};

type ContactFormProps = {
  initialTour?: string;
  initialStay?: string;
};

function defaultMessage(tour?: string, stay?: string) {
  if (tour && stay) {
    return `I'd like to enquire about the ${stay} stay on ${tour}.`;
  }
  if (tour) {
    return `I'd like to enquire about ${tour}.`;
  }
  return '';
}

export default function ContactForm({
  initialTour,
  initialStay,
}: ContactFormProps) {
  const [form, setForm] = useState<FormState>({
    ...initialState,
    tripType: initialStay ? 'package' : '',
    message: defaultMessage(initialTour, initialStay),
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const destinations = uniqueDestinations();

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    const tripLabel =
      tripTypes.find((item) => item.value === form.tripType)?.label ??
      form.tripType;

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      form.destination ? `Destination: ${form.destination}` : null,
      initialTour ? `Tour: ${initialTour}` : null,
      initialStay ? `Stay: ${initialStay}` : null,
      form.month ? `Travel month: ${form.month}` : null,
      form.travelers ? `Travellers: ${form.travelers}` : null,
      tripLabel ? `Enquiry type: ${tripLabel}` : null,
      '',
      form.message,
    ]
      .filter((line) => line !== null)
      .join('\n');

    const mailto = `mailto:hello@mountiva.travel?subject=${encodeURIComponent(
      `Mountiva enquiry — ${form.name}`
    )}&body=${encodeURIComponent(body)}`;

    window.setTimeout(() => {
      window.location.href = mailto;
      setStatus('sent');
    }, 400);
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-start py-2">
        <span className="flex size-12 items-center justify-center rounded-full bg-accent text-highlight">
          <CheckCircle2 size={22} strokeWidth={1.6} aria-hidden />
        </span>
        <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">
          Enquiry ready to send
        </h3>
        <p className="mt-3 max-w-md text-[15px] leading-7 text-muted-foreground">
          Your email client should open with the details filled in. If it
          doesn&apos;t, write to{' '}
          <a
            href="mailto:hello@mountiva.travel"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            hello@mountiva.travel
          </a>
          .
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-8"
          onClick={() => {
            setForm(initialState);
            setStatus('idle');
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Your name"
            className={fieldClass}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@email.com"
            className={fieldClass}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-phone">
            Phone{' '}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+92 …"
            className={fieldClass}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-travelers">Travellers</Label>
          <Input
            id="contact-travelers"
            name="travelers"
            inputMode="numeric"
            value={form.travelers}
            onChange={(e) => update('travelers', e.target.value)}
            placeholder="e.g. 2"
            className={fieldClass}
          />
        </div>

        <div className="space-y-2">
          <Label>Destination</Label>
          <Select
            value={form.destination || undefined}
            onValueChange={(value) => update('destination', value ?? '')}
          >
            <SelectTrigger className={selectClass}>
              <SelectValue placeholder="Choose a place" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Not sure yet">Not sure yet</SelectItem>
              {destinations.map((place) => (
                <SelectItem key={place} value={place}>
                  {place}
                </SelectItem>
              ))}
              <SelectItem value="Multiple / custom">Multiple / custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Travel month</Label>
          <Select
            value={form.month || undefined}
            onValueChange={(value) => update('month', value ?? '')}
          >
            <SelectTrigger className={selectClass}>
              <SelectValue placeholder="When do you want to go?" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label>Enquiry type</Label>
          <Select
            value={form.tripType || undefined}
            onValueChange={(value) => update('tripType', value ?? '')}
          >
            <SelectTrigger className={selectClass}>
              <SelectValue placeholder="What are you looking for?" />
            </SelectTrigger>
            <SelectContent>
              {tripTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="contact-message">Message</Label>
          <Textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder="Tell us where you want to go, when, and anything we should know."
            className="min-h-32 rounded-md border-accent/15 bg-background px-3.5 py-3 text-sm shadow-none focus-visible:border-accent/40"
          />
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Opening email…' : 'Send enquiry'}
          {status !== 'sending' ? <ArrowRight size={16} aria-hidden /> : null}
        </Button>
      </div>
    </form>
  );
}
