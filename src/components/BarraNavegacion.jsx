import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import '../styles/components/BarraNavegacion.css'

export default function BarraNavegacion() {
  const { totalItems } = useCart()
  const { usuarioActual, logout, estaCargando } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Shop<span className="navbar-logo-gray">Easy</span>
      </Link>

      <ul className="navbar-links">
        {[
          { to: '/',        label: 'Inicio'   },
          { to: '/catalog', label: 'Productos' },
          { to: '/transactions', label: 'Mis Compras' },
        ].map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end
              className={({ isActive }) => isActive ? 'navbar-link--active' : 'navbar-link'}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="navbar-right">
        {!estaCargando && usuarioActual && (
          <div className="navbar-user-section">
            <span className="navbar-user-name">
              {usuarioActual.user_metadata?.full_name || usuarioActual.email}
            </span>
          </div>
        )}

        <Link to="/cart" className="navbar-cart-btn">
          Carrito
          {totalItems > 0 && <span className="navbar-badge">{totalItems}</span>}
        </Link>

        {estaCargando ? (
          <span className="navbar-loading">...</span>
        ) : usuarioActual ? (
          <button onClick={handleLogout} className="navbar-logout-btn">
            Cerrar sesión
          </button>
        ) : (
          <Link to="/auth" className="navbar-login-btn">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  )
}
