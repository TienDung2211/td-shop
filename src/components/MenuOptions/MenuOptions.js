import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faArrowRightFromBracket,
    faLocationDot,
    faFileInvoice,
    faGear,
    faUserTie,
    faCartShopping,
    faLaptop,
    faComment,
    faFolder,
    faAnglesDown,
    faDiagramProject,
    faFontAwesome,
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
        icon: <FontAwesomeIcon icon={faUser} />,
        name: 'Quản lí tài khoản',
        key: 'account',
        role: 'ROLE_ADMIN',
    },
    {
        id: 1,
        icon: <FontAwesomeIcon icon={faLaptop} />,
        name: 'Quản lí sản phẩm',
        key: 'product',
    },
    {
        id: 2,
        icon: <FontAwesomeIcon icon={faFileInvoice} />,
        name: 'Quản lí đơn hàng',
        key: 'order',
    },
    {
        id: 3,
        icon: <FontAwesomeIcon icon={faAnglesDown} />,
        name: 'Quản lí khuyến mãi',
        key: 'sale',
    },
    {
        id: 4,
        icon: <FontAwesomeIcon icon={faDiagramProject} />,
        name: 'Quản lí danh mục',
        key: 'variaton',
    },
    {
        id: 5,
        icon: <FontAwesomeIcon icon={faFontAwesome} />,
        name: 'Quản lí thương hiệu',
        key: 'brand',
    },
    {
        id: 6,
        icon: <FontAwesomeIcon icon={faFolder} />,
        name: 'Quản lí thể loại',
        key: 'category',
    },
    {
        id: 7,
        icon: <FontAwesomeIcon icon={faComment} />,
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
