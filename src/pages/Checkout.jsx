import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  steps: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2.5rem',
    borderBottom: '1px solid #e5e5e5',
    paddingBottom: '1rem',
  },
  step: {
    display: 'flex', alignItems: 'center', gap: '8px',
    fontSize: '12px', color: '#a3a3a3', paddingRight: '1.5rem',
  },
  stepActive: {
    display: 'flex', alignItems: 'center', gap: '8px',
    fontSize: '12px', color: '#0f0f0f', fontWeight: '500', paddingRight: '1.5rem',
  },
  stepNum: {
    width: '20px', height: '20px', borderRadius: '50%',
    border: '1px solid #e5e5e5', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: '10px', background: '#fafafa',
  },
  stepNumActive: {
    width: '20px', height: '20px', borderRadius: '50%',
    border: '1px solid #0f0f0f', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: '10px', background: '#0f0f0f', color: '#fafafa',
  },
  stepNumDone: {
    width: '20px', height: '20px', borderRadius: '50%',
    border: '1px solid #e5e5e5', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: '10px', background: '#f5f5f5', color: '#a3a3a3',
  },
  stepArrow: { color: '#e5e5e5', fontSize: '12px', marginRight: '1rem' },
  layout: {
    display: 'grid', gridTemplateColumns: '1fr 320px',
    gap: '2.5rem', alignItems: 'start',
  },
  section: { marginBottom: '2rem' },
  sectionTitle: {
    fontSize: '11px', fontWeight: '500',
    textTransform: 'uppercase', letterSpacing: '0.08em',
    color: '#525252', marginBottom: '1rem',
    paddingBottom: '0.5rem', borderBottom: '1px solid #e5e5e5',
  },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' },
  row1: { marginBottom: '12px' },
  label: { display: 'block', fontSize: '11px', color: '#a3a3a3', marginBottom: '5px' },
  input: {
    width: '100%', padding: '9px 12px',
    border: '1px solid #e5e5e5', borderRadius: '2px',
    fontSize: '13px', background: '#fafafa', color: '#0f0f0f',
    fontFamily: "'DM Sans', sans-serif", outline: 'none',
    transition: 'border-color 150ms', boxSizing: 'border-box',
  },
  inputError: {
    width: '100%', padding: '9px 12px',
    border: '1px solid #e57575', borderRadius: '2px',
    fontSize: '13px', background: '#fafafa', color: '#0f0f0f',
    fontFamily: "'DM Sans', sans-serif", outline: 'none',
    boxSizing: 'border-box',
  },
  errorMsg: { fontSize: '11px', color: '#c0392b', marginTop: '4px' },
  cardRow: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginBottom: '12px' },
  payMethods: { display: 'flex', gap: '8px', marginBottom: '1.25rem' },
  payChip: {
    padding: '6px 14px', border: '1px solid #e5e5e5',
    borderRadius: '2px', fontSize: '12px', cursor: 'pointer',
    background: '#fafafa', color: '#525252',
    fontFamily: "'DM Sans', sans-serif", transition: 'all 150ms',
  },
  payChipActive: {
    padding: '6px 14px', border: '1px solid #0f0f0f',
    borderRadius: '2px', fontSize: '12px', cursor: 'pointer',
    background: '#0f0f0f', color: '#fafafa',
    fontFamily: "'DM Sans', sans-serif",
  },
  sandboxNote: {
    background: '#f5f5f5', border: '1px solid #e5e5e5',
    borderRadius: '2px', padding: '10px 14px',
    fontSize: '12px', color: '#525252', marginBottom: '1.25rem', lineHeight: 1.6,
  },
  submitBtn: {
    width: '100%', padding: '13px', background: '#0f0f0f',
    color: '#fafafa', border: 'none', borderRadius: '2px',
    fontSize: '13px', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'opacity 150ms', marginTop: '0.5rem',
  },
  submitBtnLoading: {
    width: '100%', padding: '13px', background: '#525252',
    color: '#fafafa', border: 'none', borderRadius: '2px',
    fontSize: '13px', cursor: 'not-allowed',
    fontFamily: "'DM Sans', sans-serif", marginTop: '0.5rem',
  },
  summaryCard: {
    border: '1px solid #e5e5e5', borderRadius: '2px',
    padding: '1.5rem', position: 'sticky', top: '72px',
  },
  summaryTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1rem', marginBottom: '1.25rem',
  },
  summaryItem: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', fontSize: '12px', marginBottom: '10px', gap: '8px',
  },
  summaryItemName: { color: '#525252', flex: 1 },
  summaryItemQty: {
    fontSize: '10px', color: '#a3a3a3', background: '#f5f5f5',
    padding: '1px 6px', borderRadius: '2px',
  },
  summaryItemPrice: { color: '#0f0f0f', fontFamily: "'Playfair Display', serif" },
  divider: { border: 'none', borderTop: '1px solid #e5e5e5', margin: '1rem 0' },
  summaryRow: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '12px', marginBottom: '8px', color: '#525252',
  },
  totalRow: {
    display: 'flex', justifyContent: 'space-between',
    fontFamily: "'Playfair Display', serif", fontSize: '1.1rem',
  },
  secureNote: { fontSize: '11px', color: '#a3a3a3', textAlign: 'center', marginTop: '1rem' },
}

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
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.title}>Checkout</h1>
      </div>

      {/* Steps */}
      <div style={s.steps}>
        {[{ n: 1, label: 'Envío' }, { n: 2, label: 'Pago' }, { n: 3, label: 'Confirmación' }].map(({ n, label }, i) => (
          <span key={n} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={step === n ? s.stepActive : s.step}>
              <span style={step === n ? s.stepNumActive : step > n ? s.stepNumDone : s.stepNum}>
                {step > n ? '✓' : n}
              </span>
              {label}
            </span>
            {i < 2 && <span style={s.stepArrow}>›</span>}
          </span>
        ))}
      </div>

      <div style={s.layout}>
        <div>
          {/* ── PASO 1: Envío ── */}
          {step === 1 && (
            <>
              <div style={s.section}>
                <div style={s.sectionTitle}>Información de contacto</div>
                <div style={s.row2}>
                  <div>
                    <label style={s.label}>Nombre</label>
                    <input style={errors.firstName ? s.inputError : s.input}
                      value={shippingForm.firstName}
                      onChange={e => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                      onFocus={e => e.target.style.borderColor = '#0f0f0f'}
                    />
                    {errors.firstName && <p style={s.errorMsg}>{errors.firstName}</p>}
                  </div>
                  <div>
                    <label style={s.label}>Apellido</label>
                    <input style={errors.lastName ? s.inputError : s.input}
                      value={shippingForm.lastName}
                      onChange={e => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                      onFocus={e => e.target.style.borderColor = '#0f0f0f'}
                    />
                    {errors.lastName && <p style={s.errorMsg}>{errors.lastName}</p>}
                  </div>
                </div>
                <div style={s.row1}>
                  <label style={s.label}>Correo electrónico</label>
                  <input style={errors.email ? s.inputError : s.input}
                    value={shippingForm.email}
                    placeholder="tu@correo.com"
                    onChange={e => setShippingForm({ ...shippingForm, email: e.target.value })}
                    onFocus={e => e.target.style.borderColor = '#0f0f0f'}
                  />
                  {errors.email && <p style={s.errorMsg}>{errors.email}</p>}
                </div>
              </div>

              <div style={s.section}>
                <div style={s.sectionTitle}>Dirección de envío</div>
                <div style={s.row1}>
                  <label style={s.label}>Dirección</label>
                  <input style={errors.address ? s.inputError : s.input}
                    value={shippingForm.address}
                    placeholder="Calle, número, colonia"
                    onChange={e => setShippingForm({ ...shippingForm, address: e.target.value })}
                    onFocus={e => e.target.style.borderColor = '#0f0f0f'}
                  />
                  {errors.address && <p style={s.errorMsg}>{errors.address}</p>}
                </div>
                <div style={s.row2}>
                  <div>
                    <label style={s.label}>Ciudad</label>
                    <input style={errors.city ? s.inputError : s.input}
                      value={shippingForm.city}
                      onChange={e => setShippingForm({ ...shippingForm, city: e.target.value })}
                      onFocus={e => e.target.style.borderColor = '#0f0f0f'}
                    />
                    {errors.city && <p style={s.errorMsg}>{errors.city}</p>}
                  </div>
                  <div>
                    <label style={s.label}>Código postal</label>
                    <input style={errors.zip ? s.inputError : s.input}
                      value={shippingForm.zip}
                      onChange={e => setShippingForm({ ...shippingForm, zip: e.target.value })}
                      onFocus={e => e.target.style.borderColor = '#0f0f0f'}
                    />
                    {errors.zip && <p style={s.errorMsg}>{errors.zip}</p>}
                  </div>
                </div>
                <div style={s.row1}>
                  <label style={s.label}>País</label>
                  <select style={{ ...s.input, cursor: 'pointer' }}
                    value={shippingForm.country}
                    onChange={e => setShippingForm({ ...shippingForm, country: e.target.value })}
                  >
                    {['Honduras', 'Guatemala', 'El Salvador', 'Nicaragua', 'Costa Rica', 'Panamá', 'México'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button style={s.submitBtn} onClick={handleShippingNext}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Continuar al pago →
              </button>
            </>
          )}

          {/* ── PASO 2: Pago ── */}
          {step === 2 && (
            <>
              <div style={s.section}>
                <div style={s.sectionTitle}>Método de pago</div>
                <div style={s.payMethods}>
                  {[
                    { id: 'card',   label: '💳 Tarjeta' },
                    { id: 'paypal', label: '🅿 PayPal' },
                    { id: 'cash',   label: '💵 Contra entrega' },
                  ].map(m => (
                    <button key={m.id}
                      style={payMethod === m.id ? s.payChipActive : s.payChip}
                      onClick={() => setPayMethod(m.id)}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                <div style={s.sandboxNote}>
                  🔒 <strong>Modo sandbox</strong> — Los datos no se procesan realmente.<br />
                  Usa: <code>4242 4242 4242 4242</code> · Exp: <code>12/26</code> · CVV: <code>123</code>
                </div>

                {payMethod === 'card' && (
                  <>
                    <div style={s.row1}>
                      <label style={s.label}>Número de tarjeta</label>
                      <input style={errors.cardNumber ? s.inputError : s.input}
                        value={paymentForm.cardNumber}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        onChange={e => setPaymentForm({ ...paymentForm, cardNumber: formatCard(e.target.value) })}
                        onFocus={e => e.target.style.borderColor = '#0f0f0f'}
                      />
                      {errors.cardNumber && <p style={s.errorMsg}>{errors.cardNumber}</p>}
                    </div>
                    <div style={s.cardRow}>
                      <div>
                        <label style={s.label}>Nombre en tarjeta</label>
                        <input style={errors.cardName ? s.inputError : s.input}
                          value={paymentForm.cardName}
                          placeholder="NOMBRE APELLIDO"
                          onChange={e => setPaymentForm({ ...paymentForm, cardName: e.target.value.toUpperCase() })}
                          onFocus={e => e.target.style.borderColor = '#0f0f0f'}
                        />
                        {errors.cardName && <p style={s.errorMsg}>{errors.cardName}</p>}
                      </div>
                      <div>
                        <label style={s.label}>Expiración</label>
                        <input style={errors.expiry ? s.inputError : s.input}
                          value={paymentForm.expiry}
                          placeholder="MM/AA"
                          maxLength={5}
                          onChange={e => setPaymentForm({ ...paymentForm, expiry: formatExpiry(e.target.value) })}
                          onFocus={e => e.target.style.borderColor = '#0f0f0f'}
                        />
                        {errors.expiry && <p style={s.errorMsg}>{errors.expiry}</p>}
                      </div>
                      <div>
                        <label style={s.label}>CVV</label>
                        <input style={errors.cvv ? s.inputError : s.input}
                          value={paymentForm.cvv}
                          placeholder="123"
                          maxLength={4}
                          onChange={e => setPaymentForm({ ...paymentForm, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                          onFocus={e => e.target.style.borderColor = '#0f0f0f'}
                        />
                        {errors.cvv && <p style={s.errorMsg}>{errors.cvv}</p>}
                      </div>
                    </div>
                  </>
                )}

                {payMethod === 'paypal' && (
                  <div style={{ ...s.sandboxNote, textAlign: 'center', padding: '1.5rem' }}>
                    Serías redirigido a PayPal para completar el pago.<br />
                    <em style={{ fontSize: '11px' }}>(Simulado — sin redirección real)</em>
                  </div>
                )}

                {payMethod === 'cash' && (
                  <div style={{ ...s.sandboxNote, textAlign: 'center', padding: '1.5rem' }}>
                    Pagarás al recibir tu pedido en la dirección indicada.
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  style={{ ...s.submitBtn, background: 'transparent', color: '#525252', border: '1px solid #e5e5e5', flex: '0 0 auto', width: 'auto', padding: '13px 20px' }}
                  onClick={() => { setStep(1); setErrors({}) }}
                >
                  ← Volver
                </button>
                <button
                  style={loading ? s.submitBtnLoading : { ...s.submitBtn, flex: 1 }}
                  onClick={handlePaySubmit}
                  disabled={loading}
                  onMouseEnter={e => !loading && (e.currentTarget.style.opacity = '0.82')}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  {loading ? 'Procesando pago...' : `Confirmar pago · $${total.toFixed(2)}`}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Resumen */}
        <div style={s.summaryCard}>
          <h2 style={s.summaryTitle}>Tu orden</h2>
          {items.map(({ product, quantity }) => (
            <div key={product.id} style={s.summaryItem}>
              <span style={{ marginRight: '6px' }}>{product.emoji}</span>
              <span style={s.summaryItemName}>{product.name}</span>
              <span style={s.summaryItemQty}>×{quantity}</span>
              <span style={s.summaryItemPrice}>${(product.price * quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr style={s.divider} />
          <div style={s.summaryRow}><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
          <div style={s.summaryRow}><span>Envío</span><span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span></div>
          <div style={s.summaryRow}><span>Impuesto (13%)</span><span>${tax.toFixed(2)}</span></div>
          <hr style={s.divider} />
          <div style={s.totalRow}><span>Total</span><span>${total.toFixed(2)}</span></div>
          <p style={s.secureNote}>🔒 Pago simulado · Sandbox</p>
        </div>
      </div>
    </div>
  )
}