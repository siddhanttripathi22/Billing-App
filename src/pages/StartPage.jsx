import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Settings } from 'lucide-react';

function StartPage() {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Create New Bill',
      description: 'Start creating a new bill for your client',
      icon: <Plus className="w-6 h-6" />,
      onClick: () => navigate('/create-bill'),
      primary: true
    },
    {
      title: 'View Bills',
      description: 'Check your existing bills and their status',
      icon: <FileText className="w-6 h-6" />,
      onClick: () => navigate('/bills'),
    },
    {
      title: 'Settings',
      description: 'Manage your preferences and configurations',
      icon: <Settings className="w-6 h-6" />,
      onClick: () => navigate('/settings'),
    }
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="h-full max-w-4xl mx-auto p-4 sm:p-6 flex flex-col">
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Welcome to Billing System
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Create and manage your bills efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {actions.map((action, index) => (
            <div
              key={index}
              onClick={action.onClick}
              className={`
                p-4 sm:p-6 rounded-xl transition-all duration-200 cursor-pointer
                transform hover:-translate-y-1 hover:shadow-lg
                ${action.primary 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white' 
                  : 'bg-white hover:bg-gray-50 shadow-md'
                }
              `}
            >
              <div className="flex items-center justify-center mb-4">
                <div className={`
                  p-3 rounded-full 
                  ${action.primary 
                    ? 'bg-blue-500/30' 
                    : 'bg-blue-100'
                  }
                `}>
                  {action.icon}
                </div>
              </div>
              <h3 className={`text-lg font-semibold text-center mb-2 
                ${!action.primary && 'text-gray-900'}`}
              >
                {action.title}
              </h3>
              <p className={`text-sm text-center 
                ${action.primary ? 'text-blue-100' : 'text-gray-600'}`}
              >
                {action.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-base font-medium text-gray-900 mb-1">
              Total Bills
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">24</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">This month</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-base font-medium text-gray-900 mb-1">
              Pending Bills
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-yellow-600">5</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Awaiting action</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-base font-medium text-gray-900 mb-1">
              Total Amount
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">$12,450</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">This month</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartPage;