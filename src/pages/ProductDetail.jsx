import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import '../styles/pages/ProductDetail.css'

export default function ProductDetail() {
  const { id }      = useParams()
  const navigate    = useNavigate()
  const { addItem } = useCart()
  const product     = PRODUCTS.find(p => p.id === Number(id))

  const [qty,   setQty]   = useState(1)
  const [toast, setToast] = useState(false)

  if (!product) {
    return (
      <div className="detail-404">
        <p className="detail-404-num">404</p>
        <p className="detail-404-text">Producto no encontrado.</p>
        <Link to="/catalog" className="detail-404-link">← Volver al catálogo</Link>
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
    <div className="detail-page">
      <nav className="detail-breadcrumb">
        <Link to="/"        className="detail-bread-link">Inicio</Link>
        <span className="detail-bread-sep">/</span>
        <Link to="/catalog" className="detail-bread-link">Catálogo</Link>
        <span className="detail-bread-sep">/</span>
        <span style={{ color: '#0f0f0f' }}>{product.name}</span>
      </nav>

      <div className="detail-layout">
        <img src={`/src/images/${product.image}`} alt={product.name} />

        <div>
          <div className="detail-cat">{product.category}</div>
          <h1 className="detail-name">{product.name}</h1>
          <div className="detail-price">L{product.price.toFixed(2)}</div>
          <p className="detail-desc">{product.description}</p>

          <div className="detail-qty-row">
            <span className="detail-qty-label">Cantidad</span>
            <div className="detail-qty-control">
              <button className="detail-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="detail-qty-num">{qty}</span>
              <button className="detail-qty-btn detail-qty-btn--no-left" onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
            </div>
          </div>

          <div className="detail-actions">
            <button className="detail-btn-primary" onClick={handleBuyNow}>Comprar ahora</button>
            <button className="detail-btn-outline" onClick={handleAddToCart}>+ Agregar al carrito</button>
          </div>

          <div className="detail-meta">
            {[
              ['Disponibilidad', `${product.stock} unidades`],
              ['Categoría',      product.category],
              ['Envío',          'Gratis (simulado)'],
              ['Devoluciones',   '30 días'],
            ].map(([k, v]) => (
              <div key={k} className="detail-meta-row">
                <span className="detail-meta-key">{k}</span>
                <span className="detail-meta-val">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && <div className="detail-toast">✓ Agregado al carrito</div>}
    </div>
  )
}
