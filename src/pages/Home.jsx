import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { PRODUCTS } from '../data/products.js'

const FEATURED = PRODUCTS.filter(p => p.featured)

const s = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' },

  hero: { padding: '5rem 0 3.5rem', maxWidth: '540px' },
  tag: {
    display: 'inline-block',
    border: '1px solid #e5e5e5',
    padding: '3px 10px',
    borderRadius: '2px',
    fontSize: '11px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#525252',
    marginBottom: '1.5rem',
  },
  h1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '3rem',
    lineHeight: 1.08,
    letterSpacing: '-0.03em',
    marginBottom: '1rem',
  },
  subtitle: { color: '#525252', fontSize: '15px', lineHeight: 1.7, marginBottom: '2rem' },
  cta: { display: 'flex', gap: '12px' },

  /* Stats */
  statsBar: {
    display: 'flex',
    gap: '3rem',
    padding: '1.75rem 0',
    borderTop: '1px solid #e5e5e5',
    borderBottom: '1px solid #e5e5e5',
    marginBottom: '3rem',
  },
  stat: { textAlign: 'left' },
  statNum: { fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', lineHeight: 1 },
  statLabel: { fontSize: '12px', color: '#a3a3a3', marginTop: '4px' },

  /* Section */
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '1.25rem',
  },
  sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.2rem' },
  sectionLink: { fontSize: '12px', color: '#a3a3a3' },

  /* Grid */
  grid: { display: 'grid', gridTemplate: 'repeat(1, 1fr)', gap: '1px', background: '#e5e5e5' },
  grid3: { gridTemplateColumns: 'repeat(3, 1fr)' },

  /* Card */
  card: { background: '#fafafa', padding: '1.5rem', cursor: 'pointer', transition: 'background 150ms' },
  cardImg: {
    width: '100%',
    aspectRatio: '1',
    background: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  cardCat: {
    fontSize: '10px',
    color: '#a3a3a3',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    marginBottom: '4px',
  },
  cardName: { fontSize: '13px', fontWeight: '500', marginBottom: '12px' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontFamily: "'Playfair Display', serif", fontSize: '0.95rem' },
  addBtn: {
    fontSize: '11px',
    border: '1px solid #e5e5e5',
    background: 'none',
    padding: '4px 12px',
    borderRadius: '2px',
    cursor: 'pointer',
    transition: 'all 150ms',
    fontFamily: "'DM Sans', sans-serif",
  },


  infoBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2.5rem',
    padding: '1.5rem 2rem',
    borderTop: '1px solid #e5e5e5',
    background: '#f5f5f5',
    fontSize: '12px',
    color: '#525252',
    flexWrap: 'wrap',
    marginTop: '3rem',
  },
}

export default function Home() {
  const { addItem } = useCart()

  return (
    <>
      <div style={s.page}>
        {/* Hero */}
        <section style={s.hero}>
          <span style={s.tag}>Prototipo académico · Sala 14</span>
          <h1 style={s.h1}>Tu tienda,<br />sin complicaciones.</h1>
          <div style={s.cta}>
            <Link to="/catalog" className="btn btn-primary">Ver catálogo</Link>
            <Link to="/cart"    className="btn btn-outline">Mi carrito</Link>
          </div>
        </section>


        {/* Featured products */}
        <div style={s.sectionHeader}>
          <span style={s.sectionTitle}>Destacados</span>
          <Link to="/catalog" style={s.sectionLink}>Ver todos →</Link>
        </div>

        <div style={{ ...s.grid, ...s.grid3 }}>
          {FEATURED.map(product => (
            <div
              key={product.id}
              style={s.card}
              onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
              onMouseLeave={e => e.currentTarget.style.background = '#fafafa'}
            >
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={s.cardImg}>{product.emoji}</div>
                <div style={s.cardCat}>{product.category}</div>
                <div style={s.cardName}>{product.name}</div>
              </Link>
              <div style={s.cardFooter}>
                <span style={s.price}>${product.price.toFixed(2)}</span>
                <button
                  style={s.addBtn}
                  onClick={() => addItem(product)}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#0f0f0f'
                    e.currentTarget.style.color = '#fafafa'
                    e.currentTarget.style.borderColor = '#0f0f0f'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'none'
                    e.currentTarget.style.color = 'inherit'
                    e.currentTarget.style.borderColor = '#e5e5e5'
                  }}
                >
                  + Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}
