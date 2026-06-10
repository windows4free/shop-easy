import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { fetchProducts } from '../data/products.js'
import '../styles/pages/Home.css'

export default function Home() {
  const { addItem } = useCart()
  const [featured, setFeatured] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    fetchProducts().then(data => {
      setFeatured(data.filter(p => p.featured))
      setLoading(false)
    })
  }, [])

  return (
    <>
      <div className="home-page">
        <section className="home-hero">
          <h1 className="home-h1">Tu tienda,<br />sin complicaciones.</h1>
          <div className="home-cta">
            <Link to="/catalog" className="btn btn-primary">Ver catálogo</Link>
            <Link to="/cart"    className="btn btn-outline">Mi carrito</Link>
          </div>
        </section>

        <div className="home-section-header">
          <span className="home-section-title">Destacados</span>
          <Link to="/catalog" className="home-section-link">Ver todos →</Link>
        </div>

        {loading ? (
          <p style={{ fontSize: '13px', color: '#a3a3a3' }}>Cargando productos...</p>
        ) : (
          <div className="home-grid home-grid--3">
            {featured.map(product => (
              <div key={product.id} className="home-card">
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img
                    src={`/images/${product.image}`}
                    alt={product.name}
                    className="home-card-img"
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={400}
                  />
                  <div className="home-card-cat">{product.category}</div>
                  <div className="home-card-name">{product.name}</div>
                </Link>
                <div className="home-card-footer">
                  <span className="home-price">L{product.price.toFixed(2)}</span>
                  <button className="home-add-btn" onClick={() => addItem(product)}>
                    + Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}