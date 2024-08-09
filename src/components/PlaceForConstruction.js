import React, { useState, useContext, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const PlaceForConstruction = () => {
  const navigate = useNavigate();
  const { state, updateState } = useContext(AppContext);
  const [selectedOption, setSelectedOption] = useState(state.placeForConstruction);
  useEffect(() => {
    updateState('discount', 3);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    updateState('placeForConstruction', option);
    navigate('/paymentPage'); // Переход на следующую страницу
  };

  return (
    <div className="placeForConstruction_page">
      <Header />
      <div className="presentation_flex">
        <main className="presentation_page__main">
          <div className="presentation_page__title">
            <Link to="/presentation" className="back_arrow">
              <img className="arrow_back" src="/img/Arrow.svg" alt="Назад" />
            </Link>
            <h2>Выбрали место для строительства?</h2>
          </div>
          <div className="grid_container">
            <img src="/img/field.png" alt="field" className="grid_image" loading="lazy" />
            <div
              className={`grid_text already_have_plot ${selectedOption === 'have' ? 'selected' : ''}`}
              onClick={() => handleOptionClick('have')}
            >
              Уже есть участок
            </div>
            <div
              className={`grid_text need_find_plot ${selectedOption === 'find' ? 'selected' : ''}`}
              onClick={() => handleOptionClick('find')}
            >
              Нужно найти участок
            </div>
          </div>
        </main>
        <Sidebar />
      </div>
      <Footer progress={33} />
    </div>
  );
};

export default PlaceForConstruction;