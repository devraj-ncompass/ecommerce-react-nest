import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Home/Navbar';


const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:3000/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderDetails(response.data.data.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) return <p>Loading...</p>;

  return (
    <>
      <Navbar page="orders" />
      <div style={{ gap: '20px', marginTop: '15px' }}>
        <h2>Order Number: {orderDetails.orderNumber}</h2>
        <h3>Status: {orderDetails.status}</h3>
        <p>Total Amount: Rs.{orderDetails.totalAmount}</p>
        <p>Payment Method: {orderDetails.paymentMethod}</p>
        <p>Ordered on: {orderDetails.createdAt}</p>
      </div>
    </>
  );
};

export default OrderDetails;

