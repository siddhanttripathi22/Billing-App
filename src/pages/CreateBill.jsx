// src/pages/CreateBill.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBill } from '../context/BillContext';
import Button from '../components/common/Button';
import { generateBillNumber } from '../utils/helpers';

function CreateBill() {
  const navigate = useNavigate();
  const { dispatch } = useBill();
  const [billNumber] = useState(generateBillNumber());

  const handleStartBill = () => {
    dispatch({ type: 'RESET' }); // Reset any existing bill data
    navigate('/select-client');
  };

  return (
    <div className="max-w-2xl mx-auto pt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Create New Bill
          </h2>
          <p className="text-gray-600 mt-2">
            Start creating a new bill by selecting a client
          </p>
        </div>

        <div className="mb-8">
          <div className="bg-gray-50 rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-500">
              Bill Number
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {billNumber}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 rounded-md p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              What happens next?
            </h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>1. Select a client and their project</li>
              <li>2. Choose items to include in the bill</li>
              <li>3. Add item details and measurements</li>
              <li>4. Review and finalize the bill</li>
            </ul>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleStartBill}
              className="w-full sm:w-auto"
            >
              Start Creating Bill
            </Button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Quick Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600">✓</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Save as Draft
              </h4>
              <p className="text-sm text-gray-500">
                You can save your progress and continue later
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600">i</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Item Details
              </h4>
              <p className="text-sm text-gray-500">
                Add comprehensive details for better clarity
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBill;