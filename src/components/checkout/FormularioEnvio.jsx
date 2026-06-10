import '../../styles/components/checkout/FormularioEnvio.css'

const PAISES = ['Honduras', 'Guatemala', 'El Salvador', 'Nicaragua', 'Costa Rica', 'Panamá', 'México']

export default function ShippingForm({ form, errors, onChange, onNext }) {
  const campo = (name, placeholder) => (
    <>
      <input
        className={errors[name] ? 'sf-input--error' : 'sf-input'}
        value={form[name]}
        placeholder={placeholder}
        onChange={e => onChange({ ...form, [name]: e.target.value })}
      />
      {errors[name] && <p className="sf-error-msg">{errors[name]}</p>}
    </>
  )

  return (
    <div>
      <div className="sf-section">
        <div className="sf-section-title">Información de contacto</div>

        <div className="sf-row-2">
          <div>
            <label className="sf-label">Nombre</label>
            {campo('firstName')}
          </div>
          <div>
            <label className="sf-label">Apellido</label>
            {campo('lastName')}
          </div>
        </div>

        <div className="sf-row-1">
          <label className="sf-label">Correo electrónico</label>
          {campo('email', 'tu@correo.com')}
        </div>
      </div>

      <div className="sf-section">
        <div className="sf-section-title">Dirección de envío</div>

        <div className="sf-row-1">
          <label className="sf-label">Dirección</label>
          {campo('address', 'Calle, número, colonia')}
        </div>

        <div className="sf-row-2">
          <div>
            <label className="sf-label">Ciudad</label>
            {campo('city')}
          </div>
          <div>
            <label className="sf-label">Código postal</label>
            {campo('zip')}
          </div>
        </div>

        <div className="sf-row-1">
          <label className="sf-label">País</label>
          <select
            className="sf-input"
            value={form.country}
            onChange={e => onChange({ ...form, country: e.target.value })}
          >
            {PAISES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <button className="sf-submit-btn" onClick={onNext}>
        Continuar al pago →
      </button>
    </div>
  )
}
