export const BASE_URL = 'http://localhost:9695';

export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        console.log('returning', { Authorization: user.token });
        return {
            headers: {
                Authorization: user.token
            }
        };
    } else {
        return {};
    }
};