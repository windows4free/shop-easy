import '../../styles/components/checkout/OrderSummary.css'

export default function OrderSummary({ items, subtotal, shipping, tax, total }) {
  return (
    <div className="os-card">
      <h2 className="os-title">Tu orden</h2>

      {items.map(({ product, quantity }) => (
        <div key={product.id} className="os-item">
          <span className="os-item-name">{product.name}</span>
          <span className="os-item-qty">×{quantity}</span>
          <span className="os-item-price">L{(product.price * quantity).toFixed(2)}</span>
        </div>
      ))}

      <hr className="os-divider" />

      <div className="os-row"><span>Subtotal</span><span>L{subtotal.toFixed(2)}</span></div>
      <div className="os-row">
        <span>Envío</span>
        <span>{shipping === 0 ? 'Gratis' : `L${shipping.toFixed(2)}`}</span>
      </div>
      <div className="os-row"><span>Impuesto (13%)</span><span>L{tax.toFixed(2)}</span></div>

      <hr className="os-divider" />

      <div className="os-total-row"><span>Total</span><span>L{total.toFixed(2)}</span></div>

    </div>
  )
}
