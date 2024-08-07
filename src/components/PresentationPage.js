import React, { useState, useContext, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const area = [
  { id: 1, name: '60м2', img: '/img/houses/house1.png' },
  { id: 2, name: '60м2', img: '/img/houses/house2.png' },
  { id: 3, name: '60м2', img: '/img/houses/house3.png' },
  { id: 4, name: '60м2', img: '/img/houses/house4.png' },
  { id: 5, name: '60м2', img: '/img/houses/house5.png' },
  { id: 6, name: '60м2', img: '/img/houses/house6.png' },
  { id: 7, name: '60м2', img: '/img/houses/house7.png' },
];

function PresentationPage() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { state, updateState } = useContext(AppContext);
  const [selectedHouse, setSelectedHouse] = useState(state.houseSize);
  useEffect(() => {
    updateState('discount', 0);
  }, [updateState]);
  const handleHouseClick = (houseId) => {
    setSelectedHouse(houseId);
  };

  const handlePageClick = (event) => {
    if (!event.target.closest('.house_card')) {
      setSelectedHouse(null);
    }
  };

  const handleNextClick = () => {
    setProgress(progress + 33);
    updateState('houseSize', selectedHouse);
    navigate('/placeForConstruction');
  };

  return (
    <div className="presentation_page" onClick={handlePageClick}>
      <Header />
      <div className="presentation_flex">
        <main className="presentation_page__main">
          <div className="presentation_page__title">
            <Link to="/" className="back_arrow">
              <img className="arrow_back" src="/img/Arrow.svg" alt="Назад" />
            </Link>
            <h2>Варианты размера строительства вашего дома</h2>
          </div>
          <section className="houses_section">
            <div className="houses_grid">
              {area.map((area) => (
                <div
                  key={area.id}
                  className={`house_card ${selectedHouse === area.id ? 'selected' : ''}`}
                  onClick={() => handleHouseClick(area.id)}
                >
                  <img src={area.img} alt={`Дом ${area.id + 1}`} />
                  <span>{area.name}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Sidebar/>
      </div>
      <Footer progress={progress} handleNextClick={handleNextClick} />
    </div>
  );
}

export default PresentationPage;