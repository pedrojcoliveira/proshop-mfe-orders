import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import cartStore from '../store/cartStore';

const CartScreen = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => cartStore.getState().cartItems);
  const [outOfStockIds, setOutOfStockIds] = useState([]);

  useEffect(() => {
    // Subscreve o CartStore — atualiza quando o carrinho muda
    const unsubscribe = cartStore.subscribe((state) => {
      setCartItems(state.cartItems);
    });

    const handleStockEmpty = (e) => {
      setOutOfStockIds((prev) => [...prev, e.detail.productId]);
    };
    if (window.__eventBus) window.__eventBus.subscribe('stockEmpty', handleStockEmpty);

    return () => {
      unsubscribe();
      if (window.__eventBus) window.__eventBus.unsubscribe('stockEmpty', handleStockEmpty);
    };
  }, []);

  const hasOutOfStockItems = cartItems.some((item) => outOfStockIds.includes(item._id));

  const checkoutHandler = () => {
    navigate('/user/login?redirect=/orders/shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/catalog'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/catalog/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => cartStore.add(item, Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => cartStore.remove(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            {hasOutOfStockItems && (
              <ListGroup.Item>
                <Message variant='danger'>
                  Some product in your cart is out of stock. Please remove it before proceeding to checkout.
                </Message>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0 || hasOutOfStockItems}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
