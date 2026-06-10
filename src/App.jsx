import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import BarraNavegacion from './components/BarraNavegacion.jsx'
import PiePagina from './components/PiePagina.jsx'
import Inicio from './pages/Inicio.jsx'
import Productos from './pages/Productos.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'
import Carrito from './pages/Carrito.jsx'
import Pago from './pages/Pago.jsx'
import ConfirmacionOrden from './pages/ConfirmacionOrden.jsx'
import Auth from './pages/Auth.jsx'
import HistorialCompras from './pages/HistorialCompras.jsx'

const NotFound = () => <div style={{ padding: '40px 20px', textAlign: 'center' }}><h1>404 - Página no encontrada</h1></div>

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BarraNavegacion />
        <main>
          <Routes>
            <Route path="/"                   element={<Inicio />} />
            <Route path="/catalog"            element={<Productos />} />
            <Route path="/product/:id"        element={<DetalleProducto />} />
            <Route path="/cart"               element={<Carrito />} />
            <Route path="/checkout"           element={<Pago />} />
            <Route path="/order-confirmation" element={<ConfirmacionOrden />} />
            <Route path="/auth"               element={<Auth />} />
            <Route path="/transactions"       element={<HistorialCompras />} />
            <Route path="*"                   element={<NotFound />} />
          </Routes>
        </main>
        <PiePagina />
      </CartProvider>
    </AuthProvider>
  )
}