import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { usuarioActual, estaCargando } = useAuth()

  if (estaCargando) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Cargando...</div>
  if (!usuarioActual) return <Navigate to="/auth" replace />
  return children
}
