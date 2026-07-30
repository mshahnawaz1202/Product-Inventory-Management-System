import { Inbox } from 'lucide-react';

export default function EmptyState({
  title = 'No Data Found',
  description = 'There are no items to display at this time.',
  action,
  icon: Icon = Inbox,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-card rounded-2xl border border-dashed border-border space-y-4">
      <div className="p-4 rounded-2xl bg-muted text-muted-foreground">
        <Icon className="w-10 h-10 opacity-70" />
      </div>
      <div className="max-w-xs space-y-1">
        <h4 className="text-base font-bold text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
/**--------------------------------------------------------------- */
