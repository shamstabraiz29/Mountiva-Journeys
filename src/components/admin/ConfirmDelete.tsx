'use client';

import { useState, type ReactNode } from 'react';
import Button from '@/components/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type ConfirmDeleteProps = {
  title: string;
  description: string;
  trigger: ReactNode;
};

export default function ConfirmDelete({
  title,
  description,
  trigger,
}: ConfirmDeleteProps) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setNote(false);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {note ? (
          <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
            Design preview only — nothing was deleted.
          </p>
        ) : null}
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="bg-[#8f3d3d] hover:bg-[#7a3232]"
            onClick={() => setNote(true)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
