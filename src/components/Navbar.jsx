import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'


export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        Shop<span style={styles.logoGray}>Easy</span>
      </Link>

      <ul style={styles.navLinks}>
        {[
          { to: '/',        label: 'Inicio'     },
          { to: '/catalog', label: 'Catálogo'   },
        ].map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end
              style={({ isActive }) => isActive ? styles.activeLink : styles.link}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <Link to="/cart" style={styles.cartBtn}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        Carrito
        {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
      </Link>
    </nav>
  )
}
