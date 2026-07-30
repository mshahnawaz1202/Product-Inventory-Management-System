import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Box, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData);
      toast.success('Welcome back! Successfully logged in.');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check credentials.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  /**--------------------------------------------------------------- */

  const fillQuickLogin = (email, password) => {
    setFormData({ email, password });
  };
  /**--------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl space-y-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/30 mb-2">
            <Box className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">StockFlow Portal</h1>
          <p className="text-xs text-slate-400">Sign in to manage product inventory & stock movements</p>
        </div>

        {/* Quick Demo Credentials Banner */}
        <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Demo Credentials (Click to Autofill)</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => fillQuickLogin('admin@inventory.com', 'admin123')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-left transition-colors border border-slate-700"
            >
              <div className="font-bold text-white">Admin</div>
              <div className="text-[10px] text-slate-400">Full Access</div>
            </button>
            <button
              type="button"
              onClick={() => fillQuickLogin('staff@inventory.com', 'staff123')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-left transition-colors border border-slate-700"
            >
              <div className="font-bold text-white">Staff</div>
              <div className="text-[10px] text-slate-400">Restricted Access</div>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@inventory.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
/**--------------------------------------------------------------- */
