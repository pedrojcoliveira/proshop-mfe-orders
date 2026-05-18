import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';
import cartStore from '../store/cartStore';

const CartBadge = ({ onClick }) => {
  const [count, setCount] = useState(
    () => cartStore.getState().cartItems.reduce((acc, item) => acc + item.qty, 0)
  );

  useEffect(() => {
    const unsubscribe = cartStore.subscribe((state) => {
      setCount(state.cartItems.reduce((acc, item) => acc + item.qty, 0));
    });
    return unsubscribe;
  }, []);

  return (
    <span
      onClick={onClick}
      style={{ cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '4px' }}
    >
      <FaShoppingCart />
      Cart
      {count > 0 && (
        <Badge pill bg="success" style={{ marginLeft: '5px' }}>
          {count}
        </Badge>
      )}
    </span>
  );
};

export default CartBadge;
