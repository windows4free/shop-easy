import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    height: '56px',
    background: '#fafafa',
    borderBottom: '1px solid #e5e5e5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.35rem',
    letterSpacing: '-0.02em',
    color: '#0f0f0f',
  },
  logoGray: { color: '#a3a3a3' },
  navLinks: {
    display: 'flex',
    gap: '1.75rem',
    listStyle: 'none',
  },
  link: {
    fontSize: '13px',
    color: '#525252',
    transition: 'color 150ms',
    textDecoration: 'none',
  },
  activeLink: {
    fontSize: '13px',
    color: '#0f0f0f',
    fontWeight: '500',
    textDecoration: 'none',
  },
  cartBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: '#0f0f0f',
    color: '#fafafa',
    border: 'none',
    padding: '6px 16px',
    borderRadius: '2px',
    fontSize: '13px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'opacity 150ms',
  },
  badge: {
    background: '#fafafa',
    color: '#0f0f0f',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: '700',
  },
}

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
