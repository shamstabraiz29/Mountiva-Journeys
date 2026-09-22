import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import ConfirmDelete from '@/components/admin/ConfirmDelete';

type RowActionsProps = {
  editHref: string;
  viewHref?: string;
  deleteTitle: string;
  deleteDescription: string;
};

export default function RowActions({
  editHref,
  viewHref,
  deleteTitle,
  deleteDescription,
}: RowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      {viewHref ? (
        <Link
          href={viewHref}
          className="rounded-md px-2 py-1.5 text-xs font-medium text-accent hover:bg-accent/8"
        >
          View
        </Link>
      ) : null}
      <Link
        href={editHref}
        aria-label="Edit"
        className="flex size-8 items-center justify-center rounded-md text-foreground/60 hover:bg-muted hover:text-foreground"
      >
        <Pencil size={14} />
      </Link>
      <ConfirmDelete
        title={deleteTitle}
        description={deleteDescription}
        trigger={
          <button
            type="button"
            aria-label="Delete"
            className="flex size-8 items-center justify-center rounded-md text-foreground/50 hover:bg-muted hover:text-[#8f3d3d]"
          >
            <Trash2 size={14} />
          </button>
        }
      />
    </div>
  );
}
