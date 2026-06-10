import '../../styles/components/checkout/ShippingForm.css'

const COUNTRIES = ['Honduras', 'Guatemala', 'El Salvador', 'Nicaragua', 'Costa Rica', 'Panamá', 'México']

export default function ShippingForm({ form, errors, onChange, onNext }) {
  const field = (name, placeholder) => (
    <input
      className={errors[name] ? 'sf-input--error' : 'sf-input'}
      value={form[name]}
      placeholder={placeholder}
      onChange={e => onChange({ ...form, [name]: e.target.value })}
    />
  )

  return (
    <>
      <div className="sf-section">
        <div className="sf-section-title">Información de contacto</div>

        <div className="sf-row-2">
          <div>
            <label className="sf-label">Nombre</label>
            {field('firstName')}
            {errors.firstName && <p className="sf-error-msg">{errors.firstName}</p>}
          </div>
          <div>
            <label className="sf-label">Apellido</label>
            {field('lastName')}
            {errors.lastName && <p className="sf-error-msg">{errors.lastName}</p>}
          </div>
        </div>

        <div className="sf-row-1">
          <label className="sf-label">Correo electrónico</label>
          {field('email', 'tu@correo.com')}
          {errors.email && <p className="sf-error-msg">{errors.email}</p>}
        </div>
      </div>

      <div className="sf-section">
        <div className="sf-section-title">Dirección de envío</div>

        <div className="sf-row-1">
          <label className="sf-label">Dirección</label>
          {field('address', 'Calle, número, colonia')}
          {errors.address && <p className="sf-error-msg">{errors.address}</p>}
        </div>

        <div className="sf-row-2">
          <div>
            <label className="sf-label">Ciudad</label>
            {field('city')}
            {errors.city && <p className="sf-error-msg">{errors.city}</p>}
          </div>
          <div>
            <label className="sf-label">Código postal</label>
            {field('zip')}
            {errors.zip && <p className="sf-error-msg">{errors.zip}</p>}
          </div>
        </div>

        <div className="sf-row-1">
          <label className="sf-label">País</label>
          <select
            className="sf-input"
            value={form.country}
            onChange={e => onChange({ ...form, country: e.target.value })}
          >
            {COUNTRIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <button className="sf-submit-btn" onClick={onNext}>
        Continuar al pago →
      </button>
    </>
  )
}
