import React, { useState, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../index.scss';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { AppContext } from '../context/AppContext';

const FormPage = () => {
  const { state } = useContext(AppContext);
  const [progress, setProgress] = useState(95);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="form_page">
      <Header />
      <div className="form_page__content">
      <Link to="/paymentPage" className="back_arrow">
            <img className="arrow_back" src="/img/Arrow.svg" alt="Назад" />
          </Link>
        <div className="form_page__left">
          <h2>Получите проект своего дома и профессиональную консультацию, заполнив форму заявки.</h2>
          <p>
            А также дополнительно получите скидку 50 тысяч рублей на строительство своего частного дома после встречи в нашем офисе в течение 7 дней после заполнения заявки!
          </p>
        </div>
        <div className="form_page__divider"></div>
        <div className="form_page__right">
          <div className="discount">
            <span>Ваша скидка: 10%</span>
          </div>
          <form className="form">
            <label>
              Введите ФИО:
              <input type="text" name="name" />
            </label>
	    {state.placeForConstruction === 'have' && (
              <label>
                Введите адрес участка:
                <input type="text" name="address" />
              </label>
            )}
            <label>
              Введите телефон:
              <PhoneInput
                country={'ru'}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                containerStyle={{ width: '100%' }}
                inputStyle={{ width: '100%', borderRadius: '5px', padding: '10px', backgroundColor: '#303331', color: '#EDEDED', }}
                buttonStyle={{ borderRadius: '5px 0 0 5px', backgroundColor: '#303331' }}
                dropdownStyle={{ backgroundColor: '#303331', color: '#EDEDED' }}
              />
            </label>
            <button type="submit" className="submit_button">
              Получить результаты
            </button>
          </form>
        </div>
      </div>
      <Footer progress={progress} finalStep={true} />
    </div>
  );
};

export default FormPage;