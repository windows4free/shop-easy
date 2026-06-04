import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import '../styles/pages/Cart.css'

export default function Cart() {
  const { items, totalItems, totalPrice, removeItem, updateQty, clearCart } = useCart()
  const navigate = useNavigate()

  const shipping = totalPrice > 50 ? 0 : 5.99
  const tax      = totalPrice * 0.13
  const total    = totalPrice + shipping + tax

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h2 className="cart-empty-title">Tu carrito está vacío</h2>
          <p className="cart-empty-text">Agrega productos para continuar con tu compra.</p>
          <Link to="/catalog" className="btn btn-primary">Ver catálogo</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="cart-title">Carrito</h1>
        <p className="cart-subtitle">{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</p>
      </div>

      <div className="cart-layout">
        <div>
          <div className="cart-items-header">
            <span>Producto</span>
            <span>Cantidad</span>
            <span>Precio</span>
            <span></span>
          </div>

          {items.map(({ product, quantity }) => (
            <div key={product.id} className="cart-item-row">
              <div className="cart-item-info">
                <div className="cart-item-emoji">{product.emoji}</div>
                <div>
                  <Link to={`/product/${product.id}`} className="cart-item-name">
                    {product.name}
                  </Link>
                  <span className="cart-item-cat">{product.category}</span>
                </div>
              </div>

              <div className="cart-qty-control">
                <button className="cart-qty-btn" onClick={() => updateQty(product.id, quantity - 1)}>−</button>
                <span className="cart-qty-num">{quantity}</span>
                <button className="cart-qty-btn cart-qty-btn--no-left" onClick={() => updateQty(product.id, quantity + 1)}>+</button>
              </div>

              <span className="cart-item-price">${(product.price * quantity).toFixed(2)}</span>

              <button className="cart-remove-btn" onClick={() => removeItem(product.id)}>×</button>
            </div>
          ))}

          <div className="cart-clear-row">
            <button onClick={clearCart} className="cart-clear-btn">
              Vaciar carrito
            </button>
          </div>
        </div>

        <div className="cart-summary-card">
          <h2 className="cart-summary-title">Resumen</h2>

          <div className="cart-summary-row">
            <span className="cart-summary-key">Subtotal</span>
            <span className="cart-summary-val">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span className="cart-summary-key">Envío</span>
            <span className="cart-summary-val">{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="cart-summary-row">
            <span className="cart-summary-key">Impuesto (13%)</span>
            <span className="cart-summary-val">${tax.toFixed(2)}</span>
          </div>

          {totalPrice <= 50 && (
            <p className="cart-free-shipping-note">
              Agrega ${(50 - totalPrice).toFixed(2)} más para envío gratis
            </p>
          )}

          <hr className="cart-divider" />

          <div className="cart-total-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="cart-checkout-btn" onClick={() => navigate('/checkout')}>
            Proceder al pago →
          </button>

          <Link to="/catalog" className="cart-continue-btn">← Seguir comprando</Link>

          <p className="cart-secure-note">🔒 Pago 100% seguro · Simulado (sandbox)</p>
        </div>
      </div>
    </div>
  )
}
