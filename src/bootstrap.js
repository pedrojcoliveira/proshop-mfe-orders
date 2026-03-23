import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import OrdersApp from './OrdersApp';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter basename='/orders'>
      <OrdersApp />
    </BrowserRouter>
  </StrictMode>
);
