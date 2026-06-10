export function calculateShipping(subtotal) {
  return subtotal > 50 ? 0 : 5.99
}

export function calculateTax(subtotal) {
  return subtotal * 0.13
}

export function calculateTotal(subtotal) {
  const shipping = calculateShipping(subtotal)
  const tax = calculateTax(subtotal)
  return subtotal + shipping + tax
}

export function getPrices(subtotal) {
  return {
    shipping: calculateShipping(subtotal),
    tax: calculateTax(subtotal),
    total: calculateTotal(subtotal),
  }
}
