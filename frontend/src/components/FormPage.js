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
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Проверка ФИО
    if (!name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше ФИО';
    } else if (name.length < 3) {
      newErrors.name = 'ФИО должно содержать не менее 3 символов';
    }

    // Проверка адреса (если нужно)
    if (state.placeForConstruction === 'have' && !address.trim()) {
      newErrors.address = 'Пожалуйста, введите адрес участка';
    }

    // Проверка телефона
    if (!phone) {
      newErrors.phone = 'Пожалуйста, введите номер телефона';
    } else if (phone.length < 10) {
      newErrors.phone = 'Номер телефона должен содержать не менее 10 цифр';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Если ошибок нет, отправить форму
    e.target.submit();
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
          {isSubmitted ? (
            <div className="thank_you_message">
              <h2>Спасибо!</h2>
              <p>Ваша заявка была успешно отправлена. Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <>
              <div className="discount">
                <span>Ваша скидка: 10%</span>
              </div>
              <form
                className="form"
                action="/backend/amo/send_data.php"
                method="POST"
                onSubmit={handleSubmit}
                noValidate
              >
                <label>
                  Введите ФИО:
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength={3}
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </label>
                {state.placeForConstruction === 'have' && (
                  <label>
                    Введите адрес участка:
                    <input
                      type="text"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                    {errors.address && <span className="error">{errors.address}</span>}
                  </label>
                )}
                <label>
                  Введите телефон:
                  <PhoneInput
                    country={'ru'}
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                    containerStyle={{ width: '100%' }}
                    inputStyle={{
                      width: '100%',
                      borderRadius: '5px',
                      padding: '10px',
                      backgroundColor: '#303331',
                      color: '#EDEDED',
                    }}
                    buttonStyle={{
                      borderRadius: '5px 0 0 5px',
                      backgroundColor: '#303331',
                    }}
                    dropdownStyle={{ backgroundColor: '#303331', color: '#EDEDED' }}
                  />
                  {errors.phone && <span className="error">{errors.phone}</span>}
                </label>
                <button type="submit" className="submit_button">
                  Отправить
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer progress={progress} finalStep={false} />
    </div>
  );
};

export default FormPage;
