// src/components/BillForm/ItemSelection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBill } from '../../context/BillContext';
import Select from '../common/Select';
import Button from '../common/Button';
import Stepper from '../common/Stepper';

const items = [
  { id: 1, name: 'Web Development', category: 'Development' },
  { id: 2, name: 'UI/UX Design', category: 'Design' },
  { id: 3, name: 'Content Writing', category: 'Content' },
  { id: 4, name: 'SEO Services', category: 'Marketing' }
];

function ItemSelection() {
  const navigate = useNavigate();
  const { dispatch } = useBill();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemChange = (itemId) => {
    const item = items.find(i => i.id === itemId);
    setSelectedItem(item);
    dispatch({ 
      type: 'SET_CURRENT_ITEM', 
      payload: { 
        item,
        description: '',
        briefs: '',
        measurements: {}
      }
    });
  };

  const handleNext = () => {
    if (selectedItem) {
      navigate('/item-details');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Stepper currentStep={2} totalSteps={4} />
      
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold mb-6">Select Item</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Item
            </label>
            <Select
              options={items.map(item => ({
                value: item.id,
                label: item.name,
                description: item.category
              }))}
              value={selectedItem?.id}
              onChange={handleItemChange}
              placeholder="Choose an item"
            />
          </div>

          {selectedItem && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium text-gray-700">Selected Item:</h3>
              <p className="text-sm text-gray-600 mt-1">
                {selectedItem.name} - {selectedItem.category}
              </p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button onClick={handleBack} variant="secondary">
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedItem}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemSelection;