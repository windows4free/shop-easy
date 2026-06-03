import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

const s = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '2rem 2rem 4rem' },
  breadcrumb: {
    display: 'flex', gap: '8px', alignItems: 'center',
    fontSize: '12px', color: '#a3a3a3', marginBottom: '2.5rem',
  },
  breadLink: { color: '#a3a3a3', textDecoration: 'none' },
  breadSep:  { color: '#e5e5e5' },
  layout: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: '4rem', alignItems: 'start',
  },
  imgBox: {
    aspectRatio: '1', background: '#f5f5f5', borderRadius: '2px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem',
  },
  cat: {
    fontSize: '11px', color: '#a3a3a3', textTransform: 'uppercase',
    letterSpacing: '0.08em', marginBottom: '0.5rem',
  },
  name: {
    fontFamily: "'Playfair Display', serif", fontSize: '1.8rem',
    letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1rem',
  },
  price: { fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', marginBottom: '1.25rem' },
  desc: {
    fontSize: '14px', color: '#525252', lineHeight: 1.7, marginBottom: '1.75rem',
    borderTop: '1px solid #e5e5e5', paddingTop: '1.25rem',
  },
  qtyRow: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' },
  qtyLabel: { fontSize: '12px', color: '#a3a3a3' },
  qtyControl: { display: 'flex', alignItems: 'center' },
  qtyBtn: {
    width: '32px', height: '32px', border: '1px solid #e5e5e5',
    background: 'none', fontSize: '16px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'DM Sans', sans-serif", transition: 'background 150ms',
  },
  qtyNum: {
    width: '40px', height: '32px', border: '1px solid #e5e5e5',
    borderLeft: 'none', borderRight: 'none',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px',
  },
  actions: { display: 'flex', flexDirection: 'column', gap: '8px' },
  btnPrimary: {
    width: '100%', padding: '12px', background: '#0f0f0f', color: '#fafafa',
    border: '1px solid #0f0f0f', borderRadius: '2px', fontSize: '13px',
    cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'opacity 150ms',
  },
  btnOutline: {
    width: '100%', padding: '12px', background: 'transparent', color: '#0f0f0f',
    border: '1px solid #e5e5e5', borderRadius: '2px', fontSize: '13px',
    cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'border-color 150ms',
  },
  meta: {
    marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e5e5',
    display: 'flex', flexDirection: 'column', gap: '6px',
  },
  metaRow: { display: 'flex', justifyContent: 'space-between', fontSize: '12px' },
  metaKey: { color: '#a3a3a3' },
  metaVal: { color: '#0f0f0f' },
  toast: {
    position: 'fixed', bottom: '2rem', right: '2rem',
    background: '#0f0f0f', color: '#fafafa',
    padding: '10px 20px', borderRadius: '2px', fontSize: '13px', zIndex: 999,
  },
}

export default function ProductDetail() {
  const { id }      = useParams()
  const navigate    = useNavigate()
  const { addItem } = useCart()
  const product     = PRODUCTS.find(p => p.id === Number(id))

  const [qty,   setQty]   = useState(1)
  const [toast, setToast] = useState(false)

  if (!product) {
    return (
      <div style={{ ...s.page, textAlign: 'center', padding: '5rem 0' }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: '#e5e5e5' }}>404</p>
        <p style={{ color: '#525252', marginBottom: '1.5rem' }}>Producto no encontrado.</p>
        <Link to="/catalog" style={{ fontSize: '13px', borderBottom: '1px solid #e5e5e5', paddingBottom: '2px' }}>
          ← Volver al catálogo
        </Link>
      </div>
    )
  }

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) addItem(product)
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  function handleBuyNow() {
    for (let i = 0; i < qty; i++) addItem(product)
    navigate('/cart')
  }

  return (
    <div style={s.page}>
      <nav style={s.breadcrumb}>
        <Link to="/"        style={s.breadLink}>Inicio</Link>
        <span style={s.breadSep}>/</span>
        <Link to="/catalog" style={s.breadLink}>Catálogo</Link>
        <span style={s.breadSep}>/</span>
        <span style={{ color: '#0f0f0f' }}>{product.name}</span>
      </nav>

      <div style={s.layout}>
        <div style={s.imgBox}>{product.emoji}</div>

        <div>
          <div style={s.cat}>{product.category}</div>
          <h1 style={s.name}>{product.name}</h1>
          <div style={s.price}>${product.price.toFixed(2)}</div>
          <p style={s.desc}>{product.description}</p>

          <div style={s.qtyRow}>
            <span style={s.qtyLabel}>Cantidad</span>
            <div style={s.qtyControl}>
              <button style={s.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span style={s.qtyNum}>{qty}</span>
              <button style={{ ...s.qtyBtn, borderLeft: 'none' }} onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
            </div>
          </div>

          <div style={s.actions}>
            <button style={s.btnPrimary} onClick={handleBuyNow}>Comprar ahora</button>
            <button style={s.btnOutline} onClick={handleAddToCart}>+ Agregar al carrito</button>
          </div>

          <div style={s.meta}>
            {[
              ['Disponibilidad', `${product.stock} unidades`],
              ['Categoría',      product.category],
              ['Envío',          'Gratis (simulado)'],
              ['Devoluciones',   '30 días'],
            ].map(([k, v]) => (
              <div key={k} style={s.metaRow}>
                <span style={s.metaKey}>{k}</span>
                <span style={s.metaVal}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && <div style={s.toast}>✓ Agregado al carrito</div>}
    </div>
  )
}
