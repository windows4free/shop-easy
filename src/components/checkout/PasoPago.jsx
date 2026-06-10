import BotonPayPal from '../BotonPayPal.jsx'
import '../../styles/components/checkout/PasoPago.css'

const METODOS = [
  { id: 'paypal', label: 'PayPal' },
  { id: 'cash',   label: 'Pagar al recibir' },
]

export default function PasoPago({
  payMethod,
  onMethodChange,
  total,
  paypalError,
  onPayPalSuccess,
  onPayPalError,
  onCashConfirm,
  onBack,
}) {
  return (
    <>
      <div className="ps-section">
        <div className="ps-section-title">Método de pago</div>

        <div className="ps-methods">
          {METODOS.map(m => (
            <button
              key={m.id}
              className={payMethod === m.id ? 'ps-chip--active' : 'ps-chip'}
              onClick={() => onMethodChange(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>

        {payMethod === 'paypal' && (
          <>
            <BotonPayPal
              amount={total}
              onSuccess={onPayPalSuccess}
              onError={onPayPalError}
            />
            {paypalError && (
              <p className="ps-paypal-error">
                Ocurrió un error con PayPal. Intenta de nuevo o usa contra entrega.
              </p>
            )}
          </>
        )}

        {payMethod === 'cash' && (
          <>
            <div className="ps-sandbox-note ps-sandbox-note--center">
              Pagarás al recibir tu pedido en la dirección indicada.
            </div>
            <button className="ps-submit-btn" onClick={onCashConfirm}>
              Confirmar orden →
            </button>
          </>
        )}
      </div>

      <button className="ps-back-btn" onClick={onBack}>
        ← Volver
      </button>
    </>
  )
}
