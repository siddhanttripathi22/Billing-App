
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  export const generateBillNumber = () => {
    const prefix = 'BILL';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };
  
  export const groupItemsByCategory = (items) => {
    return items.reduce((groups, item) => {
      const category = item.category || 'Uncategorized';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {});
  };
  
  
  export const validateItemDetails = (values) => {
    const errors = {};
  
    if (!values.description) {
      errors.description = 'Description is required';
    }
  
    if (!values.measurements.quantity || values.measurements.quantity <= 0) {
      errors.quantity = 'Valid quantity is required';
    }
  
    if (!values.measurements.rate || values.measurements.rate <= 0) {
      errors.rate = 'Valid rate is required';
    }
  
    return errors;
  };