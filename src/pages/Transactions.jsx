import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../data/supabase.js'
import '../styles/pages/Transactions.css'

const METHOD_LABELS = {
  paypal: 'Paypal',
  card:   'Tarjeta de crédito/débito',
  cash:   'Paga al recibir',
}

export default function Transactions() {
  const { currentUser, isAdmin, isLoading: authLoading } = useAuth()
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    const fetchOrders = async () => {
      try {
        let query = supabase.from('orders').select('*')

        if (!isAdmin && currentUser) {
          query = query.eq('user_id', currentUser.id)
        }

        const { data, error } = await query.order('created_at', { ascending: false })

        if (!error) setOrders(data || [])
      } catch (err) {
        console.error('Error fetching orders:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [currentUser, isAdmin, authLoading])

  const totalVentas   = orders.reduce((acc, o) => acc + Number(o.total), 0)
  const totalCompras  = orders.length

  if (loading || authLoading) {
    return (
      <div className="tx-page">
        <p className="tx-loading">Cargando compras...</p>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="tx-page">
        <div className="tx-empty">
          <h2>Debes iniciar sesión para ver tus compras</h2>
          <p>Por favor, <a href="/auth">inicia sesión aquí</a></p>
        </div>
      </div>
    )
  }

  return (
    <div className="tx-page">
      <div className="tx-header">
        <h1 className="tx-title">
          {isAdmin ? 'Historial de Compras (Admin)' : 'Mis Compras'}
        </h1>
        <p className="tx-subtitle">
          {totalCompras} {isAdmin ? 'compras totales' : 'compras registradas'}
        </p>
      </div>

      {/* Resumen */}
      <div className="tx-summary">
        <div className="tx-summary-item">
          <span className="tx-summary-label">Total compras</span>
          <span className="tx-summary-val">L{totalVentas.toFixed(2)}</span>
        </div>
        <div className="tx-summary-item">
          <span className="tx-summary-label">Compras</span>
          <span className="tx-summary-val">{totalCompras}</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <p className="tx-empty">No hay compras todavía.</p>
      ) : (
        <div className="tx-table-wrapper">
          <table className="tx-table">
            <thead>
              <tr>
                <th className="tx-th">ID Orden</th>
                <th className="tx-th">Cliente</th>
                <th className="tx-th">Método</th>
                <th className="tx-th">Productos</th>
                <th className="tx-th">Total</th>
                <th className="tx-th">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order.id} className={i % 2 === 0 ? 'tx-row' : 'tx-row tx-row--alt'}>
                  <td className="tx-td tx-td--mono">{order.id}</td>
                  <td className="tx-td">
                    <div className="tx-client-name">
                      {order.shipping?.firstName} {order.shipping?.lastName}
                    </div>
                    <div className="tx-client-email">{order.shipping?.email}</div>
                  </td>
                  <td className="tx-td">
                    <span className="tx-method">
                      {METHOD_LABELS[order.payment?.method] || order.payment?.method}
                    </span>
                  </td>
                  <td className="tx-td">
                    {order.items?.map(({ product, quantity }) => (
                      <div key={product.id} className="tx-product-row">
                        {product.name} <span className="tx-product-qty">×{quantity}</span>
                      </div>
                    ))}
                  </td>
                  <td className="tx-td tx-td--amount">L{Number(order.total).toFixed(2)}</td>
                  <td className="tx-td tx-td--date">
                    {new Date(order.created_at).toLocaleDateString('es-HN', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}