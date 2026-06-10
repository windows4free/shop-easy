import { useState, useMemo, useEffect } from 'react'
import { fetchProducts } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import '../styles/pages/Catalog.css'

export default function Catalog() {
  const [products,       setProducts]       = useState([])
  const [loading,        setLoading]        = useState(true)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [sort,           setSort]           = useState('default')

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const categories = ['Todos', ...new Set(products.map(p => p.category))]

  const filtered = useMemo(() => {
    let list = activeCategory === 'Todos'
      ? products
      : products.filter(p => p.category === activeCategory)

    if (sort === 'price-asc')  return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...list].sort((a, b) => b.price - a.price)
    if (sort === 'name')       return [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [products, activeCategory, sort])

  if (loading) {
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
        <h1 className="catalog-title">Catálogo</h1>
        <p className="catalog-subtitle">{products.length} productos disponibles</p>
      </div>

      <div className="catalog-toolbar">
        <div className="catalog-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={activeCategory === cat ? 'catalog-filter-btn--active' : 'catalog-filter-btn'}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="catalog-sort-row">
          <span className="catalog-sort-label">Ordenar:</span>
          <select className="catalog-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">Relevancia</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name">Nombre A–Z</option>
          </select>
          <span className="catalog-count">{filtered.length} resultados</span>
        </div>
      </div>

      <div className="catalog-grid">
        {filtered.length === 0
          ? <div className="catalog-empty">No hay productos en esta categoría.</div>
          : filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </div>
    </div>
  )
}