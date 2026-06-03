import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const s = {
  card: {
    background: '#fafafa',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: 'background 150ms',
  },
  imgBox: {
    width: '100%',
    aspectRatio: '1',
    background: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    marginBottom: '1rem',
    borderRadius: '2px',
    textDecoration: 'none',
  },
  cat: {
    fontSize: '10px',
    color: '#a3a3a3',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    marginBottom: '3px',
  },
  name: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#0f0f0f',
    marginBottom: '6px',
    textDecoration: 'none',
    display: 'block',
  },
  desc: {
    fontSize: '12px',
    color: '#a3a3a3',
    lineHeight: 1.5,
    marginBottom: '1rem',
    flexGrow: 1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  price: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1rem',
  },
  addBtn: {
    fontSize: '11px',
    border: '1px solid #e5e5e5',
    background: 'none',
    padding: '5px 12px',
    borderRadius: '2px',
    cursor: 'pointer',
    transition: 'all 150ms',
    fontFamily: "'DM Sans', sans-serif",
    color: '#525252',
  },
  addBtnHover: {
    fontSize: '11px',
    border: '1px solid #0f0f0f',
    background: '#0f0f0f',
    padding: '5px 12px',
    borderRadius: '2px',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    color: '#fafafa',
  },
  added: {
    fontSize: '11px',
    border: '1px solid #e5e5e5',
    background: '#f5f5f5',
    padding: '5px 12px',
    borderRadius: '2px',
    color: '#a3a3a3',
    fontFamily: "'DM Sans', sans-serif",
  },
  stock: { fontSize: '10px', color: '#a3a3a3', marginTop: '6px' },
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [hover, setHover]         = useState(false)
  const [added, setAdded]         = useState(false)
  const [cardHover, setCardHover] = useState(false)

  function handleAdd(e) {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div
      style={{ ...s.card, background: cardHover ? '#f5f5f5' : '#fafafa' }}
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
    >
      <Link to={`/product/${product.id}`} style={s.imgBox}>
        {product.emoji}
      </Link>

      <div style={s.cat}>{product.category}</div>

      <Link to={`/product/${product.id}`} style={s.name}>
        {product.name}
      </Link>

      <p style={s.desc}>{product.description}</p>

      <div style={s.footer}>
        <span style={s.price}>${product.price.toFixed(2)}</span>

        {added
          ? <span style={s.added}>✓ Agregado</span>
          : (
            <button
              style={hover ? s.addBtnHover : s.addBtn}
              onClick={handleAdd}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              + Carrito
            </button>
          )
        }
      </div>
      <div style={s.stock}>Stock: {product.stock} uds.</div>
    </div>
  )
}
