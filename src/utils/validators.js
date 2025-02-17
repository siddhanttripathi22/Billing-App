
export const validateBillForm = (values) => {
    const errors = {};
  
    
    if (!values.client) {
      errors.client = 'Client is required';
    }
  
    
    if (!values.project) {
      errors.project = 'Project is required';
    }
  
    
    if (values.items?.length === 0) {
      errors.items = 'At least one item is required';
    }
  
   
    if (!values.description || values.description.trim().length === 0) {
      errors.description = 'Description is required';
    }
  
    
   
    const { quantity, rate } = values.measurements || {};

   
    if (values.quantity === ''|| values.quantity === undefined) {
      errors.quantity = 'Quantity is required';
    } else {
      const numericQuantity = parseFloat(quantity);
      if (isNaN(numericQuantity) || numericQuantity <= 0) {
        errors.quantity = 'Quantity must be a positive number';
      }
    }
  
   
    if (values.rate==='' || values.rate === undefined) {
      errors.rate = 'Rate is required';
    } else {
      const numericRate = parseFloat(rate);
      if (isNaN(numericRate) || numericRate <= 0) {
        errors.rate = 'Rate must be a positive number';
      }
    }
  
    return errors;
  };
  
  export const validateClientSelection = (values) => {
    const errors = {};
  
    if (!values.client) {
      errors.client = 'Please select a client';
    }
  
    if (!values.project) {
      errors.project = 'Please select a project';
    }
  
    return errors;
  };
  
  export const validateItemDetails = (values) => {
    const errors = {};
  
    if (!values.description) {
      errors.description = 'Description is required';
    }
  
    if (!values.quantity) {
      errors.quantity = 'Quantity is required';
    } else {
      const numericQuantity = parseFloat(values.quantity);
      if (isNaN(numericQuantity) || numericQuantity <= 0) {
        errors.quantity = 'Quantity must be a positive number';
      }
    }
    
    if (!values.rate) {
      errors.rate = 'Rate is required';
    } else {
      const numericRate = parseFloat(values.rate);
      if (isNaN(numericRate) || numericRate <= 0) {
        errors.rate = 'Rate must be a positive number';
      }
    }
    
    return errors;
  };