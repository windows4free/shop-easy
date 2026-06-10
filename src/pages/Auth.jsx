import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import '../styles/pages/Auth.css'

export default function Auth() {
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
  })

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validateForm = () => {
    setError('')
    if (!form.email.trim()) return setError('Email is required')
    if (!validateEmail(form.email)) return setError('Invalid email format')
    if (form.password.length < 6) return setError('Password must be at least 6 characters')
    if (isSignup && !form.fullName.trim()) return setError('Full name is required')
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      if (isSignup) {
        await signup(form.email, form.password, form.fullName)
      } else {
        await login(form.email, form.password)
      }
      navigate('/catalog')
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">
            {isSignup ? 'Create Account' : 'Sign In'}
          </h1>

          <form onSubmit={handleSubmit} className="auth-form">
            {isSignup && (
              <div className="auth-field">
                <label className="auth-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder="John Doe"
                  disabled={loading}
                />
              </div>
            )}

            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="auth-input"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="auth-input"
                placeholder="••••••"
                disabled={loading}
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
              disabled={loading}
            >
              {loading ? 'Loading...' : isSignup ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              {' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup)
                  setError('')
                  setForm({ email: '', password: '', fullName: '' })
                }}
                className="auth-toggle"
                disabled={loading}
              >
                {isSignup ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
