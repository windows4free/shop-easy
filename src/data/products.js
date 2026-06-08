export const PRODUCTS = [
  {
    "id": 1,
    "name": "Audífonos Premium BT",
    "category": "Electrónica",
    "price": 89.99,
    "description": "Audífonos inalámbricos con cancelación de ruido activa, batería de 30h y sonido Hi-Fi.",
    "stock": 15,
    "featured": true,
    "image": "audifonospremium.jpg"
  },
  {
    "id": 2,
    "name": "Sneakers Urbanas Classic",
    "category": "Calzado",
    "price": 54.00,
    "description": "Zapatillas de cuero sintético con suela vulcanizada. Cómodas para el día a día.",
    "stock": 30,
    "featured": true,
    "image": "sneakerscuero.jpg"
  },
  {
    "id": 3,
    "name": "Cargador Inalámbrico 20W",
    "category": "Electrónica",
    "price": 29.99,
    "description": "Carga rápida compatible con Qi. Diseño ultradelgado en aluminio cepillado.",
    "stock": 50,
    "featured": true,
    "image": "cargadori.jpg"
  },
  {
    "id": 4,
    "name": "Mochila Minimalista 20L",
    "category": "Accesorios",
    "price": 45.00,
    "description": "Mochila impermeable con compartimento para laptop 15''. Correas ergonómicas.",
    "stock": 20,
    "featured": false,
    "image": "mochilaim.jpg"
  },
  {
    "id": 5,
    "name": "Termo Acero Inoxidable",
    "category": "Hogar",
    "price": 22.50,
    "description": "500ml, mantiene temperatura 12h frío / 8h caliente. Sin BPA.",
    "stock": 40,
    "featured": false,
    "image": "termitos.jpg"
  },
  {
    "id": 6,
    "name": "Libro: Clean Code",
    "category": "Libros",
    "price": 18.00,
    "description": "Robert C. Martin. La guía definitiva para escribir código limpio y mantenible.",
    "stock": 25,
    "featured": false,
    "image": "librocode.jpg"
  },
  {
    "id": 7,
    "name": "Mouse Ergonómico Silent",
    "category": "Electrónica",
    "price": 34.99,
    "description": "Mouse inalámbrico silencioso con 6 botones programables y DPI ajustable.",
    "stock": 18,
    "featured": false,
    "image": "mouseina.jpg"
  },
  {
    "id": 8,
    "name": "Taza Cerámica Mate",
    "category": "Hogar",
    "price": 12.00,
    "description": "350ml. Acabado mate en negro. Apta para microondas y lavavajillas.",
    "stock": 60,
    "featured": false,
    "image": "tazamatte.jpg"
  },
  {
    "id": 9,
    "name": "Mando PlayStation 5",
    "category": "Electrónica",
    "price": 69.99,
    "description": "Mando para la consola PlayStation 5",
    "stock": 25,
    "featured": false,
    "image": "mandops5.jpg"
  },
  {
    "id": 10,
    "name": "Zapatillas Running Pro",
    "category": "Calzado",
    "price": 72.00,
    "description": "Zapatillas deportivas con amortiguación avanzada y suela antideslizante. Ideal para correr.",
    "stock": 22,
    "featured": false,
    "image": "zapatosrun.jpg"
  },
  {
    "id": 11,
    "name": "Cinturón de Cuero Genuino",
    "category": "Accesorios",
    "price": 28.00,
    "description": "Cinturón de cuero genuino con hebilla metálica. Disponible en marrón y negro.",
    "stock": 35,
    "featured": false,
    "image": "fajadecuero.jpg"
  },
  {
    "id": 12,
    "name": "Libro: The Pragmatic Programmer",
    "category": "Libros",
    "price": 21.00,
    "description": "David Thomas & Andrew Hunt. Guía esencial para desarrolladores modernos.",
    "stock": 20,
    "featured": false,
    "image": "librodesa.jpg"
  },
  {
    "id": 13,
    "name": "Teclado Mecánico Compacto",
    "category": "Electrónica",
    "price": 59.99,
    "description": "Teclado mecánico TKL con switches blue, retroiluminación RGB y cable USB-C desmontable.",
    "stock": 12,
    "featured": false,
    "image": "teclado.jpg"
  },
  {
    "id": 14,
    "name": "Set de Organización para Escritorio",
    "category": "Hogar",
    "price": 19.99,
    "description": "Set de 4 piezas en bambú para organizar escritorio. Incluye portalápices y bandeja.",
    "stock": 45,
    "featured": false,
    "image": "escritorio.jpg"
  },
]

export const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))]
