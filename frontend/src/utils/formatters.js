export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 2,
  }).format(amount || 0);
};
/**--------------------------------------------------------------- */

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
};
/**--------------------------------------------------------------- */

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num || 0);
};
/**--------------------------------------------------------------- */
