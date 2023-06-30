// Layout
import SettingsLayout from '~/layouts/SettingLayout';
import ManagerLayout from '~/layouts/ManagerLayout';
import SliderFullWidthLayout from '~/layouts/SliderFullWidthLayout';

// Pages
import Home from '~/pages/Home';
import SortProduct from '~/pages/SortProduct';
import DetailProduct from '~/pages/DetailProduct';
import Cart from '~/pages/Cart';
import ResetPassword from '~/pages/ResetPassword';
import ActiveAccount from '~/pages/ActiveAccount/ActiveAccount';
import Payment from '~/pages/Payment/Payment';
import MomoPayment from '~/pages/Payment/MomoPayment/MomoPayment';
import PaymentFailure from '~/pages/Payment/Failure';
import PaymentSucess from '~/pages/Payment/Success';
import TestData from '~/pages/TestData/TestData';

// Setting
import Profile from '~/pages/Settings/Profile';
import Address from '~/pages/Settings/Address';
import Order from '~/pages/Settings/Order';
import Review from '~/pages/Settings/Review/Review';

// Manager
import SaleM from '~/pages/Manager/SaleM';
import OrderM from '~/pages/Manager/OrderM';
import AccountM from '~/pages/Manager/AccountM';
import ProductM from '~/pages/Manager/ProductM';
import CommentM from '~/pages/Manager/CommentM';
import CategoryM from '~/pages/Manager/CategoryM';
import BrandM from '~/pages/Manager/BrandM/BrandM';
import VariationsM from '~/pages/Manager/VariationsM';
import Dashboard from '~/pages/Manager/Dashboard/Dashboard';
import StatisticM from '~/pages/Manager/StatisticM/StatisticM';
import AttributeM from '~/pages/Manager/AttributeM/AttributeM';

const publicRoutes = [
    { path: '/', component: Home, layout: SliderFullWidthLayout },
    { path: '/cart', component: Cart },
    { path: '/sort/:mId/:cId', component: SortProduct },
    { path: '/payment', component: Payment },
    { path: '/payment/momo', component: MomoPayment },
    { path: '/payment/sucess', component: PaymentSucess },
    { path: '/payment/failure', component: PaymentFailure },
    { path: '/reset-password', component: ResetPassword, layout: null },
    { path: '/resend-token', component: ActiveAccount, layout: null },
    { path: '/detail-product/:id', component: DetailProduct },
    { path: '/setting/profile', component: Profile, layout: SettingsLayout },
    { path: '/setting/address', component: Address, layout: SettingsLayout },
    { path: '/setting/order', component: Order, layout: SettingsLayout },
    { path: '/setting/review', component: Review, layout: SettingsLayout },
    { path: '/manager/account', component: AccountM, layout: ManagerLayout },
    { path: '/manager/variaton', component: VariationsM, layout: ManagerLayout },
    { path: '/manager/product', component: ProductM, layout: ManagerLayout },
    { path: '/manager/sale', component: SaleM, layout: ManagerLayout },
    { path: '/manager/comment', component: CommentM, layout: ManagerLayout },
    { path: '/manager/order', component: OrderM, layout: ManagerLayout },
    { path: '/manager/category', component: CategoryM, layout: ManagerLayout },
    { path: '/manager/brand', component: BrandM, layout: ManagerLayout },
    { path: '/manager/dashboard', component: Dashboard, layout: ManagerLayout },
    { path: '/manager/statistic', component: StatisticM, layout: ManagerLayout },
    { path: '/manager/attribute', component: AttributeM, layout: ManagerLayout },
    { path: '/test', component: TestData, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
