import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import Cart from './Cart';
import QrCode from './QrCode';
import Search from './Search';
import images from '~/assets/images';
import Modal from '~/components/Modal';
import Notification from './Notification';
import Menu from '~/components/Popper/Menu';
import DataContext from '~/context/DataContext';
import userServices from '~/services/userServices';
import authServices from '~/services/authServices';
import AuthForm from '~/components/AuthForm/AuthForm';
import { ToastContainer, toast } from 'react-toastify';
import { MENU_OPTIONS } from '~/components/MenuOptions/MenuOptions';

const cx = classNames.bind(styles);

function Header() {
    const [isModal, setIsModal] = useState(false);
    const [typeModal, setTypeModal] = useState('login');
    const [user, setUser] = useState(null);

    const { render, setRender } = useContext(DataContext);

    const handleSwitchType = () => {
        if (typeModal === 'login') {
            setTypeModal('register');
        } else {
            setTypeModal('login');
        }
    };

    const handleLoginSuccess = () => {
        setIsModal(false);
        toast.success('Đăng nhập thành công!', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message',
        });
    };

    const getUserInfo = async () => {
        const access = JSON.parse(localStorage.getItem('access'));

        if (access) {
            let api = await userServices.getUser();

            if (api?.status === 200) {
                setUser(api.data);
            } else {
                setUser(null);
                localStorage.removeItem('access');
                localStorage.removeItem('userId');
            }
        } else {
            setUser(null);
        }
    };

    const memoizedDiv = useMemo(
        () => (
            <ul className={cx('navbar-list')}>
                <li className={cx('navbar-item', 'hidden-by-mobile')}>
                    <FontAwesomeIcon icon={faCircleQuestion} className={cx('icon')} />
                    <span>Trợ giúp</span>
                </li>

                {!user ? (
                    <div className={cx('login-status')}>
                        <li
                            className={cx('navbar-item')}
                            onClick={() => {
                                setIsModal(true);
                                setTypeModal('register');
                            }}
                        >
                            <span>Đăng ký</span>
                        </li>
                        <span className={cx('separation')} />
                        <li
                            className={cx('navbar-item')}
                            onClick={() => {
                                setIsModal(true);
                                setTypeModal('login');
                            }}
                        >
                            <span>Đăng nhập</span>
                        </li>
                    </div>
                ) : (
                    <div className={cx('login-status')}>
                        <li className={cx('navbar-item')}>
                            <Notification />
                        </li>
                        <li className={cx('navbar-item')}>
                            <Menu
                                items={MENU_OPTIONS}
                                clickLogout={() => {
                                    setUser(null);
                                    authServices.authLogOut();
                                    setRender(!render);
                                }}
                            >
                                {
                                    <div className={cx('account')}>
                                        <span>
                                            {user.LastName + ' ' + user.FirstName}
                                            <span className={cx('user-id', 'hidden-by-mobile')}>#{user.Id}</span>
                                        </span>
                                    </div>
                                }
                            </Menu>
                        </li>
                    </div>
                )}
            </ul>
        ),
        [user],
    );

    useEffect(() => {
        getUserInfo();
    }, [render]);

    useEffect(() => {
        const interval = setInterval(() => {
            getUserInfo();
        }, 5 * 60 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <div className={cx('logo-app', 'hidden-by-mobile')}>
                    <Link to="/">
                        <img src={images.logo} alt="Logo App" />
                    </Link>
                </div>

                <div className={cx('layout')}>
                    <nav className={cx('navbar')}>
                        <ul className={cx('navbar-list', 'hidden-by-mobile', 'hidden-by-tablet')}>
                            <li className={cx('navbar-item', 'item--noreply')}>
                                <QrCode title="Vào cửa hàng trên ứng dụng TD-Shop" />
                            </li>
                            <span className={cx('separation')} />
                            <li className={cx('navbar-item', 'item--noreply')}>
                                <span>Kết nối</span>
                                <div className={cx('icon-apps')}>
                                    <FontAwesomeIcon icon={faFacebook} className={cx('icon')} />
                                    <FontAwesomeIcon icon={faInstagram} className={cx('icon')} />
                                </div>
                            </li>
                        </ul>
                        <ul className={cx('navbar-list', 'item--noreply', 'name-app-layout')}>
                            <Link to={'/'} className={cx('name-app')}>
                                TD Shop
                            </Link>
                        </ul>

                        {/* <ul className={cx('navbar-list')}>
                            <li className={cx('navbar-item', 'hidden-by-mobile')}>
                                <FontAwesomeIcon icon={faCircleQuestion} className={cx('icon')} />
                                <span>Trợ giúp</span>
                            </li>

                            {!user ? (
                                <div className={cx('login-status')}>
                                    <li
                                        className={cx('navbar-item')}
                                        onClick={() => {
                                            setIsModal(true);
                                            setTypeModal('register');
                                        }}
                                    >
                                        <span>Đăng ký</span>
                                    </li>
                                    <span className={cx('separation')} />
                                    <li
                                        className={cx('navbar-item')}
                                        onClick={() => {
                                            setIsModal(true);
                                            setTypeModal('login');
                                        }}
                                    >
                                        <span>Đăng nhập</span>
                                    </li>
                                </div>
                            ) : (
                                <div className={cx('login-status')}>
                                    <li className={cx('navbar-item')}>
                                        <Notification />
                                    </li>
                                    <li className={cx('navbar-item')}>
                                        <Menu
                                            items={MENU_OPTIONS}
                                            clickLogout={() => {
                                                setUser(null);
                                                authServices.authLogOut();
                                                setRender(!render);
                                            }}
                                        >
                                            {
                                                <div className={cx('account')}>
                                                    <span>
                                                        {user.LastName + ' ' + user.FirstName}
                                                        <span className={cx('user-id', 'hidden-by-mobile')}>
                                                            #{user.Id}
                                                        </span>
                                                    </span>
                                                </div>
                                            }
                                        </Menu>
                                    </li>
                                </div>
                            )}
                        </ul> */}
                        {memoizedDiv}
                    </nav>
                    <div className={cx('area-search')}>
                        {/* <div className={cx('options-layout')}>
                            <OptionsPopper />
                        </div> */}
                        <div className={cx('search-layout')}>
                            <Search />
                        </div>
                        <div className={cx('cart-layout', 'hidden-by-mobile')}>
                            <Cart />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            {isModal && (
                <Modal closeModal={() => setIsModal(false)}>
                    <AuthForm
                        data={typeModal}
                        onLogin={handleLoginSuccess}
                        onSwitchType={handleSwitchType}
                        clickBack={() => setIsModal(false)}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Header;
