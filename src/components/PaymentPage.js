import React, { useState, useContext, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state, updateState } = useContext(AppContext);
  const [selectedOption, setSelectedOption] = useState(state.paymentMethod);
  useEffect(() => {
    updateState('discount', 7);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    updateState('paymentMethod', option);
    navigate('/formPage'); // Переход на следующую страницу
  };

  return (
    <div className="payment_page">
      <Header />
      <div className="presentation_flex">
        <main className="presentation_page__main">
          <div className="presentation_page__title">
            <Link to="/placeForConstruction" className="back_arrow">
              <img className="arrow_back" src="/img/Arrow.svg" alt="Назад" loading="lazy"/>
            </Link>
            <h2>Способ оплаты</h2>
          </div>
          <div className="grid_container">
              <img src="/img/cash.webp" alt="field" className="grid_image" loading="lazy"/>
            <div
              className={`grid_text already_have_plot ${selectedOption === 'cash' ? 'selected' : ''}`}
              onClick={() => handleOptionClick('cash')}
            >
              За наличку
            </div>
            <div
              className={`grid_text need_find_plot ${selectedOption === 'mortgage' ? 'selected' : ''}`}
              onClick={() => handleOptionClick('mortgage')}
            >
              В ипотеку
            </div>
          </div>
        </main>
        <Sidebar />
      </div>
      <Footer progress={66} />
    </div>
  );
};

export default PaymentPage;