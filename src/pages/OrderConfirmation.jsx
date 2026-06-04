import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/pages/OrderConfirmation.css'

const PAY_LABELS = {
  card:   'Tarjeta de crédito/débito',
}

export default function OrderConfirmation() {
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('shopeasy_order')
    if (!raw) return
    setOrder(JSON.parse(raw))
    sessionStorage.removeItem('shopeasy_order')
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
    hour: '2-digit', minute: '2-digit',
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
          {/* Productos */}
          <div className="order-section">
            <div className="order-section-header">Productos ordenados</div>
            <div className="order-section-body">
              {order.items.map(({ product, quantity }, i) => (
                <div
                  key={product.id}
                  className={`order-item-row${i === order.items.length - 1 ? ' order-item-row--last' : ''}`}
                >
                  <div className="order-item-emoji">{product.emoji}</div>
                  <div className="order-item-info">
                    <div className="order-item-name">{product.name}</div>
                    <div className="order-item-cat">{product.category}</div>
                  </div>
                  <span className="order-item-qty">×{quantity}</span>
                  <span className="order-item-price">${(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Envío */}
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

          {/* Pago */}
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

        {/* Totales */}
        <div className="order-summary-card">
          <div className="order-summary-header">Resumen de la orden</div>
          <div className="order-summary-body">
            <div className="order-summary-row"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
            <div className="order-summary-row"><span>Envío</span><span>{order.shippingCost === 0 ? 'Gratis' : `$${order.shippingCost.toFixed(2)}`}</span></div>
            <div className="order-summary-row"><span>Impuesto (13%)</span><span>${order.tax.toFixed(2)}</span></div>
            <hr className="order-divider" />
            <div className="order-total-row"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
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
