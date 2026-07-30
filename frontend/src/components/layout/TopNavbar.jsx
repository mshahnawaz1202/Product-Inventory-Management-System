import { useLocation, Link } from 'react-router-dom';
import { Sun, Moon, User, ChevronRight, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function TopNavbar({ onMobileToggle }) {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  // Generate breadcrumb links
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, idx) => {
    const path = `/${pathSegments.slice(0, idx + 1).join('/')}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
    return { label, path };
  });

  return (
    <header className="sticky top-0 z-20 h-16 bg-card/80 backdrop-blur-md border-b border-border px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left section: mobile hamburger & breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileToggle}
          className="lg:hidden p-2 rounded-xl bg-muted hover:bg-accent text-muted-foreground transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground">
          <Link to="/dashboard" className="hover:text-foreground transition-colors">
            Home
          </Link>
          {breadcrumbs.map((bc, i) => (
            <div key={bc.path} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              {i === breadcrumbs.length - 1 ? (
                <span className="text-foreground font-semibold">{bc.label}</span>
              ) : (
                <Link to={bc.path} className="hover:text-foreground transition-colors">
                  {bc.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right section: theme switcher & user profile */}
      <div className="flex items-center gap-3">
        {/* Dark mode toggle button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-muted hover:bg-accent text-foreground transition-colors relative"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
        </button>

        {/* User Card */}
        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
            {user?.name?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-foreground leading-tight">{user?.name}</span>
            <span className="text-[11px] text-muted-foreground capitalize leading-tight">{user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
/**--------------------------------------------------------------- */
