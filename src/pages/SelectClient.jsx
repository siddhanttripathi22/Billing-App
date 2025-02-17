import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBill } from '../context/BillContext';
import { Search, Users, Calendar } from 'lucide-react';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import { clients } from '../data/clients';

function SelectClient() {
  const navigate = useNavigate();
  const { state, dispatch } = useBill();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(state.client);
  const [selectedProject, setSelectedProject] = useState(state.project);

  // Memoized filtered clients
  const filteredClients = useMemo(() => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (!searchLower) return clients;
    
    return clients.filter(client =>
      client.name.toLowerCase().includes(searchLower) ||
      client.projects.some(project => 
        project.name.toLowerCase().includes(searchLower)
      )
    );
  }, [searchTerm]);

  // Reset form if needed on mount
  useEffect(() => {
    const shouldResetSelection = !state.client && selectedClient;
    if (shouldResetSelection) {
      setSelectedClient(null);
      setSelectedProject(null);
    }
  }, [state.client, selectedClient]);

  // Handlers
  const handleClientSelect = (client) => {
    try {
      setSelectedClient(client);
      setSelectedProject(null);
      dispatch({ type: 'SET_CLIENT', payload: client });
    } catch (err) {
      setError('Failed to select client. Please try again.');
    }
  };

  const handleProjectSelect = (projectId) => {
    try {
      const project = selectedClient?.projects.find(p => p.id === parseInt(projectId));
      if (!project) throw new Error('Project not found');
      
      setSelectedProject(project);
      dispatch({ type: 'SET_PROJECT', payload: project });
    } catch (err) {
      setError('Failed to select project. Please try again.');
    }
  };

  const handleDateChange = (e) => {
    try {
      const date = new Date(e.target.value);
      if (isNaN(date.getTime())) throw new Error('Invalid date');
      
      setSelectedDate(e.target.value);
      dispatch({ type: 'SET_DATE', payload: date });
    } catch (err) {
      setError('Invalid date selected. Please try again.');
    }
  };

  const handleNext = async () => {
    try {
      if (!selectedClient || !selectedProject || !selectedDate) {
        throw new Error('Please select all required fields');
      }

      setIsLoading(true);
      // You could add any async validation here
      navigate('/select-item');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-6 px-4">
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
          <button 
            className="text-sm text-red-700 underline mt-1"
            onClick={() => setError(null)}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search clients or projects..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Client List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all
              ${selectedClient?.id === client.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
              }
            `}
            onClick={() => handleClientSelect(client)}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-500" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900">{client.name}</h3>
                <p className="text-sm text-gray-500">{client.email}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {client.projects.length} projects
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project and Date Selection */}
      {selectedClient && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Select Project
            </h3>
            <Select
              options={selectedClient.projects.map(project => ({
                value: project.id,
                label: project.name
              }))}
              value={selectedProject?.id}
              onChange={handleProjectSelect}
              placeholder="Choose a project"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Select Date
            </h3>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <Button
          variant="secondary"
          onClick={() => navigate('/')}
          disabled={isLoading}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={isLoading || !selectedClient || !selectedProject || !selectedDate}
          loading={isLoading}
        >
          {isLoading ? 'Loading...' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

export default SelectClient;