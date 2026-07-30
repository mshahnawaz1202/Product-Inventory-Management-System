import { useState, useEffect, useCallback } from 'react';
import { Truck, Plus, Edit, Trash2, Mail, Phone, MapPin, Package } from 'lucide-react';
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
import SupplierModal from './SupplierModal';

export default function SuppliersPage() {
  const { isAdmin } = useAuth();
  const toast = useToast();

  const [suppliers, setSuppliers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await supplierService.getAll({ page, pageSize, search: debouncedSearch });
      setSuppliers(res.data);
      setPagination(res.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch suppliers');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, debouncedSearch]);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await supplierService.delete(deleteTarget._id);
      toast.success(`Supplier '${deleteTarget.name}' deleted`);
      setDeleteTarget(null);
      fetchSuppliers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete supplier');
    } finally {
      setIsDeleting(false);
    }
  };
  /**--------------------------------------------------------------- */

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Suppliers Directory</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage vendors, contact emails, addresses, and phone numbers</p>
        </div>
        <button
          onClick={() => {
            setSelectedSupplier(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-primary hover:bg-primary-600 text-primary-foreground text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Supplier</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="p-4 rounded-2xl bg-card border border-border">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name or email..." />
      </div>

      {/* Table */}
      {loading ? (
        <TableSkeleton rows={5} cols={5} />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchSuppliers} />
      ) : suppliers.length === 0 ? (
        <EmptyState title="No Suppliers Found" description="Try adjusting search or add a new supplier record." />
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-4">Supplier Name</th>
                    <th className="py-3.5 px-4">Contact Email</th>
                    <th className="py-3.5 px-4">Phone</th>
                    <th className="py-3.5 px-4">Address</th>
                    <th className="py-3.5 px-4 text-center">Products Supplied</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {suppliers.map((sup) => (
                    <tr key={sup._id} className="hover:bg-muted/40 transition-colors group">
                      <td className="py-3.5 px-4 font-bold text-foreground group-hover:text-primary transition-colors">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-purple-500 shrink-0" />
                          <span>{sup.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 opacity-60" />
                          <span>{sup.contact_email}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 opacity-60" />
                          <span>{sup.phone || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-muted-foreground max-w-xs truncate">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 opacity-60 shrink-0" />
                          <span className="truncate">{sup.address || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                          <Package className="w-3 h-3" />
                          <span>{sup.productCount || 0}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setSelectedSupplier(sup);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                            title="Edit Supplier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {isAdmin && (
                            <button
                              onClick={() => setDeleteTarget(sup)}
                              className="p-1.5 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors"
                              title="Delete Supplier (Admin Only)"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
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

      {/* Supplier Modal */}
      <SupplierModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        supplier={selectedSupplier}
        onSuccess={fetchSuppliers}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Supplier"
        message={`Are you sure you want to delete '${deleteTarget?.name}'? Note: Suppliers with assigned products cannot be deleted.`}
        isLoading={isDeleting}
      />
    </div>
  );
}
/**--------------------------------------------------------------- */
