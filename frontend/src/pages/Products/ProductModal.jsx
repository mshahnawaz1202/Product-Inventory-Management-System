import { useState, useEffect } from 'react';
import { X, Package, DollarSign, Boxes, Layers, Truck } from 'lucide-react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { supplierService } from '../../services/supplierService';
import { useToast } from '../../context/ToastContext';

export default function ProductModal({ isOpen, onClose, product = null, onSuccess }) {
  const toast = useToast();
  const isEdit = !!product;

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    unit_price: '',
    quantity_in_stock: 0,
    category_id: '',
    supplier_id: '',
  });

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Load dropdown options
      const loadOptions = async () => {
        try {
          const [catRes, supRes] = await Promise.all([
            categoryService.getAll({ pageSize: 100 }),
            supplierService.getAll({ pageSize: 100 }),
          ]);
          setCategories(catRes.data);
          setSuppliers(supRes.data);
        } catch {
          toast.error('Failed to load categories/suppliers for selection');
        }
      };
      loadOptions();

      if (product) {
        setFormData({
          name: product.name || '',
          sku: product.sku || '',
          description: product.description || '',
          unit_price: product.unit_price || '',
          quantity_in_stock: product.quantity_in_stock || 0,
          category_id: product.category_id?._id || product.category_id || '',
          supplier_id: product.supplier_id?._id || product.supplier_id || '',
        });
      } else {
        setFormData({
          name: '',
          sku: '',
          description: '',
          unit_price: '',
          quantity_in_stock: 0,
          category_id: '',
          supplier_id: '',
        });
      }
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      unit_price: parseFloat(formData.unit_price),
      quantity_in_stock: parseInt(formData.quantity_in_stock, 10),
    };

    try {
      if (isEdit) {
        await productService.update(product._id, payload);
        toast.success('Product updated successfully');
      } else {
        await productService.create(payload);
        toast.success('Product created successfully');
      }
      onSuccess();
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || 'Operation failed. Please check inputs.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  /**--------------------------------------------------------------- */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-card text-card-foreground rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-border space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{isEdit ? 'Edit Product' : 'Add New Product'}</h3>
              <p className="text-xs text-muted-foreground">Fill in the product specifications below</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-foreground">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dell XPS 15 Laptop"
                className="w-full px-3.5 py-2 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* SKU */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">SKU Code *</label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                placeholder="e.g. DELL-XPS-15"
                className="w-full px-3.5 py-2 bg-muted/50 border border-border rounded-xl text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Unit Price (PKR) *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.unit_price}
                  onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })}
                  placeholder="0.00"
                  className="w-full pl-9 pr-3.5 py-2 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Initial Stock Quantity (only for create) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Quantity in Stock *</label>
              <div className="relative">
                <Boxes className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.quantity_in_stock}
                  onChange={(e) => setFormData({ ...formData, quantity_in_stock: e.target.value })}
                  placeholder="0"
                  className="w-full pl-9 pr-3.5 py-2 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Category *</label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Supplier Select */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-foreground">Supplier *</label>
              <div className="relative">
                <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <select
                  required
                  value={formData.supplier_id}
                  onChange={(e) => setFormData({ ...formData, supplier_id: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((sup) => (
                    <option key={sup._id} value={sup._id}>
                      {sup.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-foreground">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product specifications and details..."
                className="w-full px-3.5 py-2 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-border hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium rounded-xl bg-primary hover:bg-primary-600 text-primary-foreground shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              <span>{isEdit ? 'Save Changes' : 'Create Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
/**--------------------------------------------------------------- */
