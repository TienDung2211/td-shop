// Layout
import SettingsLayout from '~/layouts/SettingLayout';
import ManagerLayout from '~/layouts/ManagerLayout';

// Pages

import Home from '~/pages/Home';
import SortProduct from '~/pages/SortProduct';
import DetailProduct from '~/pages/DetailProduct';
import Cart from '~/pages/Cart';
import TestData from '~/pages/TestData/TestData';
import ResetPassword from '~/pages/ResetPassword';

// Setting
import Profile from '~/pages/Settings/Profile';
import Address from '~/pages/Settings/Address';
import Order from '~/pages/Settings/Order';

// Manager
import SaleM from '~/pages/Manager/SaleM';
import OrderM from '~/pages/Manager/OrderM';
import AccountM from '~/pages/Manager/AccountM';
import ProductM from '~/pages/Manager/ProductM';
import CommentM from '~/pages/Manager/CommentM';
import CategoryM from '~/pages/Manager/CategoryM';
import VariationsM from '~/pages/Manager/VariationsM';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/sort', component: SortProduct },
    { path: '/reset-password', component: ResetPassword, layout: null },
    { path: '/detail-product/:brandId/:id', component: DetailProduct },
    { path: '/setting/profile', component: Profile, layout: SettingsLayout },
    { path: '/setting/address', component: Address, layout: SettingsLayout },
    { path: '/setting/order', component: Order, layout: SettingsLayout },
    { path: '/manager/account', component: AccountM, layout: ManagerLayout },
    { path: '/manager/variaton', component: VariationsM, layout: ManagerLayout },
    { path: '/manager/product', component: ProductM, layout: ManagerLayout },
    { path: '/manager/sale', component: SaleM, layout: ManagerLayout },
    { path: '/manager/comment', component: CommentM, layout: ManagerLayout },
    { path: '/manager/order', component: OrderM, layout: ManagerLayout },
    { path: '/manager/category', component: CategoryM, layout: ManagerLayout },
    { path: '/test', component: TestData, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
