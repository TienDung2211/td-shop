import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect, useContext } from 'react';
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
import OptionsPopper from '~/components/OptionsPopper';

const cx = classNames.bind(styles);

const USER_LOGINED = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Xem hồ sơ',
        to: '/setting/profile',
    },
    {
        icon: <FontAwesomeIcon icon={faLocationDot} />,
        title: 'Địa chỉ',
        to: '/setting/address',
    },
    {
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: 'Giỏ hàng',
        to: '/cart',
    },
    {
        icon: <FontAwesomeIcon icon={faFileInvoice} />,
        title: 'Đơn hàng',
        to: '/setting/order',
    },
    {
        icon: <FontAwesomeIcon icon={faUserTie} />,
        title: 'Quản lí',
        to: '/manager/product',
        role: 'ROLE_EMPLOYEE',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Cài đặt',
        to: '/setting/profile',
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

    const { render, setRender } = useContext(DataContext);

    const HandleSwitchType = () => {
        if (typeModal === 'login') {
            setTypeModal('register');
        } else {
            setTypeModal('login');
        }
    };

    useEffect(() => {
        const getUserInfo = async () => {
            setIsLoadUser(true);

            const access = JSON.parse(localStorage.getItem('access'));

            if (access) {
                let dataApi = await userServices.getUser();

                if (dataApi?.data) {
                    setUser(dataApi.data);
                }
            } else {
                setUser(null);
            }

            setIsLoadUser(false);
        };

        getUserInfo();
    }, [isModal, render]);

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
                                                items={USER_LOGINED}
                                                clickLogout={() => {
                                                    setUser(null);
                                                    authServices.authLogOut();
                                                    setRender(!render);
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
            <ToastContainer />
            {isModal && (
                <Modal closeModal={() => setIsModal(false)}>
                    <AuthForm
                        data={typeModal}
                        onLogin={() => {
                            setIsModal(false);
                            toast.success('Đăng nhập thành công!', {
                                position: toast.POSITION.TOP_RIGHT,
                                className: 'toast-message',
                            });
                        }}
                        onSwitchType={HandleSwitchType}
                        clickBack={() => setIsModal(false)}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Header;
