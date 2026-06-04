import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const s = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '2rem 2rem 4rem' },
  header: { padding: '2.5rem 0 2rem' },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem',
    letterSpacing: '-0.02em',
    marginBottom: '0.4rem',
  },
  subtitle: { fontSize: '13px', color: '#a3a3a3' },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '2.5rem',
    alignItems: 'start',
  },
  itemsHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 40px',
    gap: '1rem',
    padding: '0.5rem 0',
    borderBottom: '1px solid #e5e5e5',
    fontSize: '11px',
    color: '#a3a3a3',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
  },
  itemRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 40px',
    gap: '1rem',
    padding: '1.25rem 0',
    borderBottom: '1px solid #e5e5e5',
    alignItems: 'center',
  },
  itemInfo: { display: 'flex', alignItems: 'center', gap: '1rem' },
  itemEmoji: {
    width: '56px', height: '56px',
    background: '#f5f5f5', borderRadius: '2px',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0,
  },
  itemName: {
    fontSize: '13px', fontWeight: '500',
    color: '#0f0f0f', textDecoration: 'none',
    display: 'block', marginBottom: '3px',
  },
  itemCat: { fontSize: '11px', color: '#a3a3a3' },
  qtyControl: { display: 'flex', alignItems: 'center' },
  qtyBtn: {
    width: '28px', height: '28px',
    border: '1px solid #e5e5e5', background: 'none',
    fontSize: '14px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'DM Sans', sans-serif",
  },
  qtyNum: {
    width: '36px', height: '28px',
    border: '1px solid #e5e5e5',
    borderLeft: 'none', borderRight: 'none',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '12px',
  },
  itemPrice: { fontFamily: "'Playfair Display', serif", fontSize: '0.95rem' },
  removeBtn: {
    background: 'none', border: 'none',
    cursor: 'pointer', color: '#a3a3a3',
    fontSize: '18px', lineHeight: 1, padding: '4px',
    transition: 'color 150ms',
  },
  summaryCard: {
    border: '1px solid #e5e5e5', borderRadius: '2px',
    padding: '1.5rem', position: 'sticky', top: '72px',
  },
  summaryTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.1rem', marginBottom: '1.25rem',
  },
  summaryRow: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '13px', marginBottom: '10px',
  },
  summaryKey: { color: '#525252' },
  summaryVal: { color: '#0f0f0f' },
  divider: { border: 'none', borderTop: '1px solid #e5e5e5', margin: '1rem 0' },
  totalRow: {
    display: 'flex', justifyContent: 'space-between',
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.15rem', marginBottom: '1.25rem',
  },
  checkoutBtn: {
    width: '100%', padding: '12px',
    background: '#0f0f0f', color: '#fafafa',
    border: 'none', borderRadius: '2px',
    fontSize: '13px', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'opacity 150ms', marginBottom: '8px',
  },
  continueBtn: {
    width: '100%', padding: '10px',
    background: 'transparent', color: '#525252',
    border: '1px solid #e5e5e5', borderRadius: '2px',
    fontSize: '12px', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    textAlign: 'center', display: 'block', textDecoration: 'none',
  },
  secureNote: { fontSize: '11px', color: '#a3a3a3', textAlign: 'center', marginTop: '1rem' },
  empty: { textAlign: 'center', padding: '5rem 0' },
  emptyIcon: { fontSize: '3rem', marginBottom: '1rem' },
  emptyTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.3rem', marginBottom: '0.5rem',
  },
  emptyText: { color: '#a3a3a3', fontSize: '14px', marginBottom: '1.5rem' },
}

export default function Cart() {
  const { items, totalItems, totalPrice, removeItem, updateQty, clearCart } = useCart()
  const navigate = useNavigate()

  const shipping = totalPrice > 50 ? 0 : 5.99
  const tax      = totalPrice * 0.13
  const total    = totalPrice + shipping + tax

  if (items.length === 0) {
    return (
      <div style={s.page}>
        <div style={s.empty}>
          <h2 style={s.emptyTitle}>Tu carrito está vacío</h2>
          <p style={s.emptyText}>Agrega productos para continuar con tu compra.</p>
          <Link to="/catalog" className="btn btn-primary">Ver catálogo</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.title}>Carrito</h1>
        <p style={s.subtitle}>{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</p>
      </div>

      <div style={s.layout}>
        <div>
          <div style={s.itemsHeader}>
            <span>Producto</span>
            <span>Cantidad</span>
            <span>Precio</span>
            <span></span>
          </div>

          {items.map(({ product, quantity }) => (
            <div key={product.id} style={s.itemRow}>
              <div style={s.itemInfo}>
                <div style={s.itemEmoji}>{product.emoji}</div>
                <div>
                  <Link to={`/product/${product.id}`} style={s.itemName}>
                    {product.name}
                  </Link>
                  <span style={s.itemCat}>{product.category}</span>
                </div>
              </div>

              <div style={s.qtyControl}>
                <button style={s.qtyBtn} onClick={() => updateQty(product.id, quantity - 1)}>−</button>
                <span style={s.qtyNum}>{quantity}</span>
                <button style={{ ...s.qtyBtn, borderLeft: 'none' }} onClick={() => updateQty(product.id, quantity + 1)}>+</button>
              </div>

              <span style={s.itemPrice}>${(product.price * quantity).toFixed(2)}</span>

              <button
                style={s.removeBtn}
                onClick={() => removeItem(product.id)}
                onMouseEnter={e => e.currentTarget.style.color = '#0f0f0f'}
                onMouseLeave={e => e.currentTarget.style.color = '#a3a3a3'}
              >×</button>
            </div>
          ))}

          <div style={{ marginTop: '1rem', textAlign: 'right' }}>
            <button onClick={clearCart} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '12px', color: '#a3a3a3', textDecoration: 'underline',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Vaciar carrito
            </button>
          </div>
        </div>

        <div style={s.summaryCard}>
          <h2 style={s.summaryTitle}>Resumen</h2>

          <div style={s.summaryRow}>
            <span style={s.summaryKey}>Subtotal</span>
            <span style={s.summaryVal}>${totalPrice.toFixed(2)}</span>
          </div>
          <div style={s.summaryRow}>
            <span style={s.summaryKey}>Envío</span>
            <span style={s.summaryVal}>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div style={s.summaryRow}>
            <span style={s.summaryKey}>Impuesto (13%)</span>
            <span style={s.summaryVal}>${tax.toFixed(2)}</span>
          </div>

          {totalPrice <= 50 && (
            <p style={{ fontSize: '11px', color: '#a3a3a3', marginBottom: '8px' }}>
              Agrega ${(50 - totalPrice).toFixed(2)} más para envío gratis
            </p>
          )}

          <hr style={s.divider} />

          <div style={s.totalRow}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            style={s.checkoutBtn}
            onClick={() => navigate('/checkout')}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Proceder al pago →
          </button>

          <Link to="/catalog" style={s.continueBtn}>← Seguir comprando</Link>

          <p style={s.secureNote}>🔒 Pago 100% seguro · Simulado (sandbox)</p>
        </div>
      </div>
    </div>
  )
}