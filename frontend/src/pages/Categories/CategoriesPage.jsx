import { useState, useEffect, useCallback } from 'react';
import { Layers, Plus, Edit, Trash2, Package } from 'lucide-react';
import { categoryService } from '../../services/categoryService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useDebounce } from '../../hooks/useDebounce';
import SearchInput from '../../components/common/SearchInput';
import Pagination from '../../components/common/Pagination';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import CategoryModal from './CategoryModal';
import { formatDate } from '../../utils/formatters';

export default function CategoriesPage() {
  const { isAdmin } = useAuth();
  const toast = useToast();

  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await categoryService.getAll({ page, pageSize, search: debouncedSearch });
      setCategories(res.data);
      setPagination(res.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, debouncedSearch]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await categoryService.delete(deleteTarget._id);
      toast.success(`Category '${deleteTarget.name}' deleted`);
      setDeleteTarget(null);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete category');
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
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Categories Management</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Group catalog items into logical taxonomy buckets</p>
        </div>
        <button
          onClick={() => {
            setSelectedCategory(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-primary hover:bg-primary-600 text-primary-foreground text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="p-4 rounded-2xl bg-card border border-border">
        <SearchInput value={search} onChange={setSearch} placeholder="Search categories..." />
      </div>

      {/* Content */}
      {loading ? (
        <TableSkeleton rows={5} cols={4} />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchCategories} />
      ) : categories.length === 0 ? (
        <EmptyState title="No Categories Found" description="Try adjusting your search criteria or add a new category." />
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-4">Category Name</th>
                    <th className="py-3.5 px-4">Description</th>
                    <th className="py-3.5 px-4 text-center">Assigned Products</th>
                    <th className="py-3.5 px-4">Created Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {categories.map((cat) => (
                    <tr key={cat._id} className="hover:bg-muted/40 transition-colors group">
                      <td className="py-3.5 px-4 font-bold text-foreground group-hover:text-primary transition-colors">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-indigo-500 shrink-0" />
                          <span>{cat.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-muted-foreground max-w-sm truncate">
                        {cat.description || 'No description provided'}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                          <Package className="w-3 h-3" />
                          <span>{cat.productCount || 0}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-muted-foreground">{formatDate(cat.createdAt)}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setSelectedCategory(cat);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                            title="Edit Category"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {isAdmin && (
                            <button
                              onClick={() => setDeleteTarget(cat)}
                              className="p-1.5 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors"
                              title="Delete Category (Admin Only)"
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

      {/* Category Create/Edit Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={selectedCategory}
        onSuccess={fetchCategories}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={`Are you sure you want to delete '${deleteTarget?.name}'? Note: Categories containing assigned products cannot be deleted.`}
        isLoading={isDeleting}
      />
    </div>
  );
}
/**--------------------------------------------------------------- */
