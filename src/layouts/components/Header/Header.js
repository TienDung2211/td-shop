import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { useState, useEffect, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
    faCircleQuestion,
    faUser,
    faArrowRightFromBracket,
    faLocationDot,
    faFileInvoice,
    faGear,
    faUserTie,
    faCartShopping,
} from '@fortawesome/free-solid-svg-icons';

// import Button from '~/components/Button';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import Search from './Search';
import Cart from './Cart';
import QrCode from './QrCode';
import Notification from './Notification';
import Modal from '~/components/Modal';
import AuthForm from '~/components/AuthForm/AuthForm';
import OptionsPopper from '~/components/OptionsPopper';
import authServices from '~/services/authServices';
import userServices from '~/services/userServices';

const cx = classNames.bind(styles);

const USER_LOGINED = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Xem hồ sơ',
        to: '/setting/profile',
        role: 'guest',
    },
    {
        icon: <FontAwesomeIcon icon={faLocationDot} />,
        title: 'Địa chỉ',
        to: '/setting/address',
        role: 'guest',
    },
    {
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: 'Giỏ hàng',
        to: '/cart',
        role: 'guest',
    },
    {
        icon: <FontAwesomeIcon icon={faFileInvoice} />,
        title: 'Đơn hàng',
        to: '/setting/order',
        role: 'guest',
    },
    {
        icon: <FontAwesomeIcon icon={faUserTie} />,
        title: 'Quản lí',
        to: '/manager/account',
        role: 'emloyee',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Cài đặt',
        to: '/setting/profile',
        role: 'guest',
    },
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: 'Đăng xuất',
        separation: true,
    },
];

function Header() {
    const [isModal, setIsModal] = useState(false);
    const [typeModal, setTypeModal] = useState('login');
    const [user, setUser] = useState(null);
    const [isLoadUser, setIsLoadUser] = useState(false);

    useEffect(() => {
        const getUserInfo = async () => {
            setIsLoadUser(true);

            let dataApi = await userServices.getUser();

            if (dataApi?.data) {
                setUser(dataApi.data);
            }

            setIsLoadUser(false);
        };

        getUserInfo();
    }, [isModal]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <div className={cx('logo-app')}>
                    <Link to="/">
                        <img src={images.logo} alt="Logo App" />
                    </Link>
                </div>

                <div className={cx('layout')}>
                    <nav className={cx('navbar')}>
                        <ul className={cx('navbar-list')}>
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
                        {isLoadUser ? null : (
                            <ul className={cx('navbar-list')}>
                                <li className={cx('navbar-item')}>
                                    <FontAwesomeIcon icon={faCircleQuestion} className={cx('icon')} />
                                    <span>Trợ giúp</span>
                                </li>

                                {!user ? (
                                    <div className={cx('login-status')}>
                                        <li
                                            className={cx('navbar-item')}
                                            onClick={() => {
                                                setIsModal(true);
                                                setTypeModal('signin');
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
                                                items={USER_LOGINED}
                                                clickLogout={() => {
                                                    setUser(null);
                                                    authServices.authLogOut();
                                                }}
                                            >
                                                {
                                                    <div className={cx('account')}>
                                                        <span>
                                                            {user.LastName + ' ' + user.FirstName} #{user.Id}
                                                        </span>
                                                    </div>
                                                }
                                            </Menu>
                                        </li>
                                    </div>
                                )}
                            </ul>
                        )}
                    </nav>
                    <div className={cx('area-search')}>
                        <div className={cx('options-layout')}>
                            <OptionsPopper />
                        </div>
                        <div className={cx('search-layout')}>
                            <Search />
                        </div>
                        <div className={cx('cart-layout')}>
                            <Cart />
                        </div>
                    </div>
                </div>
            </div>
            {isModal && (
                <Modal closeModal={() => setIsModal(false)}>
                    <AuthForm
                        data={typeModal}
                        onLogin={() => {
                            setIsModal(false);
                        }}
                        clickBack={() => setIsModal(false)}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Header;
