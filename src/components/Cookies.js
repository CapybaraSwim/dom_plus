import Cookies from 'js-cookie';

export const getUserDataFromCookies = () => {
    const allCookies = Cookies.get();
    const userData = {
        name: allCookies.userName || '',
        email: allCookies.userEmail || '',
        phone: allCookies.userPhone || '',
        allCookies: allCookies // Сохраняем все куки в отдельном поле
    };
    return userData;
};
