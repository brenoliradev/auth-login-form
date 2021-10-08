import { useState } from 'react';

export default function LoginToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        if (tokenString !== '') {
            try {
               var userToken = JSON.parse(tokenString);
            } catch(err) {
                console.log(err)
                return false;
            }
        }
        return userToken?.token
      };
    const [token, setToken] = useState(getToken());
    
    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}