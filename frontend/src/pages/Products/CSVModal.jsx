import { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { productService } from '../../services/productService';
import { useToast } from '../../context/ToastContext';

export default function CSVModal({ isOpen, onClose, onSuccess }) {
  const toast = useToast();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type !== 'text/csv' && !selected.name.endsWith('.csv')) {
      toast.error('Please select a valid CSV file');
      return;
    }
    setFile(selected);
    setSummary(null);
  };
  /**--------------------------------------------------------------- */

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please choose a file first');
      return;
    }

    setLoading(true);
    try {
      const res = await productService.importCSV(file);
      setSummary(res.data);
      toast.success(`Import complete! ${res.data.imported} rows imported.`);
      onSuccess();
    } catch (err) {
      const msg = err.response?.data?.message || 'CSV upload failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  /**--------------------------------------------------------------- */

  const resetModal = () => {
    setFile(null);
    setSummary(null);
    onClose();
  };
  /**--------------------------------------------------------------- */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-card text-card-foreground rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-border space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Import Products from CSV</h3>
              <p className="text-xs text-muted-foreground">Bulk create or update catalog records</p>
            </div>
          </div>
          <button onClick={resetModal} className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Upload Drop Zone */}
        {!summary ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border hover:border-primary/50 rounded-2xl p-8 text-center bg-muted/20 transition-all flex flex-col items-center justify-center gap-3">
              <FileText className="w-10 h-10 text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {file ? file.name : 'Click or drag CSV file to upload'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Headers required: name, sku, unit_price, quantity_in_stock, category, supplier
                </p>
              </div>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="csv-file-input"
              />
              <label
                htmlFor="csv-file-input"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-muted hover:bg-accent text-foreground border border-border cursor-pointer transition-colors"
              >
                {file ? 'Change File' : 'Select CSV File'}
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={resetModal}
                className="px-4 py-2 text-sm font-medium rounded-xl border border-border hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={!file || loading}
                className="px-4 py-2 text-sm font-medium rounded-xl bg-primary hover:bg-primary-600 text-primary-foreground shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                <span>Start Import</span>
              </button>
            </div>
          </div>
        ) : (
          /* Import Summary View */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-3">
              <h4 className="text-sm font-bold text-foreground">Import Summary Result</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <div>
                    <span className="font-bold block text-sm">{summary.imported}</span>
                    <span>Imported</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <div>
                    <span className="font-bold block text-sm">{summary.skipped}</span>
                    <span>Skipped</span>
                  </div>
                </div>
              </div>

              {/* Error messages log */}
              {summary.errors && summary.errors.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-semibold text-rose-500">Skipped Row Details:</span>
                  <div className="max-h-36 overflow-y-auto p-2 rounded-lg bg-rose-500/5 border border-rose-500/20 text-[11px] text-rose-600 dark:text-rose-400 font-mono space-y-1">
                    {summary.errors.map((err, i) => (
                      <div key={i}>{err}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={resetModal}
                className="px-4 py-2 text-sm font-medium rounded-xl bg-primary text-primary-foreground shadow-md"
              >
                Close Summary
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
/**--------------------------------------------------------------- */
