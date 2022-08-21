// import configs from '~/config';
// Layout
// Page
import Home from '~/pages/Home';
import SortProduct from '~/pages/SortProduct';
import Product from '~/pages/Product';
import Cart from '~/pages/Cart';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/sort', component: SortProduct },
    { path: '/product', component: Product },
    { path: '/cart', component: Cart },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
