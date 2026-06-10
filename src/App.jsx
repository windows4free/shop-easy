import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderConfirmation from './pages/OrderConfirmation.jsx'
import Auth from './pages/Auth.jsx'
import Transactions from './pages/Transactions.jsx'

const NotFound = () => <div style={{ padding: '40px 20px', textAlign: 'center' }}><h1>404 - Página no encontrada</h1></div>

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/"                   element={<Home />} />
            <Route path="/catalog"            element={<Catalog />} />
            <Route path="/product/:id"        element={<ProductDetail />} />
            <Route path="/cart"               element={<Cart />} />
            <Route path="/checkout"           element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/auth"               element={<Auth />} />
            <Route path="/transactions"       element={<Transactions />} />
            <Route path="*"                   element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  )
}