import { useState, useEffect } from 'react';
import { X, Truck, Mail, Phone, MapPin } from 'lucide-react';
import { supplierService } from '../../services/supplierService';
import { useToast } from '../../context/ToastContext';

export default function SupplierModal({ isOpen, onClose, supplier = null, onSuccess }) {
  const toast = useToast();
  const isEdit = !!supplier;

  const [formData, setFormData] = useState({
    name: '',
    contact_email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (supplier) {
        setFormData({
          name: supplier.name || '',
          contact_email: supplier.contact_email || '',
          phone: supplier.phone || '',
          address: supplier.address || '',
        });
      } else {
        setFormData({ name: '', contact_email: '', phone: '', address: '' });
      }
    }
  }, [isOpen, supplier]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await supplierService.update(supplier._id, formData);
        toast.success('Supplier updated successfully');
      } else {
        await supplierService.create(formData);
        toast.success('Supplier created successfully');
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
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
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{isEdit ? 'Edit Supplier' : 'Add Supplier'}</h3>
              <p className="text-xs text-muted-foreground">Vendor & distributor details</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Supplier Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. TechWorld Distributors"
              className="w-full px-3.5 py-2 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Contact Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  placeholder="sales@vendor.com"
                  className="w-full pl-9 pr-3.5 py-2 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1-555-0192"
                  className="w-full pl-9 pr-3.5 py-2 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Physical Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Vendor office location..."
                className="w-full pl-9 pr-3.5 py-2 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>

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
              disabled={loading}
              className="px-4 py-2 text-sm font-medium rounded-xl bg-primary hover:bg-primary-600 text-primary-foreground shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              <span>{isEdit ? 'Save Changes' : 'Create Supplier'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
/**--------------------------------------------------------------- */
