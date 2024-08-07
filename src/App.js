import React from 'react';
import './index.scss';
import HomePage from './components/HomePage';
import PresentationPage from './components/PresentationPage';
import PlaceForConstruction from './components/PlaceForConstruction';
import PaymentPage from './components/PaymentPage';
import FormPage from './components/FormPage';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';


function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/presentation" element={<PresentationPage />} />
        <Route path="/placeForConstruction" element={<PlaceForConstruction/>} />
        <Route path="/paymentPage" element={<PaymentPage/>} />
        <Route path="/formPage" element={<FormPage/>} />
      </Routes>
    </AppProvider>
  );
}


export default App;