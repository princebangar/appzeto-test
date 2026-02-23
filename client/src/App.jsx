import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';

import VendorProducts from './pages/vendor/VendorProducts';
import AddProduct from './pages/vendor/AddProduct';
import EditProduct from './pages/vendor/EditProduct';

import VendorApproval from './pages/admin/VendorApproval';
import RevenueDashboard from './pages/admin/RevenueDashboard';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products/:id" element={<ProductDetail />} />

            <Route path="/cart" element={
              <ProtectedRoute roles={['buyer']}><Cart /></ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute roles={['buyer']}><Checkout /></ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute roles={['buyer']}><MyOrders /></ProtectedRoute>
            } />

            <Route path="/vendor/products" element={
              <ProtectedRoute roles={['vendor']}><VendorProducts /></ProtectedRoute>
            } />
            <Route path="/vendor/products/add" element={
              <ProtectedRoute roles={['vendor']}><AddProduct /></ProtectedRoute>
            } />
            <Route path="/vendor/products/edit/:id" element={
              <ProtectedRoute roles={['vendor']}><EditProduct /></ProtectedRoute>
            } />

            <Route path="/admin/vendors" element={
              <ProtectedRoute roles={['admin']}><VendorApproval /></ProtectedRoute>
            } />
            <Route path="/admin/stats" element={
              <ProtectedRoute roles={['admin']}><RevenueDashboard /></ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
