import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import cartStore from '../store/cartStore';

const AddToCartButton = ({ product }) => {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  if (!product || product.countInStock === 0) {
    return (
      <Button variant='secondary' disabled>
        Out of Stock
      </Button>
    );
  }

  const addToCartHandler = () => {
    cartStore.add(product, qty);
    navigate('/orders/cart');
  };

  return (
    <>
      {product.countInStock > 1 && (
        <Form.Group className='mb-3'>
          <Form.Label>Qty</Form.Label>
          <Form.Control
            as='select'
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          >
            {[...Array(product.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      )}
      <Button
        onClick={addToCartHandler}
        variant='primary'
        type='button'
      >
        Add to Cart
      </Button>
    </>
  );
};

export default AddToCartButton;
