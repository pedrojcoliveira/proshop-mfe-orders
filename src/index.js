// Dev-only: seed a mock user so PrivateRoute passes in standalone mode
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

import('./bootstrap');
