import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import CheckoutSteps  from '../components/checkout/CheckoutSteps.jsx'
import ShippingForm   from '../components/checkout/ShippingForm.jsx'
import PaymentStep    from '../components/checkout/PaymentStep.jsx'
import OrderSummary   from '../components/checkout/OrderSummary.jsx'
import '../styles/pages/Checkout.css'

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const shipping = totalPrice > 50 ? 0 : 5.99
  const tax      = totalPrice * 0.13
  const total    = totalPrice + shipping + tax

  const [step,        setStep]        = useState(1)
  const [payMethod,   setPayMethod]   = useState('paypal')
  const [errors,      setErrors]      = useState({})
  const [paypalError, setPaypalError] = useState(false)

  const [shippingForm, setShippingForm] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', zip: '', country: 'Honduras',
  })

  function validateShipping() {
    const e = {}
    if (!shippingForm.firstName.trim())       e.firstName = 'Requerido'
    if (!shippingForm.lastName.trim())        e.lastName  = 'Requerido'
    if (!shippingForm.email.includes('@'))    e.email     = 'Email inválido'
    if (!shippingForm.address.trim())         e.address   = 'Requerido'
    if (!shippingForm.city.trim())            e.city      = 'Requerido'
    if (!shippingForm.zip.trim())             e.zip       = 'Requerido'
    return e
  }

  function handleShippingNext() {
    const e = validateShipping()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setStep(2)
  }

  function buildOrder(paymentInfo) {
    return {
      id:           paymentInfo.id || `ORD-${Date.now()}`,
      user_id:      currentUser?.id || null,
      items,
      shipping:     shippingForm,
      payment:      paymentInfo,
      subtotal:     totalPrice,
      shippingCost: shipping,
      tax,
      total,
      date:         new Date().toISOString(),
    }
  }

  function handlePayPalSuccess(details) {
    const order = buildOrder({
      method: 'paypal',
      last4:  '****',
      paypalDetails: {
        payerName:  details.payer?.name?.given_name || '',
        payerEmail: details.payer?.email_address   || '',
        status:     details.status,
      },
    })
    sessionStorage.setItem('shopeasy_order', JSON.stringify(order))
    clearCart()
    navigate('/order-confirmation')
  }

  function handleCashConfirm() {
    const order = buildOrder({ method: 'cash', last4: '****' })
    sessionStorage.setItem('shopeasy_order', JSON.stringify(order))
    clearCart()
    navigate('/order-confirmation')
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1 className="checkout-title">Checkout</h1>
      </div>

      <CheckoutSteps currentStep={step} />

      <div className="checkout-layout">
        <div>
          {step === 1 && (
            <ShippingForm
              form={shippingForm}
              errors={errors}
              onChange={setShippingForm}
              onNext={handleShippingNext}
            />
          )}

          {step === 2 && (
            <PaymentStep
              payMethod={payMethod}
              onMethodChange={(m) => { setPayMethod(m); setPaypalError(false) }}
              total={total}
              paypalError={paypalError}
              onPayPalSuccess={handlePayPalSuccess}
              onPayPalError={() => setPaypalError(true)}
              onCashConfirm={handleCashConfirm}
              onBack={() => { setStep(1); setErrors({}) }}
            />
          )}
        </div>

        <OrderSummary
          items={items}
          subtotal={totalPrice}
          shipping={shipping}
          tax={tax}
          total={total}
        />
      </div>
    </div>
  )
}
