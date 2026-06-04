import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import {
  Checkout,
  OrderConfirmation,
  NotFound,
} from './pages/_stubs.jsx'

export default function App() {
  return (
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
          <Route path="*"                   element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  )
}