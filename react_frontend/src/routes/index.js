import Home from '../components/home';
import Product from '../components/product';
import Cart from '../components/cart';
import ThankYou from '../components/thankyou';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/cart',
        exact: true,
        component: Cart
    },
    {
        path: '/products',
        exact: true,
        component: Product
    },
    {
        path: '/thankyou',
        exact: true,
        component: ThankYou
    }
];

export default routes;
