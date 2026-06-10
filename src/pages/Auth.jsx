import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import '../styles/pages/Auth.css'

export default function Auth() {
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const [esRegistro, setEsRegistro] = useState(false)
  const [estaCargando, setEstaCargando] = useState(false)
  const [error, setError] = useState('')
  const [formulario, setFormulario] = useState({
    email: '',
    password: '',
    fullName: '',
  })

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validarFormulario = () => {
    setError('')
    if (!formulario.email.trim()) return setError('El email es requerido')
    if (!validarEmail(formulario.email)) return setError('Formato de email inválido')
    if (formulario.password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres')
    if (esRegistro && !formulario.fullName.trim()) return setError('El nombre completo es requerido')
    return true
  }

  const manejarSubmit = async (e) => {
    e.preventDefault()
    if (!validarFormulario()) return

    setEstaCargando(true)
    try {
      if (esRegistro) {
        await signup(formulario.email, formulario.password, formulario.fullName)
      } else {
        await login(formulario.email, formulario.password)
      }
      navigate('/catalog')
    } catch (err) {
      setError(err.message || 'Falló la autenticación')
    } finally {
      setEstaCargando(false)
    }
  }

  const manejarCambio = (e) => {
    setFormulario(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">
            {esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h1>

          <form onSubmit={manejarSubmit} className="auth-form">
            {esRegistro && (
              <div className="auth-field">
                <label className="auth-label">Nombre Completo</label>
                <input
                  type="text"
                  name="fullName"
                  value={formulario.fullName}
                  onChange={manejarCambio}
                  className="auth-input"
                  placeholder="Juan Pérez"
                  disabled={estaCargando}
                />
              </div>
            )}

            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                type="email"
                name="email"
                value={formulario.email}
                onChange={manejarCambio}
                className="auth-input"
                placeholder="tu@correo.com"
                disabled={estaCargando}
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formulario.password}
                onChange={manejarCambio}
                className="auth-input"
                placeholder="••••••"
                disabled={estaCargando}
              />
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="auth-button"
              disabled={estaCargando}
            >
              {estaCargando ? 'Cargando...' : esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              {esRegistro ? '¿Ya tienes una cuenta?' : '¿No tienes cuenta?'}
              {' '}
              <button
                type="button"
                onClick={() => {
                  setEsRegistro(!esRegistro)
                  setError('')
                  setFormulario({ email: '', password: '', fullName: '' })
                }}
                className="auth-toggle"
                disabled={estaCargando}
              >
                {esRegistro ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
