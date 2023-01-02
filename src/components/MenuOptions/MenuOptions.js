import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faArrowRightFromBracket,
    faLocationDot,
    faFileInvoice,
    faGear,
    faUserTie,
    faCartShopping,
} from '@fortawesome/free-solid-svg-icons';

export const MENU_OPTIONS = [
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

export const MANAGER_OPTIONS = [
    {
        id: 0,
        name: 'Quản lí tài khoản',
        key: 'account',
        role: 'ROLE_ADMIN',
    },
    {
        id: 1,
        name: 'Quản lí sản phẩm',
        key: 'product',
    },
    {
        id: 2,
        name: 'Quản lí đơn hàng',
        key: 'order',
    },
    {
        id: 3,
        name: 'Quản lí khuyến mãi',
        key: 'sale',
    },
    {
        id: 4,
        name: 'Quản lí danh mục',
        key: 'variaton',
    },
    {
        id: 5,
        name: 'Quản lí thể loại',
        key: 'category',
    },
    {
        id: 6,
        name: 'Quản lí bình luận',
        key: 'comment',
    },
];

export const SETTING_OPTIONS = [
    {
        id: 0,
        name: 'Hồ sơ',
        key: 'profile',
    },
    {
        id: 1,
        name: 'Địa chỉ',
        key: 'address',
    },
    {
        id: 2,
        name: 'Đơn hàng',
        key: 'order',
    },
];
