import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HomePage from '../Forum/HomePage'
import OrdersPage from '../Forum/MyOrdersPage'
import OrderDetails from '../Forum/OrderDetails'

const Index = () => {
       return (
              <Router>
                     <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/orders' element={<OrdersPage />} />
                            <Route path='/orders/:orderId' element={<OrderDetails />} />
                            <Route path='/login' />
                     </Routes>
              </Router>
       )
}
export default Index
