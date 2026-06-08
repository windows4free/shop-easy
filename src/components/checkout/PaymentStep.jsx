import PayPalButton from '../PayPalButton.jsx'
import '../../styles/components/checkout/PaymentStep.css'

const METHODS = [
  { id: 'paypal', label: '🅿 PayPal' },
  { id: 'cash',   label: '💵 Contra entrega' },
]

export default function PaymentStep({
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
          {METHODS.map(m => (
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
            <div className="ps-sandbox-note">
              🔒 <strong>Sandbox de PayPal</strong> — Usa una cuenta de prueba de PayPal.<br />
              Inicia sesión con tu cuenta sandbox en el popup que aparece.
            </div>
            <PayPalButton
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
