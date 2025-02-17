// src/pages/ItemDetails.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBill } from '../context/BillContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { validateItemDetails } from '../utils/validators';

function ItemDetails() {
  const navigate = useNavigate();
  const { state, dispatch } = useBill();
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    description: state.currentItem.description || '',
    briefs: state.currentItem.briefs || '',
    measurements: {
      quantity: state.currentItem.measurements.quantity || '',
      rate: state.currentItem.measurements.rate || state.currentItem.item.defaultRate || ''
    }
  });

  const calculateTotal = () => {
    const { quantity, rate } = formData.measurements;
    if (quantity && rate) {
      return (parseFloat(quantity) * parseFloat(rate)).toFixed(2);
    }
    return '0.00';
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleMeasurementChange = (field, value) => {
    
    const processedValue = value === '' ? '' : 
      !isNaN(parseFloat(value)) ? parseFloat(value) : value;
      
    setFormData(prev => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [field]: processedValue
      }
    }));
    
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const handleSubmit = () => {
   
    const validationData = {
      description: formData.description,
      quantity: formData.measurements.quantity,
      rate: formData.measurements.rate
    };

    const validationErrors = validateItemDetails(validationData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  

    const newItem = {
      ...state.currentItem,
      description: formData.description,
      briefs: formData.briefs,
      measurements: {
        quantity: parseFloat(formData.measurements.quantity),
        rate: parseFloat(formData.measurements.rate)
      },
      total: calculateTotal()
    };
  
    dispatch({ type: 'ADD_ITEM', payload: newItem });
    navigate('/bills');
  };

  return (
    <div className="max-w-4xl mx-auto pt-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Item Details</h2>
          <p className="mt-1 text-sm text-gray-600">
            Add details for {state.currentItem.item.name}
          </p>
        </div>

        {/* Selected Item Info */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {state.currentItem.item.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {state.currentItem.item.category}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Base Rate: ${state.currentItem.item.defaultRate}/{state.currentItem.item.unit}
            </div>
          </div>
        </div>

       
        <div className="space-y-6">
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className={`mt-1 block w-full rounded-md shadow-sm 
                ${errors.description ? 'border-red-500' : 'border-gray-300'}
                focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter detailed description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Briefs
            </label>
            <textarea
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add any brief notes"
              value={formData.briefs}
              onChange={(e) => handleChange('briefs', e.target.value)}
            />
          </div>

          {/* Measurements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Quantity"
                type="number"
                value={formData.measurements.quantity}
                onChange={(e) => handleMeasurementChange('quantity', e.target.value)}
                error={errors.quantity}
                placeholder={`Enter quantity (${state.currentItem.item.unit})`}
              />
            </div>
            <div>
              <Input
                label="Rate"
                type="number"
                value={formData.measurements.rate}
                onChange={(e) => handleMeasurementChange('rate', e.target.value)}
                error={errors.rate}
                placeholder="Enter rate per unit"
              />
            </div>
          </div>

          {/* Total Calculation */}
          {formData.measurements.quantity && formData.measurements.rate && (
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Total Amount:</span>
                <span className="text-lg font-bold text-blue-600">
                  ${calculateTotal()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Button
            variant="secondary"
            onClick={() => navigate('/select-item')}
          >
            Back
          </Button>
          <Button onClick={handleSubmit}>
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;