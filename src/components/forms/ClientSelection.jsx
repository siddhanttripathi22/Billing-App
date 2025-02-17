// src/components/BillForm/ClientSelection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBill } from '../../context/BillContext';
import Select from '../common/Select';
import Button from '../common/Button';
import Stepper from '../common/Stepper';

const clients = [
  { id: 1, name: 'Tech Corp', projects: ['Website Redesign', 'Mobile App'] },
  { id: 2, name: 'Design Studio', projects: ['Brand Identity', 'Marketing Materials'] }
];

function ClientSelection() {
  const navigate = useNavigate();
  const { state, dispatch } = useBill();
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleClientChange = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    setSelectedClient(client);
    dispatch({ type: 'SET_CLIENT', payload: client });
    setSelectedProject(null);
  };

  const handleProjectChange = (project) => {
    setSelectedProject(project);
    dispatch({ type: 'SET_PROJECT', payload: project });
  };

  const handleDateChange = (date) => {
    dispatch({ type: 'SET_DATE', payload: new Date(date) });
  };

  const handleNext = () => {
    if (selectedClient && selectedProject) {
      navigate('/select-item');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Stepper currentStep={1} totalSteps={4} />
      
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold mb-6">Create New Bill</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Client
            </label>
            <Select
              options={clients.map(client => ({
                value: client.id,
                label: client.name
              }))}
              value={selectedClient?.id}
              onChange={handleClientChange}
              placeholder="Choose a client"
            />
          </div>

          {selectedClient && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Project
              </label>
              <Select
                options={selectedClient.projects.map(project => ({
                  value: project,
                  label: project
                }))}
                value={selectedProject}
                onChange={handleProjectChange}
                placeholder="Choose a project"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bill Date
            </label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={state.date.toISOString().split('T')[0]}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button
              onClick={handleNext}
              disabled={!selectedClient || !selectedProject}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientSelection;