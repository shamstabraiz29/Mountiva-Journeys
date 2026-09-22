'use client';

import { useState, type FormEvent } from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminSuccess from '@/components/admin/AdminSuccess';
import FormSection from '@/components/admin/FormSection';
import {
  fieldClass,
  selectClass,
  textareaClass,
} from '@/components/admin/field-styles';
import Button from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { faqGroups } from '@/lib/faq';

const topics = faqGroups.map((group) => group.label);

type FaqDraft = {
  topic: string;
  question: string;
  answer: string;
};

const emptyDraft: FaqDraft = {
  topic: '',
  question: '',
  answer: '',
};

export default function FaqForm({ initial }: { initial?: FaqDraft }) {
  const [form, setForm] = useState<FaqDraft>(initial ?? emptyDraft);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus('saving');
    window.setTimeout(() => setStatus('saved'), 450);
  }

  if (status === 'saved') {
    return (
      <AdminSuccess
        title="Question ready"
        description="This is a design preview — the FAQ item is not stored yet."
        backHref="/admin/faq"
        backLabel="Back to FAQ"
        onReset={() => {
          setForm(emptyDraft);
          setStatus('idle');
        }}
      />
    );
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow={initial ? 'Edit' : 'Create'}
        title={initial ? 'Edit question' : 'New question'}
        description="Add an answer travellers see on the public FAQ page."
      />

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <FormSection title="Question">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Topic</Label>
              <Select
                value={form.topic || undefined}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, topic: value ?? '' }))
                }
              >
                <SelectTrigger className={selectClass}>
                  <SelectValue placeholder="Choose a topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="faq-q">Question</Label>
              <Input
                id="faq-q"
                required
                value={form.question}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, question: event.target.value }))
                }
                placeholder="When is the best time to visit Gilgit-Baltistan?"
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="faq-a">Answer</Label>
              <Textarea
                id="faq-a"
                required
                rows={6}
                value={form.answer}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, answer: event.target.value }))
                }
                className={textareaClass}
              />
            </div>
          </div>
        </FormSection>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" variant="primary" size="lg" disabled={status === 'saving'}>
            {status === 'saving' ? 'Saving…' : 'Publish question'}
          </Button>
          <Button href="/admin/faq" variant="secondary" size="lg">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
