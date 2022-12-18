import { createContext, useState } from 'react';

const TypeAuthContext = createContext();

export const TypeAuthProvider = ({ children }) => {
    const [typeAuth, setTypeAuth] = useState('login');

    return <TypeAuthContext.Provider value={{ typeAuth, setTypeAuth }}>{children}</TypeAuthContext.Provider>;
};

export default TypeAuthContext;
