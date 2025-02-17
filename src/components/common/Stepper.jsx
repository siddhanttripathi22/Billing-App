import React from 'react';

function Stepper({ currentStep, totalSteps }) {
  const steps = [
    { label: 'Client & Project', number: 1 },
    { label: 'Select Item', number: 2 },
    { label: 'Item Details', number: 3 },
    { label: 'Summary', number: 4 }
  ];

  return (
    <div className="w-full py-4">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          
          return (
            <div key={step.number} className="flex flex-col items-center w-full">
              {/* Line */}
              {index !== 0 && (
                <div className="w-full h-1 flex-1">
                  <div
                    className={`h-full ${
                      isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                </div>
              )}
              
              {/* Step Circle */}
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : isCompleted
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
              </div>
              
              {/* Step Label */}
              <div className="text-xs mt-2 text-center">
                <span
                  className={
                    isActive || isCompleted
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-500'
                  }
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stepper;