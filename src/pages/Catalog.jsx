import { useState, useMemo } from 'react'
import { PRODUCTS, CATEGORIES } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

const s = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '2rem 2rem 4rem' },
  header: { padding: '2.5rem 0 2rem' },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem',
    letterSpacing: '-0.02em',
    marginBottom: '0.4rem',
  },
  subtitle: { fontSize: '13px', color: '#a3a3a3' },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #e5e5e5',
    borderBottom: '1px solid #e5e5e5',
    padding: '0.75rem 0',
    marginBottom: '1.75rem',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  filters: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  filterBtn: {
    fontSize: '12px',
    padding: '4px 12px',
    border: '1px solid #e5e5e5',
    borderRadius: '2px',
    background: 'none',
    cursor: 'pointer',
    transition: 'all 150ms',
    fontFamily: "'DM Sans', sans-serif",
    color: '#525252',
  },
  filterBtnActive: {
    fontSize: '12px',
    padding: '4px 12px',
    border: '1px solid #0f0f0f',
    borderRadius: '2px',
    background: '#0f0f0f',
    color: '#fafafa',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
  },
  sortRow: { display: 'flex', alignItems: 'center', gap: '8px' },
  sortLabel: { fontSize: '12px', color: '#a3a3a3' },
  select: {
    fontSize: '12px',
    border: '1px solid #e5e5e5',
    borderRadius: '2px',
    padding: '4px 8px',
    background: '#fafafa',
    color: '#0f0f0f',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1px',
    background: '#e5e5e5',
  },
  empty: {
    padding: '4rem 0',
    textAlign: 'center',
    color: '#a3a3a3',
    fontSize: '14px',
    gridColumn: '1 / -1',
    background: '#fafafa',
  },
  count: { fontSize: '12px', color: '#a3a3a3' },
}

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [sort, setSort] = useState('default')

  const filtered = useMemo(() => {
    let list = activeCategory === 'Todos'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeCategory)

    if (sort === 'price-asc')  return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...list].sort((a, b) => b.price - a.price)
    if (sort === 'name')       return [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [activeCategory, sort])

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.title}>Catálogo</h1>
        <p style={s.subtitle}>{PRODUCTS.length} productos disponibles</p>
      </div>

      <div style={s.toolbar}>
        <div style={s.filters}>
          {['Todos', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              style={activeCategory === cat ? s.filterBtnActive : s.filterBtn}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div style={s.sortRow}>
          <span style={s.sortLabel}>Ordenar:</span>
          <select style={s.select} value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">Relevancia</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name">Nombre A–Z</option>
          </select>
          <span style={s.count}>{filtered.length} resultados</span>
        </div>
      </div>

      <div style={s.grid}>
        {filtered.length === 0
          ? <div style={s.empty}>No hay productos en esta categoría.</div>
          : filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </div>
    </div>
  )
}
