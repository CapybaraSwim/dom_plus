import React, { useState, useContext, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import LazyLoad from 'react-lazyload';

const area = [
  { id: 1, name: '61,7-82,6 м2', img: '/img/houses/house1.webp' },
  { id: 2, name: '82,6-97,5 м2', img: '/img/houses/house2.webp' },
  { id: 3, name: '97,5-125,2 м2', img: '/img/houses/house3.webp' },
  { id: 4, name: '125,2-139,7 м2', img: '/img/houses/house4.webp' },
  { id: 5, name: '139,7-162 м2', img: '/img/houses/house5.webp' },
  { id: 6, name: '99,4-135 м2 (2 этажа)', img: '/img/houses/house6.webp' },
  { id: 7, name: '135-159,2 м2 (2 этажа)', img: '/img/houses/house7.webp' },
  { id: 8, name: '159,2-172 м2 (2 этажа)', img: '/img/houses/house8.webp' },
  { id: 9, name: '172-190,1 м2 (2 этажа)', img: '/img/houses/house9.webp' },
  { id: 10, name: '190,1-261,1 м2 (2 этажа)', img: '/img/houses/house10.webp' },
  { id: 11, name: '261,1-342,9 м2 (2 этажа)', img: '/img/houses/house11.webp' },
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
    updateState('houseSize', houseId);
    setProgress(progress + 33);
    navigate('/placeForConstruction'); // Переход на следующую страницу
  };

  const handlePageClick = (event) => {
    if (!event.target.closest('.house_card')) {
      setSelectedHouse(null);
    }
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
        <Sidebar />
      </div>
      <Footer progress={progress} />
    </div>
  );
}

export default PresentationPage;