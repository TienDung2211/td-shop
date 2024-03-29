import { Fragment } from 'react';
import { publicRoutes } from './routes';
import ScrollToTop from './hooks/scrollToTop';
import DefaultLayout from './layouts/DefaultLayout';
import SettingsLayout from './layouts/SettingLayout';
import ManagerLayout from './layouts/ManagerLayout';

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    useEffect(() => {}, []);

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === SettingsLayout) {
                            Layout = SettingsLayout;
                        } else if (route.layout === ManagerLayout) {
                            Layout = ManagerLayout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <ScrollToTop>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </ScrollToTop>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
