import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Sidebar() {
  const { state } = useContext(AppContext);
  const services = [
    { id: 1, name: 'Создание проекта', img: '/img/sidebar/service1.webp' },
    { id: 2, name: 'Ремонт под ключ', img: '/img/sidebar/service2.webp' },
    { id: 3, name: 'Поиск земельных участков', img: '/img/sidebar/service3.webp' },
    { id: 4, name: 'Юридическая помощь', img: '/img/sidebar/service4.webp' },
    { id: 5, name: 'Подключение коммуникаций', img: '/img/sidebar/service5.webp' },
    { id: 6, name: 'Ландшафтный дизайн', img: '/img/sidebar/service6.webp' },
  ];
  return (
    <aside className="sidebar_main">
      <div className="discount">
        <p><span>Ваша скидка:</span> <span className="dinamic_discount">{state.discount}%</span></p>
      </div>
      <div className="services__title">
        <p>Наши услуги</p>
      </div>
      <div className="services">
        {services.map((service) => (
          <div key={service.id} className="service_card">
            <img src={service.img} alt={service.name} className={`service_img${service.id}`} loading="lazy" />
            <span>{service.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}