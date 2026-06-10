import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import '../styles/components/checkout/BotonPayPal.css'

export default function BotonPayPal({ amount, onSuccess, onError }) {
  const [{ isPending }] = usePayPalScriptReducer()

  if (isPending) {
    return <div className="paypal-loading">Cargando PayPal...</div>
  }

  return (
    <div className="paypal-wrapper">
      <PayPalButtons
        style={{ layout: 'vertical', color: 'black', shape: 'rect', label: 'pay', height: 40 }}
        forceReRender={[amount]}
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [{
              amount: { value: amount.toFixed(2), currency_code: 'USD' },
              description: 'Compra en ShopEasy',
            }],
          })
        }
        onApprove={async (data, actions) => {
          const details = await actions.order.capture()
          onSuccess(details)
        }}
        onError={(err) => {
          console.error('PayPal error:', err)
          onError?.()
        }}
        onCancel={() => console.log('Pago cancelado por el usuario')}
      />
    </div>
  )
}
