import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Truck,
  ArrowLeftRight,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Box,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Products', path: '/products', icon: Package },
    { label: 'Categories', path: '/categories', icon: Layers },
    { label: 'Suppliers', path: '/suppliers', icon: Truck },
    { label: 'Stock Movements', path: '/stock-movements', icon: ArrowLeftRight },
  ];

  return (
    <aside
      className={cn(
        'relative flex flex-col h-screen bg-slate-900 border-r border-slate-800 text-slate-300 transition-all duration-300 z-30 shrink-0 select-none',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shrink-0 shadow-lg shadow-blue-500/30">
            <Box className="w-5 h-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-white text-base tracking-tight leading-tight">StockFlow</span>
              <span className="text-[11px] text-slate-400 font-medium">Inventory System</span>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                )
              }
            >
              <Icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-105" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User section & Logout */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        {!collapsed && (
          <div className="px-3 py-2 rounded-lg bg-slate-800/50 flex items-center justify-between">
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-semibold text-white truncate">{user?.name}</span>
              <span className="text-[10px] text-slate-400 capitalize truncate">{user?.role}</span>
            </div>
            <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {user?.role}
            </span>
          </div>
        )}

        <button
          onClick={logout}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors',
            collapsed && 'justify-center'
          )}
          title="Logout"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
/**--------------------------------------------------------------- */
