import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import '../styles/components/Navbar.css'

export default function Navbar() {
  const { totalItems } = useCart()
  const { currentUser, logout, isLoading } = useAuth()
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
          { to: '/catalog', label: 'Catálogo' },
          { to: '/transactions', label: 'Tus Compras' },
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
        {!isLoading && currentUser && (
          <div className="navbar-user-section">
            <span className="navbar-user-name">
              {currentUser.user_metadata?.full_name || currentUser.email}
            </span>
          </div>
        )}

        <Link to="/cart" className="navbar-cart-btn">
          Carrito
          {totalItems > 0 && <span className="navbar-badge">{totalItems}</span>}
        </Link>

        {isLoading ? (
          <span className="navbar-loading">...</span>
        ) : currentUser ? (
          <button onClick={handleLogout} className="navbar-logout-btn">
            Logout
          </button>
        ) : (
          <Link to="/auth" className="navbar-login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
