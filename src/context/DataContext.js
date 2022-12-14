import { createContext, useState, useEffect } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [render, setRender] = useState(true);
    const [renderCart, setRenderCart] = useState(true);

    return (
        <DataContext.Provider
            value={{
                render,
                setRender,
                renderCart,
                setRenderCart,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
