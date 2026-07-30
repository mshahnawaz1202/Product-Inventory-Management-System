import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({
  title = 'Something Went Wrong',
  message = 'Failed to load data. Please try again.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-rose-500/5 rounded-2xl border border-rose-500/20 space-y-4">
      <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div className="max-w-md space-y-1">
        <h4 className="text-base font-bold text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
/**--------------------------------------------------------------- */
