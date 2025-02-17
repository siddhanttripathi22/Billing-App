// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BillProvider } from './context/BillContext';
import StartPage from './pages/StartPage';
import CreateBill from './pages/CreateBill';
import SelectClient from './pages/SelectClient';
import SelectItem from './pages/SelectItem';
import ItemDetails from './pages/ItemDetails';
import BillSummary from './pages/BillSummary';

function App() {
  return (
    <BillProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/create-bill" element={<CreateBill />} />
              <Route path="/select-client" element={<SelectClient />} />
              <Route path="/select-item" element={<SelectItem />} />
              <Route path="/item-details" element={<ItemDetails />} />
              <Route path="/bills" element={<BillSummary />} />
            </Routes>
          </div>
        </div>
      </Router>
    </BillProvider>
  );
}

export default App;