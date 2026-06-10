import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../data/supabase.js'
import '../styles/pages/HistorialCompras.css'

const ETIQUETAS_METODO = {
  paypal: 'Paypal',
  card:   'Tarjeta de crédito/débito',
  cash:   'Paga al recibir',
}

export default function HistorialCompras() {
  const { usuarioActual, estaCargando: authCargando } = useAuth()
  const [ordenes,  setOrdenes]  = useState([])
  const [estaCargando, setEstaCargando] = useState(true)

  useEffect(() => {
    if (authCargando) return

    const obtenerOrdenes = async () => {
      try {
        const query = usuarioActual
          ? supabase.from('orders').select('*').eq('user_id', usuarioActual.id)
          : supabase.from('orders').select('*')

        const { data, error } = await query.order('created_at', { ascending: false })

        if (!error) setOrdenes(data || [])
      } catch (err) {
        console.error('Error fetching orders:', err)
      } finally {
        setEstaCargando(false)
      }
    }

    obtenerOrdenes()
  }, [usuarioActual, authCargando])

  const totalVentas   = ordenes.reduce((acc, o) => acc + Number(o.total), 0)
  const totalCompras  = ordenes.length

  if (estaCargando || authCargando) {
    return (
      <div className="tx-page">
        <p className="tx-loading">Cargando compras...</p>
      </div>
    )
  }

  if (!usuarioActual) {
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
        <h1 className="tx-title">Mis Compras</h1>
        <p className="tx-subtitle">
          {totalCompras} {totalCompras === 1 ? 'compra registrada' : 'compras registradas'}
        </p>
      </div>

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

      {ordenes.length === 0 ? (
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
              {ordenes.map((order, i) => (
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
                      {ETIQUETAS_METODO[order.payment?.method] || order.payment?.method}
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
