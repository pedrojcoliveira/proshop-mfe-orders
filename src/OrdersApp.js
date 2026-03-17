import { Provider } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ToastContainer } from 'react-toastify';
import store from './store';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

const OrdersApp = () => {
  return (
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <ToastContainer />
        <Routes>
          <Route index element={<Navigate to='cart' replace />} />
          <Route path='cart' element={<CartScreen />} />
          <Route path='' element={<PrivateRoute />}>
            <Route path='shipping' element={<ShippingScreen />} />
            <Route path='payment' element={<PaymentScreen />} />
            <Route path='placeorder' element={<PlaceOrderScreen />} />
            <Route path='order/:id' element={<OrderScreen />} />
          </Route>
        </Routes>
      </PayPalScriptProvider>
    </Provider>
  );
};

export default OrdersApp;
