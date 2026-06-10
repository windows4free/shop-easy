export function calcularEnvio(subtotal) {
  return subtotal > 50 ? 0 : 5.99
}

export function calcularImpuesto(subtotal) {
  return subtotal * 0.13
}

export function calcularTotal(subtotal) {
  const envio = calcularEnvio(subtotal)
  const impuesto = calcularImpuesto(subtotal)
  return subtotal + envio + impuesto
}

export function obtenerPrecios(subtotal) {
  return {
    shipping: calcularEnvio(subtotal),
    tax: calcularImpuesto(subtotal),
    total: calcularTotal(subtotal),
  }
}
