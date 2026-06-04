import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import '../styles/components/Navbar.css'

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Shop<span className="navbar-logo-gray">Easy</span>
      </Link>

      <ul className="navbar-links">
        {[
          { to: '/',        label: 'Inicio'   },
          { to: '/catalog', label: 'Catálogo' },
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

      <Link to="/cart" className="navbar-cart-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        Carrito
        {totalItems > 0 && <span className="navbar-badge">{totalItems}</span>}
      </Link>
    </nav>
  )
}
