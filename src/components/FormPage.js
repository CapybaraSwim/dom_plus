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
      const response = await fetch('https://petrosyan412.amocrm.ru/leads/pipeline/?skip_filter=Y', {
        method: 'GET',
        headers: {
          'Authorization': `def5020089708b96d7d9961cdcb0108e2a677bdc8b29ae1bfa58d1bc423443ce4bd9cf32014bce9b181ec6f7a81e8f1613d570419730bbf87f8f874c6f1c7352a1a2fcac73c7139b2a1e6d86bb4bc76200d328dba590519c82c660081a83e2f8823427ef0505a316c9d9d1fd98ca8d9be18682f563101e67449fd6add7756faf15586f71c63dc478ab1c5188c16c24ac7dbfebfb2cb7e9fd4740cfc81a7899c3bc4bef3dab1bcf1b39e708ca3900d46df99311a685c595cbdc87a1e59e75f8390e1ef8f0b03345a7fc68791456510b39b44adee9d5ffa7e826ba6d664bcf7e4e1d2cdacc3f63746ea410d470b63ebf53da4de5dcb95bc64d85e2e60d1c1c82b28526c77f5719d24723513bacd06d4a66313f26614965f65bdcd0d205f9e9d8c4a64914d1e6d724dad6816a1f2e67f5537da21a78ca6a7cac23b22947d21de1d5a47510d035fec27692a31bec1608b062a30173fdde7baa94e24a0abdde3718c4d398966ce9b24ca8bd41af9ff15e53c35aa75d3205431992b27caee6ee8cf18d0208930f6bb8a0751f64077890dbfa8d1e97a7a2137843024096ee685b58b9f5f30ba579f28a0eb22b9de4bc0ede74eb294e3f34e9985d1c95778c2fa1e6fc00a76342a1e3156d0cfba33edc0cc2a917da00df53c0f1e423e57af817e2b280774450305f6bd96c5cd2de8e50b3`, // Замените на актуальный токен доступа
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
        // custom_fields_values: [
        //   {
        //     field_id: PHONE_FIELD_ID, // Замените на ваш ID поля для телефона в amoCRM
        //     values: [{ value: phone }],
        //   },
        // ],
        // contacts: [
        //   {
        //     name,
        //     custom_fields_values: [
        //       {
        //         field_id: NAME_FIELD_ID, // Замените на ваш ID поля для имени в amoCRM
        //         values: [{ value: name }],
        //       },
        //     ],
        //   },
        // ],
      };

      if (state.placeForConstruction === 'have') {
        leadData.custom_fields_values.push({
          // field_id: ADDRESS_FIELD_ID, // Замените на ваш ID поля для адреса в amoCRM
          // values: [{ value: address }],
        });
      }

      const response = await fetch('https://petrosyan412.amocrm.ru/leads/pipeline/?skip_filter=Y', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `def5020089708b96d7d9961cdcb0108e2a677bdc8b29ae1bfa58d1bc423443ce4bd9cf32014bce9b181ec6f7a81e8f1613d570419730bbf87f8f874c6f1c7352a1a2fcac73c7139b2a1e6d86bb4bc76200d328dba590519c82c660081a83e2f8823427ef0505a316c9d9d1fd98ca8d9be18682f563101e67449fd6add7756faf15586f71c63dc478ab1c5188c16c24ac7dbfebfb2cb7e9fd4740cfc81a7899c3bc4bef3dab1bcf1b39e708ca3900d46df99311a685c595cbdc87a1e59e75f8390e1ef8f0b03345a7fc68791456510b39b44adee9d5ffa7e826ba6d664bcf7e4e1d2cdacc3f63746ea410d470b63ebf53da4de5dcb95bc64d85e2e60d1c1c82b28526c77f5719d24723513bacd06d4a66313f26614965f65bdcd0d205f9e9d8c4a64914d1e6d724dad6816a1f2e67f5537da21a78ca6a7cac23b22947d21de1d5a47510d035fec27692a31bec1608b062a30173fdde7baa94e24a0abdde3718c4d398966ce9b24ca8bd41af9ff15e53c35aa75d3205431992b27caee6ee8cf18d0208930f6bb8a0751f64077890dbfa8d1e97a7a2137843024096ee685b58b9f5f30ba579f28a0eb22b9de4bc0ede74eb294e3f34e9985d1c95778c2fa1e6fc00a76342a1e3156d0cfba33edc0cc2a917da00df53c0f1e423e57af817e2b280774450305f6bd96c5cd2de8e50b3`, // Замените на актуальный токен
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
