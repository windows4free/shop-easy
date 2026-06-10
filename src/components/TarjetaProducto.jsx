import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import '../styles/components/TarjetaProducto.css'

export default function TarjetaProducto({ product }) {
  const { agregarProducto } = useCart()
  const [agregado, setAgregado] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    agregarProducto(product)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 1200)
  }

  return (
    <div className="pcard">
      <Link to={`/product/${product.id}`} className="pcard-img-link">
        <img
          src={`/images/${product.image}`}
          alt={product.name}
          className="pcard-img"
          loading="lazy"
          decoding="async"
          width={400}
          height={400}
        />
      </Link>

      <div className="pcard-cat">{product.category}</div>

      <Link to={`/product/${product.id}`} className="pcard-name">
        {product.name}
      </Link>

      <p className="pcard-desc">{product.description}</p>

      <div className="pcard-footer">
        <span className="pcard-price">L{product.price.toFixed(2)}</span>

        {agregado
          ? <span className="pcard-added">✓ Agregado</span>
          : <button className="pcard-add-btn" onClick={handleAdd}>+ Carrito</button>
        }
      </div>
      <div className="pcard-stock">Stock: {product.stock} uds.</div>
    </div>
  )
}
