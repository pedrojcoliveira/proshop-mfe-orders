// Dev-only: seed mock data for standalone checkout testing
// Must run before bootstrap imports the store (which reads localStorage on init)
if (!localStorage.getItem('userInfo')) {
  localStorage.setItem('userInfo', JSON.stringify({
    _id: 'dev-user',
    name: 'Dev User',
    email: 'dev@dev.com',
    isAdmin: false,
    token: 'dev-token',
  }));
}

if (!localStorage.getItem('cart')) {
  localStorage.setItem('cart', JSON.stringify({
    cartItems: [
      {
        _id: '64f5a6d510b3b4f817548ade',
        name: 'Airpods Wireless Bluetooth Headphones',
        image: '/images/airpods.jpg',
        price: 89.99,
        countInStock: 10,
        qty: 2,
      },
    ],
    shippingAddress: {},
    paymentMethod: 'PayPal',
  }));
}

import('./bootstrap');
