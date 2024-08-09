import React from 'react';
import {useEffect} from 'react';
import './index.scss';
import HomePage from './components/HomePage';
import PresentationPage from './components/PresentationPage';
import PlaceForConstruction from './components/PlaceForConstruction';
import PaymentPage from './components/PaymentPage';
import FormPage from './components/FormPage';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { getUserDataFromCookies } from './components/Cookies';


function App() {
    useEffect(() => {
        const userData = getUserDataFromCookies();
        console.log('User Data from Cookies:', userData);
    }, []);
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
