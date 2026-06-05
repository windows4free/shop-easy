import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

const s = {
  wrapper: { width: '100%', marginTop: '0.5rem' },
  loading: {
    textAlign: 'center', padding: '12px',
    fontSize: '12px', color: '#a3a3a3',
    border: '1px solid #e5e5e5', borderRadius: '2px',
  },
  error: {
    textAlign: 'center', padding: '10px',
    fontSize: '12px', color: '#c0392b',
    background: '#fef2f2', border: '1px solid #fecaca',
    borderRadius: '2px', marginTop: '8px',
  },
}

export default function PayPalButton({ amount, onSuccess, onError }) {
  const [{ isPending }] = usePayPalScriptReducer()

  if (isPending) {
    return <div style={s.loading}>Cargando PayPal...</div>
  }

  return (
    <div style={s.wrapper}>
      <PayPalButtons
        style={{
          layout:  'vertical',
          color:   'black',
          shape:   'rect',
          label:   'pay',
          height:  40,
        }}
        forceReRender={[amount]}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value:         amount.toFixed(2),
                currency_code: 'USD',
              },
              description: 'Compra en ShopEasy',
            }],
          })
        }}
        onApprove={async (data, actions) => {
          const details = await actions.order.capture()
          onSuccess(details)
        }}
        onError={(err) => {
          console.error('PayPal error:', err)
          onError?.()
        }}
        onCancel={() => {
          console.log('Pago cancelado por el usuario')
        }}
      />
    </div>
  )
}