const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

const calculatePrices = (cartItems) => {
  const itemsPrice = cartItems.reduce((acc, item) => acc + (item.price * 100 * item.qty) / 100, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return {
    itemsPrice: addDecimals(itemsPrice),
    shippingPrice: addDecimals(shippingPrice),
    taxPrice: addDecimals(taxPrice),
    totalPrice: addDecimals(totalPrice),
  };
};

const cartStore = (() => {
  // Re-hidrata do localStorage no arranque
  const stored = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : {};

  let state = {
    cartItems: stored.cartItems || [],
    shippingAddress: stored.shippingAddress || {},
    paymentMethod: stored.paymentMethod || 'PayPal',
    ...calculatePrices(stored.cartItems || []),
  };

  let subscribers = [];

  const notify = () => subscribers.forEach((cb) => cb({ ...state }));

  const persist = () => localStorage.setItem('cart', JSON.stringify(state));

  // Limpa o carrinho quando o utilizador faz logout
  window.addEventListener('userChanged', (e) => {
    if (!e.detail.userInfo) {
      state = {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: 'PayPal',
        ...calculatePrices([]),
      };
      localStorage.removeItem('cart');
      notify();
    }
  });

  return {
    // Lê o estado atual
    getState: () => ({ ...state }),

    // Adiciona ou atualiza produto no carrinho
    add: (product, qty = 1) => {
      const { user, rating, numReviews, reviews, ...item } = product;
      const itemWithQty = { ...item, qty };
      const exists = state.cartItems.find((x) => x._id === item._id);

      state.cartItems = exists
        ? state.cartItems.map((x) => (x._id === item._id ? itemWithQty : x))
        : [...state.cartItems, itemWithQty];

      state = { ...state, ...calculatePrices(state.cartItems) };
      persist();
      notify();
    },

    // Remove produto do carrinho
    remove: (productId) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== productId);
      state = { ...state, ...calculatePrices(state.cartItems) };
      persist();
      notify();
    },

    // Guarda morada de envio
    saveShippingAddress: (address) => {
      state.shippingAddress = address;
      persist();
      notify();
    },

    // Guarda método de pagamento
    savePaymentMethod: (method) => {
      state.paymentMethod = method;
      persist();
      notify();
    },

    // Limpa o carrinho após encomenda
    clear: () => {
      state.cartItems = [];
      state = { ...state, ...calculatePrices([]) };
      persist();
      notify();
    },

    // Subscreve alterações — retorna função de cancelamento
    subscribe: (callback) => {
      subscribers.push(callback);
      return () => {
        subscribers = subscribers.filter((cb) => cb !== callback);
      };
    },
  };
})();

// Exposição temporária para demonstração do singleton
//window.__cartStore = cartStore;

export default cartStore;