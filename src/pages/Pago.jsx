import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { obtenerPrecios } from '../utils/priceCalculations.js'
import PasosCheckout from '../components/checkout/PasosCheckout.jsx'
import FormularioEnvio from '../components/checkout/FormularioEnvio.jsx'
import PasoPago from '../components/checkout/PasoPago.jsx'
import ResumenOrden from '../components/checkout/ResumenOrden.jsx'
import '../styles/pages/Pago.css'

export default function Pago() {
  const { items, totalPrice, limpiarCarrito } = useCart()
  const { usuarioActual } = useAuth()
  const navigate = useNavigate()
  const { shipping, tax, total } = obtenerPrecios(totalPrice)

  const [paso, setPaso] = useState(1)
  const [metodoPago, setMetodoPago] = useState('paypal')
  const [errores, setErrores] = useState({})
  const [errorPaypal, setErrorPaypal] = useState(false)

  const [formularioEnvio, setFormularioEnvio] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', zip: '', country: 'Honduras',
  })

  function validarEnvio() {
    const e = {}
    if (!formularioEnvio.firstName.trim()) e.firstName = 'Requerido'
    if (!formularioEnvio.lastName.trim()) e.lastName = 'Requerido'
    if (!formularioEnvio.email.includes('@')) e.email = 'Email inválido'
    if (!formularioEnvio.address.trim()) e.address = 'Requerido'
    if (!formularioEnvio.city.trim()) e.city = 'Requerido'
    if (!formularioEnvio.zip.trim()) e.zip = 'Requerido'
    return e
  }

  function manejarSiguienteEnvio() {
    const e = validarEnvio()
    if (Object.keys(e).length) { setErrores(e); return }
    setErrores({})
    setPaso(2)
  }

  function crearOrden(infoPago) {
    return {
      id: infoPago.id || `ORD-${Date.now()}`,
      user_id: usuarioActual?.id || null,
      items,
      shipping: formularioEnvio,
      payment: infoPago,
      subtotal: totalPrice,
      shippingCost: shipping,
      tax,
      total,
      date: new Date().toISOString(),
    }
  }

  function manejarExitoPayPal(details) {
    const order = crearOrden({
      method: 'paypal',
      last4: '****',
      paypalDetails: {
        payerName: details.payer?.name?.given_name || '',
        payerEmail: details.payer?.email_address || '',
        status: details.status,
      },
    })
    sessionStorage.setItem('shopeasy_order', JSON.stringify(order))
    limpiarCarrito()
    navigate('/order-confirmation')
  }

  function manejarConfirmarEfectivo() {
    sessionStorage.setItem('shopeasy_order', JSON.stringify(crearOrden({ method: 'cash', last4: '****' })))
    limpiarCarrito()
    navigate('/order-confirmation')
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1 className="checkout-title">Pago</h1>
      </div>

      <PasosCheckout currentStep={paso} />

      <div className="checkout-layout">
        <div>
          {paso === 1 && (
            <FormularioEnvio
              form={formularioEnvio}
              errors={errores}
              onChange={setFormularioEnvio}
              onNext={manejarSiguienteEnvio}
            />
          )}

          {paso === 2 && (
            <PasoPago
              payMethod={metodoPago}
              onMethodChange={(m) => { setMetodoPago(m); setErrorPaypal(false) }}
              total={total}
              paypalError={errorPaypal}
              onPayPalSuccess={manejarExitoPayPal}
              onPayPalError={() => setErrorPaypal(true)}
              onCashConfirm={manejarConfirmarEfectivo}
              onBack={() => { setPaso(1); setErrores({}) }}
            />
          )}
        </div>

        <ResumenOrden
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
