import { useState, useMemo, useEffect } from 'react'
import { fetchProducts } from '../data/products.js'
import TarjetaProducto from '../components/TarjetaProducto.jsx'
import '../styles/pages/Productos.css'

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [estaCargando, setEstaCargando] = useState(true)
  const [categoriaActiva, setcategoriaActiva] = useState('Todos')
  const [ordenamiento, setOrdenamiento] = useState('default')

  useEffect(() => {
    fetchProducts().then(data => {
      setProductos(data)
      setEstaCargando(false)
    })
  }, [])

  const categorias = ['Todos', ...new Set(productos.map(p => p.category))]

  const filtrado = useMemo(() => {
    let lista = categoriaActiva === 'Todos'
      ? productos
      : productos.filter(p => p.category === categoriaActiva)

    if (ordenamiento === 'price-asc')  return [...lista].sort((a, b) => a.price - b.price)
    if (ordenamiento === 'price-desc') return [...lista].sort((a, b) => b.price - a.price)
    if (ordenamiento === 'name')       return [...lista].sort((a, b) => a.name.localeCompare(b.name))
    return lista
  }, [productos, categoriaActiva, ordenamiento])

  if (estaCargando) {
    return (
      <div className="catalog-page">
        <div className="catalog-header">
          <p className="catalog-subtitle">Cargando productos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1 className="catalog-title">Productos</h1>
        <p className="catalog-subtitle">{productos.length} productos disponibles</p>
      </div>

      <div className="catalog-toolbar">
        <div className="catalog-filters">
          {categorias.map(cat => (
            <button
              key={cat}
              className={categoriaActiva === cat ? 'catalog-filter-btn--active' : 'catalog-filter-btn'}
              onClick={() => setcategoriaActiva(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="catalog-sort-row">
          <span className="catalog-sort-label">Ordenar:</span>
          <select className="catalog-select" value={ordenamiento} onChange={e => setOrdenamiento(e.target.value)}>
            <option value="default">Relevancia</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name">Nombre A–Z</option>
          </select>
          <span className="catalog-count">{filtrado.length} resultados</span>
        </div>
      </div>

      <div className="catalog-grid">
        {filtrado.length === 0
          ? <div className="catalog-empty">No hay productos en esta categoría.</div>
          : filtrado.map(product => (
              <TarjetaProducto key={product.id} product={product} />
            ))
        }
      </div>
    </div>
  )
}
