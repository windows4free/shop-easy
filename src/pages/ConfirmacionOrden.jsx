import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../data/supabase.js'
import '../styles/pages/Confirmacion.css'

const ETIQUETAS_PAGO = {
  card:   'Tarjeta de crédito/débito',
  paypal: 'PayPal',
  cash:   'Pagar en efectivo',
}

async function guardarOrdenEnSupabase(order) {
  try {
    await supabase.from('orders').insert([{
      id:            order.id,
      items:         order.items,
      shipping:      order.shipping,
      payment:       order.payment,
      subtotal:      order.subtotal,
      shipping_cost: order.shippingCost,
      tax:           order.tax,
      total:         order.total,
      user_id:       order.user_id,
    }])
  } catch (err) {
    console.warn('No se pudo guardar la orden:', err.message)
  }
}

export default function OrderConfirmation() {
  const [orden, setOrden] = useState(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('shopeasy_order')
    if (!raw) return
    const parsed = JSON.parse(raw)
    setOrden(parsed)
    sessionStorage.removeItem('shopeasy_order')
    guardarOrdenEnSupabase(parsed)
  }, [])

  if (!orden) {
    return (
      <div className="order-page">
        <div className="order-empty">
          <h2 className="order-empty-title">No hay orden para mostrar</h2>
          <p className="order-empty-text">Parece que llegaste aquí sin completar una compra.</p>
          <Link to="/catalog" className="btn btn-primary">Ver catálogo</Link>
        </div>
      </div>
    )
  }

  const fecha = new Date(orden.date).toLocaleDateString('es-HN', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="order-page">
      <div className="order-hero">
        <div className="order-icon-circle">✓</div>
        <h1 className="order-title">¡Orden confirmada!</h1>
        <p className="order-subtitle">Gracias por tu compra. Tu pedido ha sido procesado exitosamente.</p>
        <span className="order-id">{orden.id}</span>
      </div>

      <div className="order-layout">
        <div>
          <div className="order-section">
            <div className="order-section-header">Productos ordenados</div>
            <div className="order-section-body">
              {orden.items.map(({ product, quantity }, i) => (
                <div
                  key={product.id}
                  className={`order-item-row${i === orden.items.length - 1 ? ' order-item-row--last' : ''}`}
                >
                  <img
                    src={`/images/${product.image}`}
                    alt={product.name}
                    style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '2px', background: '#f5f5f5' }}
                  />
                  <div className="order-item-info">
                    <div className="order-item-name">{product.name}</div>
                    <div className="order-item-cat">{product.category}</div>
                  </div>
                  <span className="order-item-qty">×{quantity}</span>
                  <span className="order-item-price">L{(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-section">
            <div className="order-section-header">Información de envío</div>
            <div className="order-section-body">
              {[
                ['Destinatario', `${orden.shipping.firstName} ${orden.shipping.lastName}`],
                ['Correo',        orden.shipping.email],
                ['Dirección',     orden.shipping.address],
                ['Ciudad',        orden.shipping.city],
                ['Código postal', orden.shipping.zip],
                ['País',          orden.shipping.country],
              ].map(([k, v]) => (
                <div key={k} className="order-info-row">
                  <span className="order-info-key">{k}</span>
                  <span className="order-info-val">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-section">
            <div className="order-section-header">Método de pago</div>
            <div className="order-section-body">
              {[
                ['Método', ETIQUETAS_PAGO[orden.payment.method] || orden.payment.method],
                ['Estado', '✓ Pago exitoso'],
                ['Fecha',  fecha],
                ...(orden.payment.method === 'card'
                  ? [['Tarjeta', `**** **** **** ${orden.payment.last4}`]]
                  : []),
              ].map(([k, v]) => (
                <div key={k} className="order-info-row">
                  <span className="order-info-key">{k}</span>
                  <span className="order-info-val">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="order-summary-card">
          <div className="order-summary-header">Resumen de la orden</div>
          <div className="order-summary-body">
            <div className="order-summary-row"><span>Subtotal</span><span>L{orden.subtotal.toFixed(2)}</span></div>
            <div className="order-summary-row"><span>Envío</span><span>{orden.shippingCost === 0 ? 'Gratis' : `L${orden.shippingCost.toFixed(2)}`}</span></div>
            <div className="order-summary-row"><span>Impuesto (13%)</span><span>L{orden.tax.toFixed(2)}</span></div>
            <hr className="order-divider" />
            <div className="order-total-row"><span>Total</span><span>L{orden.total.toFixed(2)}</span></div>
            <div className="order-actions">
              <Link to="/" className="order-btn-primary">Volver al inicio</Link>
              <Link to="/catalog" className="order-btn-outline">Seguir comprando</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
