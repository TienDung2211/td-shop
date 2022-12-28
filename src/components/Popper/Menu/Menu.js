import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import HeaderMenu from './HeaderMenu';
import { useState, useEffect, useContext } from 'react';
import userServices from '~/services/userServices';
import DataContext from '~/context/DataContext';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn, clickLogout }) {
    const [user, setUser] = useState(null);

    const { render } = useContext(DataContext);

    const getUserInfo = async () => {
        const access = JSON.parse(localStorage.getItem('access'));

        if (access) {
            let dataApi = await userServices.getUser();

            if (dataApi?.data) {
                setUser(dataApi.data);
            }
        } else {
            setUser(null);
        }
    };
    useEffect(() => {
        getUserInfo();
    }, [items, render]);

    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            if (item?.role) {
                if (user?.Role.name === 'ROLE_EMPLOYEE' || user?.Role.name === 'ROLE_ADMIN') {
                    return (
                        <MenuItem
                            key={index}
                            data={item}
                            onClick={() => {
                                if (isParent) {
                                    setHistory((prev) => [...prev, item.children]);
                                } else {
                                    onChange(item);
                                }

                                if (item.title === 'Đăng xuất') {
                                    clickLogout();
                                }
                            }}
                        />
                    );
                } else return;
            }
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }

                        if (item.title === 'Đăng xuất') {
                            clickLogout();
                        }
                    }}
                />
            );
        });
    };

    return (
        <HeadlessTippy
            interactive
            placement="bottom-end"
            hideOnClick={hideOnClick}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {history.length > 1 && (
                            <HeaderMenu
                                title="Ngôn ngữ"
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, history.length - 1));
                                }}
                            />
                        )}
                        <div className={cx('menu-scrollabe')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </HeadlessTippy>
    );
}

export default Menu;
