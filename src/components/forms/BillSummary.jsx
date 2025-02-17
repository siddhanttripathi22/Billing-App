// src/components/BillForm/BillSummary.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBill } from '../../context/BillContext';
import Button from '../common/Button';
import Stepper from '../common/Stepper';

function BillSummary() {
  const navigate = useNavigate();
  const { state, dispatch } = useBill();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = state.items.reduce((sum, item) => 
    sum + (Number(item.measurements.quantity) * Number(item.measurements.rate)), 0
  );

  const handleAddMore = () => {
    dispatch({ type: 'RESET_CURRENT_ITEM' });
    navigate('/select-item');
  };

  const handleFinalize = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call if needed
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // First, add the current bill to the bills array
      dispatch({ type: 'ADD_BILL' });
      
      // Then reset the current form
      dispatch({ type: 'RESET' });
      
      alert('Bill finalized successfully!');
      navigate('/');
    } catch (error) {
      alert('Error finalizing bill. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Stepper currentStep={4} totalSteps={4} />
      
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold mb-6">Bill Summary</h2>
        
        {/* Client and Project Info */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Client</h3>
              <p className="mt-1 text-lg font-medium">{state.client?.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Project</h3>
              <p className="mt-1 text-lg font-medium">{state.project}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date</h3>
              <p className="mt-1">{state.date.toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Items</h3>
          {state.items.map((item, index) => (
            <div key={index} className="border rounded-md p-4 mb-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{item.item.name}</h4>
                <span className="text-lg font-bold">
                  ${(item.measurements.quantity * item.measurements.rate).toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <div className="text-sm text-gray-500">
                <p>Quantity: {item.measurements.quantity}</p>
                <p>Rate: ${item.measurements.rate}</p>
              </div>
              {item.briefs && (
                <div className="mt-2 text-sm">
                  <p className="font-medium">Briefs:</p>
                  <p className="text-gray-600">{item.briefs}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Total Amount */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Total Amount</h3>
            <span className="text-2xl font-bold text-blue-600">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-6">
          <Button 
            onClick={handleAddMore} 
            variant="secondary"
            disabled={isSubmitting}
          >
            Add More Items
          </Button>
          <Button 
            onClick={handleFinalize}
            disabled={isSubmitting || state.items.length === 0}
          >
            {isSubmitting ? 'Finalizing...' : 'Finalize Bill'}
          </Button>
        </div>
      </div>
    </div>
  );
} 

export default BillSummary;