import { Link } from 'react-router-dom'

const stub = (title, next) => function StubPage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem' }}>{title}</h1>
      <p style={{ color: '#a3a3a3', marginTop: '0.5rem', fontSize: '14px' }}>{next}</p>
    </div>
  )
}

export const Checkout          = stub('Checkout',              'Próximo commit — Paso 4')
export const OrderConfirmation = stub('Confirmación de orden', 'Próximo commit — Paso 5')

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