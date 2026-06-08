import '../../styles/components/checkout/CheckoutSteps.css'

const STEPS = [
  { n: 1, label: 'Envío' },
  { n: 2, label: 'Pago' },
  { n: 3, label: 'Confirmación' },
]

export default function CheckoutSteps({ currentStep }) {
  return (
    <div className="co-steps">
      {STEPS.map(({ n, label }, i) => (
        <span key={n} style={{ display: 'flex', alignItems: 'center' }}>
          <span className={currentStep === n ? 'co-step--active' : 'co-step'}>
            <span className={
              currentStep === n ? 'co-step-num--active'
              : currentStep > n ? 'co-step-num--done'
              : 'co-step-num'
            }>
              {currentStep > n ? '✓' : n}
            </span>
            {label}
          </span>
          {i < STEPS.length - 1 && <span className="co-step-arrow">›</span>}
        </span>
      ))}
    </div>
  )
}
