import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import OrdersApp from './OrdersApp';

// Dev-only: seed a mock user so PrivateRoute passes in standalone mode
if (!localStorage.getItem('userInfo')) {
  localStorage.setItem('userInfo', JSON.stringify({
    _id: 'dev-user',
    name: 'Dev User',
    email: 'dev@dev.com',
    isAdmin: true,
    token: 'dev-token',
  }));
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter basename='/orders'>
      <OrdersApp />
    </BrowserRouter>
  </StrictMode>
);
