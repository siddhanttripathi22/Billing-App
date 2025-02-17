// src/pages/SelectItem.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBill } from '../context/BillContext';
import { Search, Tag } from 'lucide-react';
import Button from '../components/common/Button';
import { items } from '../data/items';
import { groupItemsByCategory } from '../utils/helpers';

function SelectItem() {
  const navigate = useNavigate();
  const { state, dispatch } = useBill();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedItem, setSelectedItem] = useState(null);

  // Get unique categories
  const categories = ['all', ...new Set(items.map(item => item.category))];

  useEffect(() => {
    let filtered = items;
    
   
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
   
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory]);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    dispatch({
      type: 'SET_CURRENT_ITEM',
      payload: {
        item,
        description: '',
        briefs: '',
        measurements: {
          quantity: '',
          rate: item.defaultRate
        }
      }
    });
  };

  const handleNext = () => {
    if (selectedItem) {
      navigate('/item-details');
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-6">
     
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Select Item</h2>
        <p className="mt-1 text-sm text-gray-600">
          Choose an item to add to the bill for {state.client?.name}
        </p>
      </div>

     
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search items..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-shrink-0">
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all
              ${selectedItem?.id === item.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
              }
            `}
            onClick={() => handleItemSelect(item)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {item.description}
                </p>
                <div className="flex items-center mt-2">
                  <Tag className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <span className="text-sm font-medium text-gray-900">
                  ${item.defaultRate}/{item.unit}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No items found matching your criteria</p>
        </div>
      )}

    
      <div className="mt-8 flex justify-between">
        <Button
          variant="secondary"
          onClick={() => navigate('/select-client')}
        >
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
  );
}

export default SelectItem;