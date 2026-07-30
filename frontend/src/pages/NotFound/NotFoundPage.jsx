import { Link } from 'react-router-dom';
import { HelpCircle, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary border border-primary/20">
          <HelpCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-xs text-muted-foreground">The page you are looking for does not exist or has been moved.</p>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-600 text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
/**--------------------------------------------------------------- */
