import React, { useEffect, useState } from 'react';

const AmoCRMIntegration = () => {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        // Получаем токен доступа при загрузке компонента
        getAccessToken();
    }, []);

    const getAccessToken = async () => {
        try {
            const response = await fetch('https://petrosyan412.amocrm.ru/leads/pipeline/?skip_filter=Y', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: '8e041ea2-53d3-45f8-ba74-1c43e8e1e648', // Ваш ID интеграции
                    client_secret: 'vH5UvdYAgJ9ULE4qr7ynAh1HSEKeyXcEiFAlgUzK5a54Wo2PR6dXgD3Ghei50SM5', // Ваш секретный ключ
                    grant_type: 'authorization_code',
                    code: 'def5020078f7954569089ec7d70933524214fe8ce406114cd255b2da64e9ceccd8fb63e062a59027f666f9654202b527909a35e0546b3e57c4353c95103f83430feb2d11e58b2a2ec416ec1b9e757614f3413154915af9e65937b426de27ac60952b0492bc36ef0be6190969571c144a48d7daa013fb516069dcfa4cfbfc0ae12e6f676d281aae23de7da0ed727ff04bbfc504f0bacef431fd2a84c7b0d1722be7f623db9aa527bdeaded642f1d02ceb59ad6aaf9a21d5d39cd6d99b879b7460acc85098effd422923e16d6670d4c1a904dbe59c8528d840ea449fa4e6bfe5c999d2c9d0f19b18624d82decfc32068ccc963a2cc84574150a15bae5ee03f5c439a441071b925bb8ff71bb36fe524d877ff800dbb6ab183eff0a861cbcf6e7c7931ca25ba6daf50e99e380f959b36b2a5aec3d75588ffde722c24ef5c98f0640abf44be201473b7ab5d5004b9beda9794d83bce9b2c206b39d061db457d82465fa2d763b0dbd1ae691d65b8b0a7016fd70a921b969fb6aacdebefb7d523e9a88cec61e4ad60ca5c5dc41331a8a1db8513d45a4882a5c50c3209bcd13b9aa94fb5f160993ff272875dd3ae8db024d5a15d4a25e63c0e3ede95a179ce564f2dae792df25e3c304581bb2af2295d5c690a89ae9a4c68a0c5d6c0013c640bc111719abaf3e6c829cb1ac980bd891fca', // Ваш код авторизации
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
            const response = await fetch('https://petrosyan412.amocrm.ru/leads/pipeline/?skip_filter=Y', {
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
