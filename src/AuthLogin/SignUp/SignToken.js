import { useState } from 'react';

export default function SignTokenFunc() {
    const getTokenSign = () => {
        const tokenStringSign = localStorage.getItem('SessionSign');
        const userTokenSign = JSON.parse(tokenStringSign);
        return userTokenSign?.SessionSign
        };
    const [tokenSign, setTokenSign] = useState(getTokenSign());
    
    const saveTokenSign = userTokenSign => {
        localStorage.setItem('SessionSign', JSON.stringify(userTokenSign));
        setTokenSign(userTokenSign.SessionSign);
    };

    return {
        setToken: saveTokenSign,
        tokenSign
    }
}