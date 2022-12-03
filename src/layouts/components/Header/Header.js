import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
    faCircleQuestion,
    faUser,
    faLanguage,
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

const cx = classNames.bind(styles);

const USER_LOGINED = [
    // {
    //     icon: <FontAwesomeIcon icon={faLanguage} />,
    //     title: 'Ngôn ngữ',
    //     children: {
    //         title: 'Ngôn ngữ',
    //         data: [
    //             {
    //                 type: 'language',
    //                 code: 'en',
    //                 title: 'English',
    //             },
    //             {
    //                 type: 'language',
    //                 code: 'vi',
    //                 title: 'Tiếng Việt',
    //             },
    //         ],
    //     },
    // },
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
        to: '/manager/account',
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
    const [login, setLogin] = useState(true);
    const [typeModal, setTypeModal] = useState('login');

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

                        <ul className={cx('navbar-list')}>
                            <li className={cx('navbar-item')}>
                                <FontAwesomeIcon icon={faCircleQuestion} className={cx('icon')} />
                                <span>Trợ giúp</span>
                            </li>

                            {!login ? (
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
                                        <Menu items={USER_LOGINED} clickLogout={() => setLogin(false)}>
                                            {
                                                <div className={cx('account')}>
                                                    <span>Tiến Dũng #123</span>
                                                </div>
                                            }
                                        </Menu>
                                    </li>
                                </div>
                            )}
                        </ul>
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
                        clickLogin={() => {
                            setLogin(true);
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
