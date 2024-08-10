const bearerToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIwMDRmZjI2Yzg4OWQ5YTYxNWE5ODQwNDI2MjFmMDFmMWUyMTE4YTFhOGQxMmJiYzhlYTYyNzFlODI5Zjg5NmVhZDExZmViMWE2ZGE0MzlhIn0.eyJhdWQiOiJjNThiNzczYi05Y2ZjLTRiYmUtOWJmYi1hNmFkOTRjNGQ3YTQiLCJqdGkiOiJiMDA0ZmYyNmM4ODlkOWE2MTVhOTg0MDQyNjIxZjAxZjFlMjExOGExYThkMTJiYmM4ZWE2MjcxZTgyOWY4OTZlYWQxMWZlYjFhNmRhNDM5YSIsImlhdCI6MTcyMzI4MTY1MSwibmJmIjoxNzIzMjgxNjUxLCJleHAiOjE4MzAyOTc2MDAsInN1YiI6IjExMzcyODc0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxODkwOTgyLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiNGFlNjE1YjAtMTY0Mi00NTI3LWI2YWEtMTNiNzc1YTUwNDIxIn0.haK5O9LOo-8iW_L2GEWmo0hyQxmOdvIjNvtKkNhJ5BggAc8FctH94Unw1-cRF8RvZw1HQFmMmEozkyIUS65-m7E4wWepucGUGwyrJfFL9Hiw0VOLsr2pLTroMvQMfIAwWXtUcmnf6FpBEaYRQgiTyV7tVi3r6tmVxEKFpqJ4Xd503TCh24cdNRQQRgWadzJDPKbHC460JOOKKvoqalB5MbYXmgxc-Y29NK6wQ_rdnBYKcj2dwvS4RrkfFfYIJxGC9DVY9JAvxXBHQ43RJdEfpOMZuVfRO9DdqvUVcEf8wHM_dAusYMHfcGXzO5sy7tMJ9n2NBONdTVccnEHltMLMYw';
const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
};

const createLead = async () => {
    const leadData = {
        name: 'Новая заявка с сайта',
        // другие данные сделки
    };

    try {
        const response = await fetch('https://petrosyan412.amocrm.ru/api/v4/leads', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify([leadData]),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Заявка успешно отправлена:', data);
    } catch (error) {
        console.error('Ошибка при отправке заявки:', error.message);
    }
};

export { createLead };
