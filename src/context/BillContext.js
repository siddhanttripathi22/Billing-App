import React, { createContext, useContext, useReducer, useEffect } from 'react';

const BillContext = createContext();

const initialState = {
  client: null,
  project: {},
  date: new Date(),
  items: [],
  bills: [], 
  savedBills: [],
  currentPage: 1,
  itemsPerPage: 5,
  currentItem: {
    item: null,
    description: '',
    briefs: '',
    measurements: {
      quantity: '',
      rate: ''
    }
  }
};

function billReducer(state, action) {
  switch (action.type) {
    case 'SET_CLIENT':
      return { ...state, client: action.payload };
      
    case 'SAVE_BILL':
      const savedBill = {
        id: Date.now(),
        date: new Date().toISOString(),
        client: state.client,
        project: state.project,
        items: state.items,
        totalAmount: state.items.reduce((sum, item) => sum + parseFloat(item.total), 0)
      };
      return {
        ...state,
        savedBills: [...state.savedBills, savedBill],
        client: {},
        project: {},
        items: []
      };

    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload
      };
          
    case 'SET_PROJECT':
      return { ...state, project: action.payload };
      
    case 'SET_DATE':
      return { 
        ...state, 
        date: action.payload instanceof Date ? action.payload : new Date(action.payload) 
      };
      
    case 'ADD_ITEM':
      return { 
        ...state, 
        items: [...state.items, action.payload] 
      };
      
    case 'SET_CURRENT_ITEM':
      return { 
        ...state, 
        currentItem: action.payload 
      };
      
    case 'RESET_CURRENT_ITEM':
      return { 
        ...state, 
        currentItem: initialState.currentItem 
      };

    case 'ADD_BILL':
      const newBill = {
        id: Date.now(),
        client: state.client,
        project: state.project,
        date: state.date,
        items: [...state.items],
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      return {
        ...state,
        bills: [...state.bills, newBill],
        client: {},
        project: {},
        date: new Date(),
        items: [],
        currentItem: initialState.currentItem
      };

    case 'LOAD_BILLS':
      return {
        ...state,
        bills: action.payload
      };
      
    case 'RESET':
      return initialState;
      
    default:
      return state;
  }
}

export function BillProvider({ children }) {
  const [state, dispatch] = useReducer(billReducer, initialState);

  useEffect(() => {
    const savedBills = localStorage.getItem('bills');
    if (savedBills) {
      dispatch({ 
        type: 'LOAD_BILLS', 
        payload: JSON.parse(savedBills) 
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bills', JSON.stringify(state.bills));
  }, [state.bills]);

  return (
    <BillContext.Provider value={{ state, dispatch }}>
      {children}
    </BillContext.Provider>
  );
}

export function useBill() {
  const context = useContext(BillContext);
  if (!context) {
    throw new Error('useBill must be used within a BillProvider');
  }
  return context;
}