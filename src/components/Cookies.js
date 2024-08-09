import React, { useEffect, useState } from 'react';

const AmoCRMIntegration = () => {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        // Получаем токен доступа при загрузке компонента
        getAccessToken();
    }, []);

    const getAccessToken = async () => {
        try {
            const response = await fetch('https://petrosyan412.amocrm.ru/oauth2/access_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: '8e041ea2-53d3-45f8-ba74-1c43e8e1e648', // Ваш ID интеграции
                    client_secret: 'vH5UvdYAgJ9ULE4qr7ynAh1HSEKeyXcEiFAlgUzK5a54Wo2PR6dXgD3Ghei50SM5', // Ваш секретный ключ
                    grant_type: 'authorization_code',
                    code: 'def5020051fe4dcb64d369b65d8df45a7e220c813e22159a8c7669b6cace85a45a7f49032a46a08471844d16336a380b8147583a7ea82cd679308a6e9dcce673d66011ddc5b383fb342245d4c3de1e15788aad878b855cc1d01488a32fe26279eda2f7396a61df20d17b19ef4c6af06b72771f115f69b8a5ab98e35a2fd30a5ee7790be0f88864e5f2fdc1fc690d718829e61b680decbcf5b506ce7f7992848cc1841b1f6278f14706c6bd1e03db5ed52f4e67196ad2cd40a59f0a7e07de3cb56cc8adeb4722d9217a9e29c449c861dde9b56324c1356887fd285756ba97f633b7922f982e2218174b6c370f51147e0988c4f5189f2722291739a8616326d06656acef981158c5795f201878c0b002af2f4c801831662ae352c460e49cb3a882d220d6588fc4bbfd45fbb6469e91ad59b04dbeac445ea0cacfc353c18a0057aa3a7935af392a6fc309caca551fae9d260f7316260a6682a5482efffe17d923078941722fe47ecd90aa0841d36443028e87b0cfd6f2fc0e028d4d3f242439e5a09405004637c902a9e70c0403d5a0da8a81ae295ff39059a02346576ebfe23c9674cd91863b67f4b10bca231ef0795023c67024115f3d5c04f053c05e5eb73e2a77feaf29193ddf89e5ac4d0443ffb12804012cabb44a51f754a024c2a85710e5c194c2d328efc8788fc3bdeb5b', // Ваш код авторизации
                    redirect_uri: 'https://домплюс.com/', // Ваш Redirect URI (должен совпадать с настройками интеграции)
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Токен доступа получен:', data.access_token);
                setAccessToken(data.access_token);

                // После получения токена, делаем запрос к кастомным полям
                getCustomFields(data.access_token);
            } else {
                console.error('Ошибка получения токена:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка выполнения запроса:', error);
        }
    };

    const getCustomFields = async (token) => {
        try {
            const response = await fetch('https://petrosyan412.amocrm.ru/api/v4/leads/custom_fields', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Кастомные поля:', data);

                // Выводим каждое поле с его ID и именем
                data.forEach(field => {
                    console.log(`Поле: ${field.name}, ID: ${field.id}`);
                });
            } else {
                console.error('Ошибка при получении полей:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка выполнения запроса:', error);
        }
    };

    return (
        <div>
            <h1>AmoCRM Integration</h1>
            <p>Проверьте консоль для получения информации о токене доступа и кастомных полях.</p>
        </div>
    );
};

export default AmoCRMIntegration;
