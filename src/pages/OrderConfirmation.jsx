import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../data/supabase.js'
import '../styles/pages/OrderConfirmation.css'

const PAY_LABELS = {
  card:   'Tarjeta de crédito/débito',
  paypal: 'PayPal',
  cash:   'Pagar en efectivo',
}

async function saveOrderToSupabase(order) {
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
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('shopeasy_order')
    if (!raw) return
    const parsed = JSON.parse(raw)
    setOrder(parsed)
    sessionStorage.removeItem('shopeasy_order')
    saveOrderToSupabase(parsed)
  }, [])

  if (!order) {
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

  const date = new Date(order.date).toLocaleDateString('es-HN', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="order-page">
      <div className="order-hero">
        <div className="order-icon-circle">✓</div>
        <h1 className="order-title">¡Orden confirmada!</h1>
        <p className="order-subtitle">Gracias por tu compra. Tu pedido ha sido procesado exitosamente.</p>
        <span className="order-id">{order.id}</span>
      </div>

      <div className="order-layout">
        <div>
          <div className="order-section">
            <div className="order-section-header">Productos ordenados</div>
            <div className="order-section-body">
              {order.items.map(({ product, quantity }, i) => (
                <div
                  key={product.id}
                  className={`order-item-row${i === order.items.length - 1 ? ' order-item-row--last' : ''}`}
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
                ['Destinatario', `${order.shipping.firstName} ${order.shipping.lastName}`],
                ['Correo',        order.shipping.email],
                ['Dirección',     order.shipping.address],
                ['Ciudad',        order.shipping.city],
                ['Código postal', order.shipping.zip],
                ['País',          order.shipping.country],
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
                ['Método', PAY_LABELS[order.payment.method] || order.payment.method],
                ['Estado', '✓ Pago exitoso'],
                ['Fecha',  date],
                ...(order.payment.method === 'card'
                  ? [['Tarjeta', `**** **** **** ${order.payment.last4}`]]
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
            <div className="order-summary-row"><span>Subtotal</span><span>L{order.subtotal.toFixed(2)}</span></div>
            <div className="order-summary-row"><span>Envío</span><span>{order.shippingCost === 0 ? 'Gratis' : `L${order.shippingCost.toFixed(2)}`}</span></div>
            <div className="order-summary-row"><span>Impuesto (13%)</span><span>L{order.tax.toFixed(2)}</span></div>
            <hr className="order-divider" />
            <div className="order-total-row"><span>Total</span><span>L{order.total.toFixed(2)}</span></div>
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