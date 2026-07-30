import { useState, useEffect } from 'react';
import { X, ArrowLeftRight, Package, AlertCircle } from 'lucide-react';
import { stockMovementService } from '../../services/stockMovementService';
import { productService } from '../../services/productService';
import { useToast } from '../../context/ToastContext';

export default function StockMovementModal({ isOpen, onClose, onSuccess }) {
  const toast = useToast();

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product_id: '',
    type: 'IN',
    quantity: 1,
    reason: '',
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadProducts = async () => {
        try {
          const res = await productService.getAll({ pageSize: 100 });
          setProducts(res.data);
        } catch {
          toast.error('Failed to load products list');
        }
      };
      loadProducts();

      setFormData({ product_id: '', type: 'IN', quantity: 1, reason: '' });
      setSelectedProduct(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProductChange = (pId) => {
    setFormData({ ...formData, product_id: pId });
    const prod = products.find((p) => p._id === pId);
    setSelectedProduct(prod || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.type === 'OUT' && selectedProduct) {
      if (Number(formData.quantity) > selectedProduct.quantity_in_stock) {
        toast.error(`Cannot withdraw ${formData.quantity} units. Available stock is only ${selectedProduct.quantity_in_stock}.`);
        return;
      }
    }

    setLoading(true);
    try {
      await stockMovementService.create({
        ...formData,
        quantity: parseInt(formData.quantity, 10),
      });
      toast.success(`Stock ${formData.type} movement recorded successfully`);
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Movement failed');
    } finally {
      setLoading(false);
    }
  };
  /**--------------------------------------------------------------- */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-card text-card-foreground rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-border space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Record Stock Movement</h3>
              <p className="text-xs text-muted-foreground">Adjust inventory level with transaction audit trail</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Movement Type Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Movement Type *</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'IN' })}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border ${
                  formData.type === 'IN'
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                    : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted'
                }`}
              >
                Stock IN (Restock / Receiving)
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'OUT' })}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border ${
                  formData.type === 'OUT'
                    ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20'
                    : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted'
                }`}
              >
                Stock OUT (Sales / Issue)
              </button>
            </div>
          </div>

          {/* Product Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Select Product *</label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <select
                required
                value={formData.product_id}
                onChange={(e) => handleProductChange(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
              >
                <option value="">Choose item from catalog...</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} ({p.sku}) — Stock: {p.quantity_in_stock}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selected Product Stock Card */}
          {selectedProduct && (
            <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Current Available Stock:</span>
              <span className="font-bold text-foreground">{selectedProduct.quantity_in_stock} units</span>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Quantity *</label>
            <input
              type="number"
              min="1"
              required
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-3.5 py-2 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Reason */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Reason / Notes</label>
            <textarea
              rows={2}
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="e.g. Sales order #1092, Supplier shipment restock..."
              className="w-full px-3.5 py-2 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Insufficient Stock Warning */}
          {formData.type === 'OUT' &&
            selectedProduct &&
            Number(formData.quantity) > selectedProduct.quantity_in_stock && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Quantity exceeds current stock level! This transaction will be rejected.</span>
              </div>
            )}

          {/* Actions */}
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
              disabled={
                loading ||
                (formData.type === 'OUT' &&
                  selectedProduct &&
                  Number(formData.quantity) > selectedProduct.quantity_in_stock)
              }
              className="px-4 py-2 text-sm font-medium rounded-xl bg-primary hover:bg-primary-600 text-primary-foreground shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              <span>Submit Movement</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
/**--------------------------------------------------------------- */
