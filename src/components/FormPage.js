import React, { useState, useContext, useEffect } from 'react';
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

  useEffect(() => {
    // Вызов функции для получения и вывода полей в консоль при монтировании компонента
    getCustomFields();
  }, []);

  const getCustomFields = async () => {
    try {
      const response = await fetch('https://your-amocrm-domain.amocrm.ru/api/v4/leads/custom_fields', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer YOUR_ACCESS_TOKEN`, // Замените на актуальный токен доступа
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();

        // Вывод всех полей в консоль
        console.log('Все поля:', data);

        // Вывод каждого поля по отдельности с их ID и именем
        data.forEach(field => {
          console.log(`Поле: ${field.name}, ID: ${field.id}`);
        });
      } else {
        console.error('Ошибка при получении полей:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleSubmit = async (e) => {
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

    // Если ошибок нет, отправляем данные в amoCRM
    try {
      const leadData = {
        name: 'Новая заявка с сайта',
        custom_fields_values: [
          {
            field_id: PHONE_FIELD_ID, // Замените на ваш ID поля для телефона в amoCRM
            values: [{ value: phone }],
          },
        ],
        contacts: [
          {
            name,
            custom_fields_values: [
              {
                field_id: NAME_FIELD_ID, // Замените на ваш ID поля для имени в amoCRM
                values: [{ value: name }],
              },
            ],
          },
        ],
      };

      if (state.placeForConstruction === 'have') {
        leadData.custom_fields_values.push({
          field_id: ADDRESS_FIELD_ID, // Замените на ваш ID поля для адреса в amoCRM
          values: [{ value: address }],
        });
      }

      const response = await fetch('https://petrosyan412.amocrm.ru/leads/pipeline/?skip_filter=Y', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFlOGJkNzE1M2U0NWY4ZWM5MjA5NTQzMjgzNjhiZGVlMjRjZDJlY2Q1NmIyYmQyMTMzYWRmYjJmYjQ3YzdmNWIzMWRiODJhNjNmYmE4OWFjIn0.eyJhdWQiOiI4ZTA0MWVhMi01M2QzLTQ1ZjgtYmE3NC0xYzQzZThlMWU2NDgiLCJqdGkiOiJhZThiZDcxNTNlNDVmOGVjOTIwOTU0MzI4MzY4YmRlZTI0Y2QyZWNkNTZiMmJkMjEzM2FkZmIyZmI0N2M3ZjViMzFkYjgyYTYzZmJhODlhYyIsImlhdCI6MTcyMzIxOTI3NCwibmJmIjoxNzIzMjE5Mjc0LCJleHAiOjE4MzAyOTc2MDAsInN1YiI6IjExMzcyODc0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxODkwOTgyLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMDc5NDVhMGYtYmI4Yy00MTQ4LTlhNjUtM2FjY2ZkMjIwZjgzIn0.RMppDhkMYWJqT1hRe896PZfqKtfHWGFORZxfra0CaQ9ZgB0EqKmna3Rg_3bv-rJTiY630KSIiy9pmEkx7ifQvDV-Eh0iKkAiNBdgPU4u7p9DKZ4jieFyt9Vcv9Bb7B_KLZIH-tmjdnMN891IVrSjbNImqe7h09sGCntU7qHxofDHb6IlV_0UWQNmLzoLLM1w--k-Y2gasqJHn8lFG9Aci_8iZjFpXNvUngN_YsKU2S9LNx1e0Ff3HMWZbnluQLM4riY1TP5lY1C7vrE7EB_pO5_JA-V-RAVM8s9kSeo0TmYJJ_w4lc3BgM4gAaVD_9mC-QKyZXOrOqMxpgWD4kGjHQ`, // Замените на актуальный токен
        },
        body: JSON.stringify([leadData]),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Заявка успешно отправлена в amoCRM:', data);
        setIsSubmitted(true);
      } else {
        console.error('Ошибка при отправке заявки в amoCRM:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
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
                  <form className="form" onSubmit={handleSubmit} noValidate>
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
