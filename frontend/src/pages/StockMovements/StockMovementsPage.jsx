import { useState, useEffect, useCallback } from 'react';
import { ArrowLeftRight, Plus, Filter, User, Package, Calendar } from 'lucide-react';
import { stockMovementService } from '../../services/stockMovementService';
import { productService } from '../../services/productService';
import Pagination from '../../components/common/Pagination';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';
import StockMovementModal from './StockMovementModal';
import { formatDate, formatNumber } from '../../utils/formatters';

export default function StockMovementsPage() {
  const [movements, setMovements] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [productId, setProductId] = useState('');
  const [type, setType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await productService.getAll({ pageSize: 100 });
        setProducts(res.data);
      } catch {
        // Silently fail dropdown options
      }
    };
    loadProducts();
  }, []);

  const fetchMovements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await stockMovementService.getAll({
        page,
        pageSize,
        product_id: productId,
        type,
        from: fromDate,
        to: toDate,
      });
      setMovements(res.data);
      setPagination(res.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch movements log');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, productId, type, fromDate, toDate]);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Stock Movement Audit Log</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Comprehensive telemetry of all inventory increases and decreases</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary hover:bg-primary-600 text-primary-foreground text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Record Movement</span>
        </button>
      </div>

      {/* Toolbar / Filters */}
      <div className="p-4 rounded-2xl bg-card border border-border">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Product Select Filter */}
          <div className="relative flex-1 min-w-[180px]">
            <select
              value={productId}
              onChange={(e) => {
                setProductId(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-muted/60 border border-border rounded-xl text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none pr-8"
            >
              <option value="">All Products</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Movement Type Filter */}
          <div className="relative">
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 bg-muted/60 border border-border rounded-xl text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none pr-8"
            >
              <option value="">All Types (IN & OUT)</option>
              <option value="IN">Stock IN (+)</option>
              <option value="OUT">Stock OUT (-)</option>
            </select>
            <Filter className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Date From */}
          <div className="flex items-center gap-1.5 bg-muted/60 border border-border rounded-xl px-3 py-1.5">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">From:</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setPage(1);
              }}
              className="bg-transparent border-none text-foreground focus:outline-none text-xs"
            />
          </div>

          {/* Date To */}
          <div className="flex items-center gap-1.5 bg-muted/60 border border-border rounded-xl px-3 py-1.5">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">To:</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setPage(1);
              }}
              className="bg-transparent border-none text-foreground focus:outline-none text-xs"
            />
          </div>

          {/* Clear Filters Button */}
          {(productId || type || fromDate || toDate) && (
            <button
              onClick={() => {
                setProductId('');
                setType('');
                setFromDate('');
                setToDate('');
                setPage(1);
              }}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-muted border border-border hover:bg-accent"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <TableSkeleton rows={8} cols={7} />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchMovements} />
      ) : movements.length === 0 ? (
        <EmptyState title="No Stock Movements Logged" description="No movements match the selected filters." />
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-4">Date & Time</th>
                    <th className="py-3.5 px-4">Product Name</th>
                    <th className="py-3.5 px-4 text-center">Type</th>
                    <th className="py-3.5 px-4 text-right">Quantity</th>
                    <th className="py-3.5 px-4 text-right">Prev Stock</th>
                    <th className="py-3.5 px-4 text-right">New Balance</th>
                    <th className="py-3.5 px-4">Reason</th>
                    <th className="py-3.5 px-4">Performed By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {movements.map((mov) => (
                    <tr key={mov._id} className="hover:bg-muted/40 transition-colors">
                      <td className="py-3.5 px-4 text-xs font-medium text-muted-foreground whitespace-nowrap">
                        {formatDate(mov.createdAt)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-foreground">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-primary shrink-0" />
                          <span>{mov.product_id?.name || 'Deleted Product'}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                            mov.type === 'IN'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                          }`}
                        >
                          {mov.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold">
                        <span className={mov.type === 'IN' ? 'text-emerald-500' : 'text-rose-500'}>
                          {mov.type === 'IN' ? '+' : '-'}{formatNumber(mov.quantity)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-xs text-muted-foreground">
                        {formatNumber(mov.previous_stock)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-foreground">
                        {formatNumber(mov.new_stock)}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-muted-foreground max-w-xs truncate">
                        {mov.reason || 'N/A'}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 opacity-60" />
                          <span>{mov.user_id?.name || 'System / Auto'}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination
            pagination={pagination}
            onPageChange={setPage}
            onPageSizeChange={(sz) => {
              setPageSize(sz);
              setPage(1);
            }}
          />
        </div>
      )}

      {/* Record Stock Movement Modal */}
      <StockMovementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchMovements} />
    </div>
  );
}
/**--------------------------------------------------------------- */
