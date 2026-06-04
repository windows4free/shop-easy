import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem', textAlign: 'center' }}>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '4rem', color: '#e5e5e5' }}>404</p>
      <p style={{ color: '#525252', marginBottom: '1.5rem' }}>Página no encontrada.</p>
      <Link to="/" style={{ fontSize: '13px', borderBottom: '1px solid #e5e5e5', paddingBottom: '2px' }}>
        ← Volver al inicio
      </Link>
    </div>
  )
}