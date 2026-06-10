import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../data/supabase.js'
import { useCart } from '../context/CartContext.jsx'
import '../styles/pages/DetalleProducto.css'

export default function DetalleProducto() {
  const { id }      = useParams()
  const navigate    = useNavigate()
  const { agregarProducto } = useCart()

  const [producto, setProducto] = useState(null)
  const [estaCargando, setEstaCargando] = useState(true)
  const [cantidad,     setCantidad]     = useState(1)
  const [mostrarToast,   setMostrarToast]   = useState(false)

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('id', Number(id))
      .single()
      .then(({ data, error }) => {
        if (!error) setProducto(data)
        setEstaCargando(false)
      })
  }, [id])

  if (estaCargando) {
    return (
      <div className="detail-page">
        <p style={{ color: '#a3a3a3', fontSize: '13px' }}>Cargando producto...</p>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="detail-404">
        <p className="detail-404-num">404</p>
        <p className="detail-404-text">Producto no encontrado.</p>
        <Link to="/catalog" className="detail-404-link">← Volver al catálogo</Link>
      </div>
    )
  }

  const manejarAgregarAlCarrito = () => {
    for (let i = 0; i < cantidad; i++) agregarProducto(producto)
    setMostrarToast(true)
    setTimeout(() => setMostrarToast(false), 2000)
  }

  const manejarComprarAhora = () => {
    for (let i = 0; i < cantidad; i++) agregarProducto(producto)
    navigate('/cart')
  }

  return (
    <div className="detail-page">
      <nav className="detail-breadcrumb">
        <Link to="/"        className="detail-bread-link">Inicio</Link>
        <span className="detail-bread-sep">/</span>
        <Link to="/catalog" className="detail-bread-link">Catálogo</Link>
        <span className="detail-bread-sep">/</span>
        <span style={{ color: '#0f0f0f' }}>{producto.name}</span>
      </nav>

      <div className="detail-layout">
        <img
          src={`/images/${producto.image}`}
          alt={producto.name}
          className="detail-img"
          loading="eager"
          decoding="async"
          width={800}
          height={800}
        />

        <div>
          <div className="detail-cat">{producto.category}</div>
          <h1 className="detail-name">{producto.name}</h1>
          <div className="detail-price">L{producto.price.toFixed(2)}</div>
          <p className="detail-desc">{producto.description}</p>

          <div className="detail-qty-row">
            <span className="detail-qty-label">Cantidad</span>
            <div className="detail-qty-control">
              <button className="detail-qty-btn" onClick={() => setCantidad(q => Math.max(1, q - 1))}>−</button>
              <span className="detail-qty-num">{cantidad}</span>
              <button className="detail-qty-btn detail-qty-btn--no-left" onClick={() => setCantidad(q => Math.min(producto.stock, q + 1))}>+</button>
            </div>
          </div>

          <div className="detail-actions">
            <button className="detail-btn-primary" onClick={manejarComprarAhora}>Comprar ahora</button>
            <button className="detail-btn-outline" onClick={manejarAgregarAlCarrito}>+ Agregar al carrito</button>
          </div>

          <div className="detail-meta">
            {[
              ['Disponibilidad', `${producto.stock} unidades`],
              ['Categoría',      producto.category],
              ['Envío',          'Gratis'],
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

      {mostrarToast && <div className="detail-toast">✓ Agregado al carrito</div>}
    </div>
  )
}
