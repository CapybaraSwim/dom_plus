import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { AppContext } from '../context/AppContext';

function HomePage() {
  const navigate = useNavigate();
  const { resetState } = useContext(AppContext);

  useEffect(() => {
    resetState();
  }, [resetState]);

  const handleClick = () => {
    navigate('/presentation');
  };

  return (
    <div className="home_page">
      <Header showPopup={false} />
      <main className="home_page__main">
        <h1>Строительство частного дома от 2.8 млн. рублей</h1>
        <p>
          Профессиональный подход к клиенту, индивидуальный проект, поиск участка, подведение коммуникаций, White Box и ремонт под ключ
        </p>
        <button className="button" onClick={handleClick}>Получить проект</button>
      </main>
    </div>
  );
}

export default HomePage;