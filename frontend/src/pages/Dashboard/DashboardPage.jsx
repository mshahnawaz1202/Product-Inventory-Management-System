import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Layers,
  Truck,
  DollarSign,
  Boxes,
  AlertTriangle,
  XCircle,
  ArrowLeftRight,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';
import { dashboardService } from '../../services/dashboardService';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';
import ErrorState from '../../components/common/ErrorState';
import { formatCurrency, formatNumber, formatDate } from '../../utils/formatters';

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentMovements, setRecentMovements] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, movementsRes, chartRes, lowStockRes, catRes] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getRecentMovements(),
        dashboardService.getMovementChart(),
        dashboardService.getLowStock(),
        dashboardService.getInventoryByCategory(),
      ]);

      setStats(statsRes.data);
      setRecentMovements(movementsRes.data);

      // Process chart data for 30-day movements
      const groupedChart = {};
      chartRes.data.forEach((item) => {
        const date = item._id.date;
        if (!groupedChart[date]) groupedChart[date] = { date, IN: 0, OUT: 0 };
        groupedChart[date][item._id.type] = item.total;
      });
      setChartData(Object.values(groupedChart));

      setLowStock(lowStockRes.data);
      setCategoryData(catRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard statistics.');
    } finally {
      setLoading(false);
    }
  };
  /**--------------------------------------------------------------- */

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <CardSkeleton count={8} />
      </div>
    );
  }

  if (error) {
    return <ErrorState title="Dashboard Loading Error" message={error} onRetry={fetchDashboardData} />;
  }

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: Package, color: 'text-blue-500 bg-blue-500/10' },
    { title: 'Categories', value: stats.totalCategories, icon: Layers, color: 'text-indigo-500 bg-indigo-500/10' },
    { title: 'Suppliers', value: stats.totalSuppliers, icon: Truck, color: 'text-purple-500 bg-purple-500/10' },
    { title: 'Inventory Value', value: formatCurrency(stats.totalInventoryValue), icon: DollarSign, color: 'text-emerald-500 bg-emerald-500/10' },
    { title: 'Total Stock Units', value: formatNumber(stats.totalStockUnits), icon: Boxes, color: 'text-cyan-500 bg-cyan-500/10' },
    { title: 'Low Stock (<10)', value: stats.lowStockProducts, icon: AlertTriangle, color: 'text-amber-500 bg-amber-500/10' },
    { title: 'Out of Stock', value: stats.outOfStockProducts, icon: XCircle, color: 'text-rose-500 bg-rose-500/10' },
    { title: "Today's Movements", value: stats.todayMovements, icon: ArrowLeftRight, color: 'text-sky-500 bg-sky-500/10' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Overview Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time inventory metrics and stock movement telemetry</p>
        </div>
        <Link
          to="/stock-movements"
          className="px-4 py-2.5 bg-primary hover:bg-primary-600 text-primary-foreground text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 w-fit"
        >
          <ArrowLeftRight className="w-4 h-4" />
          <span>Record Stock Movement</span>
        </Link>
      </div>

      {/* 8 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground">{card.title}</span>
                <div className="text-xl font-black text-foreground tracking-tight">{card.value}</div>
              </div>
              <div className={`p-3 rounded-2xl ${card.color} shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock Movements Bar Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-base font-bold text-foreground">Stock Movement History (Last 30 Days)</h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-emerald-500">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Stock IN
              </span>
              <span className="flex items-center gap-1.5 text-rose-500">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Stock OUT
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#888888" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#888888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="IN" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="OUT" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                No stock movement telemetry recorded in the last 30 days.
              </div>
            )}
          </div>
        </div>

        {/* Inventory Value Distribution Pie Chart */}
        <div className="p-6 rounded-2xl bg-card border border-border space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground">Inventory Value by Category</h3>
            <p className="text-xs text-muted-foreground">Distribution across categories</p>
          </div>

          <div className="h-52 w-full">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="totalValue"
                    nameKey="categoryName"
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    innerRadius={45}
                    paddingAngle={4}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                No category data available.
              </div>
            )}
          </div>

          {/* Category legend */}
          <div className="space-y-1.5 max-h-28 overflow-y-auto">
            {categoryData.slice(0, 4).map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                  />
                  <span className="truncate text-muted-foreground">{cat.categoryName || 'Uncategorized'}</span>
                </div>
                <span className="font-semibold text-foreground shrink-0">{formatCurrency(cat.totalValue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Low Stock Alert Table & Recent Movements List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-500">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-foreground">Low Stock Alert List</h3>
            </div>
            <Link to="/products?stock_status=low_stock" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            {lowStock.length > 0 ? (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground font-semibold">
                    <th className="py-2.5 px-3">Product</th>
                    <th className="py-2.5 px-3">SKU</th>
                    <th className="py-2.5 px-3 text-right">In Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {lowStock.slice(0, 5).map((prod) => (
                    <tr key={prod._id} className="hover:bg-muted/50 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-foreground">{prod.name}</td>
                      <td className="py-2.5 px-3 font-mono text-muted-foreground">{prod.sku}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="px-2 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          {prod.quantity_in_stock} units
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-xs text-muted-foreground">No low stock items. All inventory levels optimal!</div>
            )}
          </div>
        </div>

        {/* Recent Activities / Movements */}
        <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-primary" />
              <h3 className="text-base font-bold text-foreground">Recent Movements Activity</h3>
            </div>
            <Link to="/stock-movements" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View Log <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {recentMovements.length > 0 ? (
              recentMovements.map((mov) => (
                <div
                  key={mov._id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/50 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 rounded-lg font-bold text-[10px] uppercase ${
                        mov.type === 'IN'
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                      }`}
                    >
                      {mov.type}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{mov.product_id?.name || 'Product'}</span>
                      <span className="text-[10px] text-muted-foreground">{formatDate(mov.createdAt)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-foreground">
                      {mov.type === 'IN' ? '+' : '-'}{mov.quantity} units
                    </span>
                    <div className="text-[10px] text-muted-foreground">Bal: {mov.new_stock}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-muted-foreground">No stock movements recorded yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
/**--------------------------------------------------------------- */
