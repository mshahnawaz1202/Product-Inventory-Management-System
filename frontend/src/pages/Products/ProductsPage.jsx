import { useState, useEffect, useCallback } from 'react';
import {
  Package,
  Plus,
  Download,
  Upload,
  Filter,
  Edit,
  Trash2,
  ArrowUpDown,
  Layers,
  Truck,
} from 'lucide-react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { supplierService } from '../../services/supplierService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useDebounce } from '../../hooks/useDebounce';
import SearchInput from '../../components/common/SearchInput';
import Pagination from '../../components/common/Pagination';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import ProductModal from './ProductModal';
import CSVModal from './CSVModal';
import { STOCK_STATUS } from '../../constants';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export default function ProductsPage() {
  const { isAdmin } = useAuth();
  const toast = useToast();

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [categoryId, setCategoryId] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [stockStatus, setStockStatus] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Categories & Suppliers lists for filters
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch filter options
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [catRes, supRes] = await Promise.all([
          categoryService.getAll({ pageSize: 100 }),
          supplierService.getAll({ pageSize: 100 }),
        ]);
        setCategories(catRes.data);
        setSuppliers(supRes.data);
      } catch {
        // Silently fail dropdown options
      }
    };
    loadFilterOptions();
  }, []);

  // Fetch products data
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.getAll({
        page,
        pageSize,
        search: debouncedSearch,
        category_id: categoryId,
        supplier_id: supplierId,
        stock_status: stockStatus,
        sort: sortField,
        order: sortOrder,
      });
      setProducts(res.data);
      setPagination(res.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, debouncedSearch, categoryId, supplierId, stockStatus, sortField, sortOrder]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };
  /**--------------------------------------------------------------- */

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await productService.delete(deleteTarget._id);
      toast.success(`Product '${deleteTarget.name}' deleted`);
      setDeleteTarget(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };
  /**--------------------------------------------------------------- */

  const handleExportCSV = async () => {
    try {
      const blobData = await productService.exportCSV({
        search: debouncedSearch,
        category_id: categoryId,
        supplier_id: supplierId,
        stock_status: stockStatus,
      });
      const blob = new Blob([blobData], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `products_export_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('CSV exported successfully');
    } catch {
      toast.error('Failed to export CSV');
    }
  };
  /**--------------------------------------------------------------- */

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Products Catalog</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage stock items, prices, SKUs, and inventory levels</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-muted hover:bg-accent text-foreground text-xs font-semibold rounded-xl border border-border transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsCSVModalOpen(true)}
            className="px-3.5 py-2 bg-muted hover:bg-accent text-foreground text-xs font-semibold rounded-xl border border-border transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4 text-blue-500" />
            <span>Import CSV</span>
          </button>

          <button
            onClick={() => {
              setSelectedProduct(null);
              setIsProductModalOpen(true);
            }}
            className="px-4 py-2 bg-primary hover:bg-primary-600 text-primary-foreground text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by Product Name or SKU..." />

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Category Filter */}
            <div className="relative">
              <select
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 bg-muted/60 border border-border rounded-xl text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none pr-8"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <Filter className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Supplier Filter */}
            <div className="relative">
              <select
                value={supplierId}
                onChange={(e) => {
                  setSupplierId(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 bg-muted/60 border border-border rounded-xl text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none pr-8"
              >
                <option value="">All Suppliers</option>
                {suppliers.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <Filter className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Stock Status Filter */}
            <div className="relative">
              <select
                value={stockStatus}
                onChange={(e) => {
                  setStockStatus(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 bg-muted/60 border border-border rounded-xl text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none pr-8"
              >
                <option value="">All Stock Status</option>
                <option value="in_stock">In Stock (&gt;=10)</option>
                <option value="low_stock">Low Stock (&lt;10)</option>
                <option value="out_of_stock">Out of Stock (0)</option>
              </select>
              <Filter className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Table or Loading / Error / Empty States */}
      {loading ? (
        <TableSkeleton rows={8} cols={7} />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchProducts} />
      ) : products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try modifying search keywords or filter dropdown options."
          action={
            <button
              onClick={() => {
                setSearch('');
                setCategoryId('');
                setSupplierId('');
                setStockStatus('');
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-muted border border-border hover:bg-accent"
            >
              Reset Filters
            </button>
          }
        />
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider select-none">
                    <th onClick={() => handleSort('name')} className="py-3.5 px-4 cursor-pointer hover:text-foreground">
                      <div className="flex items-center gap-1.5">
                        <span>Product Name</span>
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </div>
                    </th>
                    <th onClick={() => handleSort('sku')} className="py-3.5 px-4 cursor-pointer hover:text-foreground">
                      <div className="flex items-center gap-1.5">
                        <span>SKU</span>
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </div>
                    </th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Supplier</th>
                    <th onClick={() => handleSort('unit_price')} className="py-3.5 px-4 text-right cursor-pointer hover:text-foreground">
                      <div className="flex items-center justify-end gap-1.5">
                        <span>Price</span>
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </div>
                    </th>
                    <th onClick={() => handleSort('quantity_in_stock')} className="py-3.5 px-4 text-center cursor-pointer hover:text-foreground">
                      <div className="flex items-center justify-center gap-1.5">
                        <span>Stock</span>
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </div>
                    </th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.map((prod) => {
                    const statusKey =
                      prod.quantity_in_stock === 0
                        ? 'OUT_OF_STOCK'
                        : prod.quantity_in_stock < 10
                        ? 'LOW_STOCK'
                        : 'IN_STOCK';
                    const statusMeta = STOCK_STATUS[statusKey];

                    return (
                      <tr key={prod._id} className="hover:bg-muted/40 transition-colors group">
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                              {prod.name}
                            </span>
                            {prod.description && (
                              <span className="text-xs text-muted-foreground truncate max-w-xs">{prod.description}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs font-semibold text-muted-foreground">{prod.sku}</td>
                        <td className="py-3.5 px-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 opacity-60" />
                            <span>{prod.category_id?.name || 'Unassigned'}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5 opacity-60" />
                            <span>{prod.supplier_id?.name || 'Unassigned'}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-foreground">
                          {formatCurrency(prod.unit_price)}
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-foreground">
                          {formatNumber(prod.quantity_in_stock)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusMeta.color}`}
                          >
                            {statusMeta.label}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setSelectedProduct(prod);
                                setIsProductModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                              title="Edit Product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            {isAdmin && (
                              <button
                                onClick={() => setDeleteTarget(prod)}
                                className="p-1.5 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors"
                                title="Delete Product (Admin Only)"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            pagination={pagination}
            onPageChange={setPage}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setPage(1);
            }}
          />
        </div>
      )}

      {/* Product Create/Edit Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
        onSuccess={fetchProducts}
      />

      {/* CSV Import Modal */}
      <CSVModal isOpen={isCSVModalOpen} onClose={() => setIsCSVModalOpen(false)} onSuccess={fetchProducts} />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to delete '${deleteTarget?.name}'? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
}
/**--------------------------------------------------------------- */
