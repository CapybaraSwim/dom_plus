import React, { useEffect, useState } from 'react';

const AmoCRMIntegration = () => {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        // Получаем токен доступа при загрузке компонента
        getAccessToken();
    }, []);

    const getAccessToken = async () => {
        try {
            const response = await fetch('https://petrosyan412.amocrm.ru/api/v4/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: '8e041ea2-53d3-45f8-ba74-1c43e8e1e648', // Ваш ID интеграции
                    client_secret: 'vH5UvdYAgJ9ULE4qr7ynAh1HSEKeyXcEiFAlgUzK5a54Wo2PR6dXgD3Ghei50SM5', // Ваш секретный ключ
                    grant_type: 'authorization_code',
                    code: 'def502004043346eebf9f1bfe57cd744377db8ca30a10031ffc1b8066b29a4354e067d4e1af4df73dba66b3153f55506c89207096cc138d7296d267282bc4328c159557b234bfe15b711c535f31e9ae8c31267ff51f70cb6170ac11437e5f978860d3c49c4ee76835cf5530c055fb36d5cff61c04b886e91875a4caea9b5cbc7503f06983d9433903ed1cc2d3d77d2868b5931204d1b5ba54a2810ab04df6aceb494c70e098b2822ff0c34b9553f1ce80faa50b44ceb5479c3dbae6301d1b6d36d2a7eb716d223d54aaecc3ae682a91fd716d87be0fc1d3589eb3955bd0c6ea661655bb78988aa6fbde93decfc4d26b2891b6bd388149d6750c4333e6f31a4eee006a71a114bc3c1f244024d68424f554f84529cb03745b0ad67015d2a14c61e16a1f1b41fe538a2169d2382848d4cb85e89b56cd3f3ce65a27dbc2cf936edffacfb15c3248f9367a09ea8af964fee7f990379fc9088c7e4ab72689f1cb290498e80a8912ccf0088237bc2d7880be0b77b4df132f65153ce8ca193a71140a6523a67951e28320dcc6c9a9cc29f4f2889c0cb3ddda7e796b99d64eb9799a5873eda86ec3a2eb7e305f4182f42bda1a43d0f36fc58ff30f18b89c44c6a913ae49dca588a62b9640e78d98cd0846e46bb8e74a0baa21bbe5b89f4786fcb85cedf6592591b156114517fd89ec2dcd3', // Ваш код авторизации
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
            const response = await fetch('https://petrosyan412.amocrm.ru/api/v4/leads', {
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
