import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import '../styles/pages/Checkout.css'

const formatCard   = v => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
const formatExpiry = v => {
  const c = v.replace(/\D/g, '').slice(0, 4)
  return c.length >= 3 ? c.slice(0, 2) + '/' + c.slice(2) : c
}

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  const shipping = totalPrice > 50 ? 0 : 5.99
  const tax      = totalPrice * 0.13
  const total    = totalPrice + shipping + tax

  const [step,      setStep]      = useState(1)
  const [loading,   setLoading]   = useState(false)
  const [payMethod, setPayMethod] = useState('card')
  const [errors,    setErrors]    = useState({})

  const [shippingForm, setShippingForm] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', zip: '', country: 'Honduras',
  })

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '', expiry: '', cvv: '', cardName: '',
  })

  function validateShipping() {
    const e = {}
    if (!shippingForm.firstName.trim()) e.firstName = 'Requerido'
    if (!shippingForm.lastName.trim())  e.lastName  = 'Requerido'
    if (!shippingForm.email.includes('@')) e.email  = 'Email inválido'
    if (!shippingForm.address.trim())   e.address   = 'Requerido'
    if (!shippingForm.city.trim())      e.city      = 'Requerido'
    if (!shippingForm.zip.trim())       e.zip       = 'Requerido'
    return e
  }

  function validatePayment() {
    const e = {}
    if (payMethod === 'card') {
      const raw = paymentForm.cardNumber.replace(/\s/g, '')
      if (raw.length < 16)                          e.cardNumber = 'Número inválido'
      if (!paymentForm.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = 'Formato MM/AA'
      if (paymentForm.cvv.length < 3)               e.cvv      = 'CVV inválido'
      if (!paymentForm.cardName.trim())              e.cardName = 'Requerido'
    }
    return e
  }

  function handleShippingNext() {
    const e = validateShipping()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setStep(2)
  }

  async function handlePaySubmit() {
    const e = validatePayment()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))

    const order = {
      id:            `ORD-${Date.now()}`,
      items,
      shipping:      shippingForm,
      payment:       { method: payMethod, last4: paymentForm.cardNumber.slice(-4) || '****' },
      subtotal:      totalPrice,
      shippingCost:  shipping,
      tax,
      total,
      date:          new Date().toISOString(),
    }
    sessionStorage.setItem('shopeasy_order', JSON.stringify(order))
    clearCart()
    navigate('/order-confirmation')
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1 className="checkout-title">Checkout</h1>
      </div>

      {/* Steps */}
      <div className="checkout-steps">
        {[{ n: 1, label: 'Envío' }, { n: 2, label: 'Pago' }, { n: 3, label: 'Confirmación' }].map(({ n, label }, i) => (
          <span key={n} style={{ display: 'flex', alignItems: 'center' }}>
            <span className={step === n ? 'checkout-step--active' : 'checkout-step'}>
              <span className={step === n ? 'checkout-step-num--active' : step > n ? 'checkout-step-num--done' : 'checkout-step-num'}>
                {step > n ? '✓' : n}
              </span>
              {label}
            </span>
            {i < 2 && <span className="checkout-step-arrow">›</span>}
          </span>
        ))}
      </div>

      <div className="checkout-layout">
        <div>
          {/*Envío ── */}
          {step === 1 && (
            <>
              <div className="checkout-section">
                <div className="checkout-section-title">Información de contacto</div>
                <div className="checkout-row-2">
                  <div>
                    <label className="checkout-label">Nombre</label>
                    <input
                      className={errors.firstName ? 'checkout-input--error' : 'checkout-input'}
                      value={shippingForm.firstName}
                      onChange={e => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                    />
                    {errors.firstName && <p className="checkout-error-msg">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="checkout-label">Apellido</label>
                    <input
                      className={errors.lastName ? 'checkout-input--error' : 'checkout-input'}
                      value={shippingForm.lastName}
                      onChange={e => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                    />
                    {errors.lastName && <p className="checkout-error-msg">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="checkout-row-1">
                  <label className="checkout-label">Correo electrónico</label>
                  <input
                    className={errors.email ? 'checkout-input--error' : 'checkout-input'}
                    value={shippingForm.email}
                    placeholder="tu@correo.com"
                    onChange={e => setShippingForm({ ...shippingForm, email: e.target.value })}
                  />
                  {errors.email && <p className="checkout-error-msg">{errors.email}</p>}
                </div>
              </div>

              <div className="checkout-section">
                <div className="checkout-section-title">Dirección de envío</div>
                <div className="checkout-row-1">
                  <label className="checkout-label">Dirección</label>
                  <input
                    className={errors.address ? 'checkout-input--error' : 'checkout-input'}
                    value={shippingForm.address}
                    placeholder="Calle, número, colonia"
                    onChange={e => setShippingForm({ ...shippingForm, address: e.target.value })}
                  />
                  {errors.address && <p className="checkout-error-msg">{errors.address}</p>}
                </div>
                <div className="checkout-row-2">
                  <div>
                    <label className="checkout-label">Ciudad</label>
                    <input
                      className={errors.city ? 'checkout-input--error' : 'checkout-input'}
                      value={shippingForm.city}
                      onChange={e => setShippingForm({ ...shippingForm, city: e.target.value })}
                    />
                    {errors.city && <p className="checkout-error-msg">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="checkout-label">Código postal</label>
                    <input
                      className={errors.zip ? 'checkout-input--error' : 'checkout-input'}
                      value={shippingForm.zip}
                      onChange={e => setShippingForm({ ...shippingForm, zip: e.target.value })}
                    />
                    {errors.zip && <p className="checkout-error-msg">{errors.zip}</p>}
                  </div>
                </div>
                <div className="checkout-row-1">
                  <label className="checkout-label">País</label>
                  <select
                    className="checkout-input"
                    value={shippingForm.country}
                    onChange={e => setShippingForm({ ...shippingForm, country: e.target.value })}
                  >
                    {['Honduras', 'Guatemala', 'El Salvador', 'Nicaragua', 'Costa Rica', 'Panamá', 'México'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="checkout-submit-btn" onClick={handleShippingNext}>
                Continuar al pago →
              </button>
            </>
          )}

          {/*Pago*/}
          {step === 2 && (
            <>
              <div className="checkout-section">
                <div className="checkout-section-title">Método de pago</div>
                <div className="checkout-pay-methods">
                  {[
                    { id: 'card',   label: '💳 Tarjeta' },
                    { id: 'paypal', label: '🅿 PayPal' },
                    { id: 'cash',   label: '💵 Contra entrega' },
                  ].map(m => (
                    <button
                      key={m.id}
                      className={payMethod === m.id ? 'checkout-pay-chip--active' : 'checkout-pay-chip'}
                      onClick={() => setPayMethod(m.id)}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                <div className="checkout-sandbox-note">
                  🔒 <strong>Modo sandbox</strong> — Los datos no se procesan realmente.<br />
                  Usa: <code>4242 4242 4242 4242</code> · Exp: <code>12/26</code> · CVV: <code>123</code>
                </div>

                {payMethod === 'card' && (
                  <>
                    <div className="checkout-row-1">
                      <label className="checkout-label">Número de tarjeta</label>
                      <input
                        className={errors.cardNumber ? 'checkout-input--error' : 'checkout-input'}
                        value={paymentForm.cardNumber}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        onChange={e => setPaymentForm({ ...paymentForm, cardNumber: formatCard(e.target.value) })}
                      />
                      {errors.cardNumber && <p className="checkout-error-msg">{errors.cardNumber}</p>}
                    </div>
                    <div className="checkout-card-row">
                      <div>
                        <label className="checkout-label">Nombre en tarjeta</label>
                        <input
                          className={errors.cardName ? 'checkout-input--error' : 'checkout-input'}
                          value={paymentForm.cardName}
                          placeholder="NOMBRE APELLIDO"
                          onChange={e => setPaymentForm({ ...paymentForm, cardName: e.target.value.toUpperCase() })}
                        />
                        {errors.cardName && <p className="checkout-error-msg">{errors.cardName}</p>}
                      </div>
                      <div>
                        <label className="checkout-label">Expiración</label>
                        <input
                          className={errors.expiry ? 'checkout-input--error' : 'checkout-input'}
                          value={paymentForm.expiry}
                          placeholder="MM/AA"
                          maxLength={5}
                          onChange={e => setPaymentForm({ ...paymentForm, expiry: formatExpiry(e.target.value) })}
                        />
                        {errors.expiry && <p className="checkout-error-msg">{errors.expiry}</p>}
                      </div>
                      <div>
                        <label className="checkout-label">CVV</label>
                        <input
                          className={errors.cvv ? 'checkout-input--error' : 'checkout-input'}
                          value={paymentForm.cvv}
                          placeholder="123"
                          maxLength={4}
                          onChange={e => setPaymentForm({ ...paymentForm, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                        />
                        {errors.cvv && <p className="checkout-error-msg">{errors.cvv}</p>}
                      </div>
                    </div>
                  </>
                )}

                {payMethod === 'paypal' && (
                  <div className="checkout-sandbox-note checkout-sandbox-note--center">
                    Serías redirigido a PayPal para completar el pago.<br />
                    <em style={{ fontSize: '11px' }}>(Simulado — sin redirección real)</em>
                  </div>
                )}

                {payMethod === 'cash' && (
                  <div className="checkout-sandbox-note checkout-sandbox-note--center">
                    Pagarás al recibir tu pedido en la dirección indicada.
                  </div>
                )}
              </div>

              <div className="checkout-btn-row">
                <button className="checkout-back-btn" onClick={() => { setStep(1); setErrors({}) }}>
                  ← Volver
                </button>
                <button
                  className={loading ? 'checkout-submit-btn--loading' : 'checkout-submit-btn'}
                  onClick={handlePaySubmit}
                  disabled={loading}
                  style={{ flex: 1 }}
                >
                  {loading ? 'Procesando pago...' : `Confirmar pago · $${total.toFixed(2)}`}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Resumen */}
        <div className="checkout-summary-card">
          <h2 className="checkout-summary-title">Tu orden</h2>
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="checkout-summary-item">
              <span style={{ marginRight: '6px' }}>{product.emoji}</span>
              <span className="checkout-summary-item-name">{product.name}</span>
              <span className="checkout-summary-item-qty">×{quantity}</span>
              <span className="checkout-summary-item-price">${(product.price * quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr className="checkout-divider" />
          <div className="checkout-summary-row"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
          <div className="checkout-summary-row"><span>Envío</span><span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span></div>
          <div className="checkout-summary-row"><span>Impuesto (13%)</span><span>${tax.toFixed(2)}</span></div>
          <hr className="checkout-divider" />
          <div className="checkout-total-row"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <p className="checkout-secure-note">🔒 Pago simulado · Sandbox</p>
        </div>
      </div>
    </div>
  )
}
