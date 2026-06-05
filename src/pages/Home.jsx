import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { PRODUCTS } from '../data/products.js'
import '../styles/pages/Home.css'

const FEATURED = PRODUCTS.filter(p => p.featured)

export default function Home() {
  const { addItem } = useCart()

  return (
    <>
      <div className="home-page">
        {/* Hero */}
        <section className="home-hero">
          <span className="home-tag">Prototipo académico · Sala 14</span>
          <h1 className="home-h1">Tu tienda,<br />sin complicaciones.</h1>
          <div className="home-cta">
            <Link to="/catalog" className="btn btn-primary">Ver catálogo</Link>
            <Link to="/cart"    className="btn btn-outline">Mi carrito</Link>
          </div>
        </section>

        {/* Featured products */}
        <div className="home-section-header">
          <span className="home-section-title">Destacados</span>
          <Link to="/catalog" className="home-section-link">Ver todos →</Link>
        </div>

        <div className="home-grid home-grid--3">
          {FEATURED.map(product => (
            <div key={product.id} className="home-card">
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="home-card-img">{product.emoji}</div>
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
      </div>
    </>
  )
}
