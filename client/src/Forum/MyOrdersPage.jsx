import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Navbar from '../Components/Home/Navbar';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar page="orders" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '15px' }}>
        {orders.map((order) => (
          <div key={order.id} style={{ border: '1px solid #ccc', padding: '20px' }}>
            <h3>Order #{order.orderNumber}</h3>
            <p>Status: {order.status}</p>
            <p>Total Amount: ${order.totalAmount}</p>
            <Link to={`/orders/${order.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrdersPage;

