'use client';

import { ImagePlus } from 'lucide-react';
import { useRef, type ChangeEvent } from 'react';
import { fieldClass, isHttpUrl } from '@/components/admin/field-styles';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ImageUrlFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
};

export default function ImageUrlField({
  id,
  label,
  value,
  onChange,
  hint = 'Paste an Unsplash or Cloudinary URL. Upload is preview-only.',
}: ImageUrlFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') onChange(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="overflow-hidden rounded-md border border-accent/15 bg-background">
        <div className="relative aspect-16/10 bg-muted">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImagePlus size={22} aria-hidden />
              <span className="text-xs">No image yet</span>
            </div>
          )}
        </div>
        <div className="space-y-3 p-3">
          <Input
            id={id}
            value={isHttpUrl(value) ? value : value.startsWith('data:') ? '' : value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="https://images.unsplash.com/..."
            className={fieldClass}
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs leading-5 text-muted-foreground">{hint}</p>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="shrink-0 text-xs font-medium text-accent underline-offset-4 hover:underline"
            >
              Upload file
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFile}
          />
        </div>
      </div>
    </div>
  );
}
