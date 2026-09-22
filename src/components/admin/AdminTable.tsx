import type { ReactNode } from 'react';

type AdminTableProps = {
  columns: string[];
  children: ReactNode;
  empty?: boolean;
  emptyLabel?: string;
};

export default function AdminTable({
  columns,
  children,
  empty,
  emptyLabel = 'Nothing matches that search.',
}: AdminTableProps) {
  return (
    <div className="overflow-hidden rounded-md border border-accent/12 bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead className="border-b border-accent/10 bg-muted/40 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-3 font-medium">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {empty ? (
        <p className="border-t border-accent/10 px-4 py-10 text-center text-sm text-muted-foreground">
          {emptyLabel}
        </p>
      ) : null}
    </div>
  );
}
