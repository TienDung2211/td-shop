import { createContext, useState } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [render, setRender] = useState(true);
    const [renderCart, setRenderCart] = useState(true);
    const [dataPayment, setDataPayment] = useState([]);

    return (
        <DataContext.Provider
            value={{
                render,
                setRender,
                renderCart,
                setRenderCart,
                dataPayment,
                setDataPayment,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
