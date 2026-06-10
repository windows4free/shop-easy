import { createContext, useContext, useReducer } from 'react'

const initialState = {
  items: [],
}

function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.product.id === action.payload.id)
      if (exists) {
        return {
          ...state,
          items: state.items.map(i =>
            i.product.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }]
      }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(i => i.product.id !== action.payload)
      }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity < 1) {
        return {
          ...state,
          items: state.items.filter(i => i.product.id !== action.payload.id)
        }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        )
      }
    }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    default:
      return state
  }
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const agregarProducto    = (product)      => dispatch({ type: 'ADD_ITEM',        payload: product })
  const removerProducto = (productId)    => dispatch({ type: 'REMOVE_ITEM',     payload: productId })
  const actualizarQty  = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  const limpiarCarrito  = ()             => dispatch({ type: 'CLEAR_CART' })

  const totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0)
  const totalPrice = state.items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      totalItems,
      totalPrice,
      agregarProducto,
      removerProducto,
      actualizarQty,
      limpiarCarrito,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}