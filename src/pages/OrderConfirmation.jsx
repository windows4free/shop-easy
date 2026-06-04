import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const s = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '2rem 2rem 4rem' },
  hero: {
    textAlign: 'center', padding: '3rem 0 2.5rem',
    borderBottom: '1px solid #e5e5e5', marginBottom: '2.5rem',
  },
  iconCircle: {
    width: '64px', height: '64px', borderRadius: '50%',
    background: '#0f0f0f', color: '#fafafa',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.75rem', margin: '0 auto 1.25rem',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem', letterSpacing: '-0.02em', marginBottom: '0.5rem',
  },
  subtitle: { fontSize: '14px', color: '#525252', marginBottom: '0.5rem' },
  orderId: {
    display: 'inline-block', fontSize: '12px', color: '#a3a3a3',
    border: '1px solid #e5e5e5', borderRadius: '2px',
    padding: '3px 10px', fontFamily: 'monospace', marginTop: '0.5rem',
  },
  layout: {
    display: 'grid', gridTemplateColumns: '1fr 340px',
    gap: '2.5rem', alignItems: 'start',
  },
  section: {
    border: '1px solid #e5e5e5', borderRadius: '2px',
    marginBottom: '1.25rem', overflow: 'hidden',
  },
  sectionHeader: {
    padding: '0.75rem 1.25rem', background: '#f5f5f5',
    borderBottom: '1px solid #e5e5e5', fontSize: '11px',
    fontWeight: '500', textTransform: 'uppercase',
    letterSpacing: '0.08em', color: '#525252',
  },
  sectionBody: { padding: '1.25rem' },
  itemRow: {
    display: 'flex', alignItems: 'center', gap: '1rem',
    paddingBottom: '1rem', marginBottom: '1rem',
    borderBottom: '1px solid #f5f5f5',
  },
  itemEmoji: {
    width: '48px', height: '48px', background: '#f5f5f5',
    borderRadius: '2px', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0,
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: '13px', fontWeight: '500', marginBottom: '2px' },
  itemCat:  { fontSize: '11px', color: '#a3a3a3' },
  itemQty:  {
    fontSize: '11px', color: '#a3a3a3', background: '#f5f5f5',
    padding: '2px 8px', borderRadius: '2px',
  },
  itemPrice: { fontFamily: "'Playfair Display', serif", fontSize: '0.95rem' },
  infoRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '10px' },
  infoKey: { color: '#a3a3a3' },
  infoVal: { color: '#0f0f0f', fontWeight: '500' },
  summaryCard: {
    border: '1px solid #e5e5e5', borderRadius: '2px',
    overflow: 'hidden', position: 'sticky', top: '72px',
  },
  summaryHeader: {
    padding: '0.75rem 1.25rem', background: '#0f0f0f',
    fontSize: '11px', fontWeight: '500', textTransform: 'uppercase',
    letterSpacing: '0.08em', color: '#fafafa',
  },
  summaryBody: { padding: '1.25rem' },
  summaryRow: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '13px', marginBottom: '10px', color: '#525252',
  },
  divider: { border: 'none', borderTop: '1px solid #e5e5e5', margin: '1rem 0' },
  totalRow: {
    display: 'flex', justifyContent: 'space-between',
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.2rem', marginBottom: '1.25rem',
  },
  actions: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '1.5rem' },
  btnPrimary: {
    display: 'block', textAlign: 'center', padding: '12px',
    background: '#0f0f0f', color: '#fafafa', border: 'none',
    borderRadius: '2px', fontSize: '13px', cursor: 'pointer',
    textDecoration: 'none', fontFamily: "'DM Sans', sans-serif",
  },
  btnOutline: {
    display: 'block', textAlign: 'center', padding: '10px',
    background: 'transparent', color: '#525252',
    border: '1px solid #e5e5e5', borderRadius: '2px',
    fontSize: '12px', textDecoration: 'none',
    fontFamily: "'DM Sans', sans-serif",
  },
  empty: { textAlign: 'center', padding: '5rem 0' },
  emptyTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem', marginBottom: '0.5rem',
  },
  emptyText: { color: '#a3a3a3', fontSize: '14px', marginBottom: '1.5rem' },
  note: { fontSize: '11px', color: '#a3a3a3', textAlign: 'center', marginTop: '1rem', lineHeight: 1.6 },
}

const PAY_LABELS = {
  card:   '💳 Tarjeta de crédito/débito',
  paypal: '🅿 PayPal',
  cash:   '💵 Contra entrega',
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
      <div style={s.page}>
        <div style={s.empty}>
          <h2 style={s.emptyTitle}>No hay orden para mostrar</h2>
          <p style={s.emptyText}>Parece que llegaste aquí sin completar una compra.</p>
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
    <div style={s.page}>
      <div style={s.hero}>
        <div style={s.iconCircle}>✓</div>
        <h1 style={s.title}>¡Orden confirmada!</h1>
        <p style={s.subtitle}>Gracias por tu compra. Tu pedido ha sido procesado exitosamente.</p>
        <span style={s.orderId}>{order.id}</span>
      </div>

      <div style={s.layout}>
        <div>
          {/* Productos */}
          <div style={s.section}>
            <div style={s.sectionHeader}>Productos ordenados</div>
            <div style={s.sectionBody}>
              {order.items.map(({ product, quantity }, i) => (
                <div key={product.id} style={{
                  ...s.itemRow,
                  ...(i === order.items.length - 1
                    ? { borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }
                    : {})
                }}>
                  <div style={s.itemEmoji}>{product.emoji}</div>
                  <div style={s.itemInfo}>
                    <div style={s.itemName}>{product.name}</div>
                    <div style={s.itemCat}>{product.category}</div>
                  </div>
                  <span style={s.itemQty}>×{quantity}</span>
                  <span style={s.itemPrice}>${(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Envío */}
          <div style={s.section}>
            <div style={s.sectionHeader}>Información de envío</div>
            <div style={s.sectionBody}>
              {[
                ['Destinatario', `${order.shipping.firstName} ${order.shipping.lastName}`],
                ['Correo',        order.shipping.email],
                ['Dirección',     order.shipping.address],
                ['Ciudad',        order.shipping.city],
                ['Código postal', order.shipping.zip],
                ['País',          order.shipping.country],
              ].map(([k, v]) => (
                <div key={k} style={s.infoRow}>
                  <span style={s.infoKey}>{k}</span>
                  <span style={s.infoVal}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pago */}
          <div style={s.section}>
            <div style={s.sectionHeader}>Método de pago</div>
            <div style={s.sectionBody}>
              {[
                ['Método', PAY_LABELS[order.payment.method] || order.payment.method],
                ['Estado', '✓ Pago simulado exitoso'],
                ['Fecha',  date],
                ...(order.payment.method === 'card'
                  ? [['Tarjeta', `**** **** **** ${order.payment.last4}`]]
                  : []),
              ].map(([k, v]) => (
                <div key={k} style={s.infoRow}>
                  <span style={s.infoKey}>{k}</span>
                  <span style={s.infoVal}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Totales */}
        <div style={s.summaryCard}>
          <div style={s.summaryHeader}>Resumen de la orden</div>
          <div style={s.summaryBody}>
            <div style={s.summaryRow}><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
            <div style={s.summaryRow}><span>Envío</span><span>{order.shippingCost === 0 ? 'Gratis' : `$${order.shippingCost.toFixed(2)}`}</span></div>
            <div style={s.summaryRow}><span>Impuesto (13%)</span><span>${order.tax.toFixed(2)}</span></div>
            <hr style={s.divider} />
            <div style={s.totalRow}><span>Total</span><span>${order.total.toFixed(2)}</span></div>
            <div style={s.actions}>
              <Link to="/" style={s.btnPrimary}>Volver al inicio</Link>
              <Link to="/catalog" style={s.btnOutline}>Seguir comprando</Link>
            </div>
            <p style={s.note}>🔒 Transacción simulada<br />Ningún dato real fue procesado.</p>
          </div>
        </div>
      </div>
    </div>
  )
}