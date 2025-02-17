import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBill } from '../context/BillContext';
import Button from '../components/common/Button';
import { formatCurrency } from '../utils/helpers';
import { FileText, Plus, Download, Printer,ChevronLeft, ChevronRight } from 'lucide-react';

function BillSummary() {
  const navigate = useNavigate();
  const { state, dispatch } = useBill();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = state.items.reduce((sum, item) => 
    sum + parseFloat(item.total), 0
  );
  const totalPages = Math.ceil(state.savedBills.length / state.itemsPerPage);
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;

  const currentBills = state.savedBills.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    dispatch({ type: 'SET_PAGE', payload: newPage });
  };
  const handleAddMore = () => {
    dispatch({ type: 'RESET_CURRENT_ITEM' });
    navigate('/select-item');
  };

   const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: 'SAVE_BILL' });
      alert('Bill submitted successfully!');
      navigate('/');
    } catch (error) {
      alert('Error submitting bill. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const hasClientData = state.client && Object.keys(state.client).length > 0;
  const hasProjectData = state.project && Object.keys(state.project).length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Bill Summary</h2>
              <p className="mt-1 text-sm text-gray-600">
                Review and finalize your bill
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="secondary"
                onClick={handlePrint}
                className="flex items-center justify-center flex-1 sm:flex-none"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button
                variant="secondary"
                className="flex items-center justify-center flex-1 sm:flex-none"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          {state.savedBills.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Saved Bills</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange(state.currentPage - 1)}
                    disabled={state.currentPage === 1}
                    className="p-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {state.currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange(state.currentPage + 1)}
                    disabled={state.currentPage === totalPages}
                    className="p-2"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {currentBills.map((bill) => (
                  <div key={bill.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {bill.client.name}'s Bill
                        </h4>
                        <p className="text-sm text-gray-600">
                          {new Date(bill.date).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-blue-600">
                        {formatCurrency(bill.totalAmount)}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Project: {bill.project.name}</p>
                      <p>Items: {bill.items.length}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* Client and Project Info */}
          {(hasClientData || hasProjectData) && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {hasClientData && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Client</h3>
                    <p className="mt-1 text-lg font-medium">{state.client.name}</p>
                    <p className="text-sm text-gray-600">{state.client.email}</p>
                  </div>
                )}
                {hasProjectData && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Project</h3>
                    <p className="mt-1 text-lg font-medium">{state.project.name}</p>
                    <p className="text-sm text-gray-600">
                      Date: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Items</h3>
            <div className="space-y-4">
              {state.items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.item.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(item.total)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.measurements.quantity} x {formatCurrency(item.measurements.rate)}
                      </p>
                    </div>
                  </div>
                  {item.briefs && (
                    <div className="mt-4 text-sm text-gray-600">
                      <p className="font-medium">Briefs:</p>
                      <p>{item.briefs}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax (0%)</span>
                <span>{formatCurrency(0)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-blue-600">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="secondary"
                onClick={handleAddMore}
                className="flex items-center justify-center flex-1 sm:flex-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add More Items
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/select-item')}
                className="flex-1 sm:flex-none"
              >
                Back
              </Button>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || state.items.length === 0}
              className="flex items-center justify-center w-full sm:w-auto"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Save & Submit
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillSummary;