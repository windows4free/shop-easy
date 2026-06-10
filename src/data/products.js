import { supabase } from './supabase.js'

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id')

  if (error) {
    console.error('Error al cargar productos de Supabase:', error.message)
    return []
  }

  return data
}

export async function fetchFeatured() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('id')

  if (error) {
    console.error('Error al cargar destacados:', error.message)
    return []
  }

  return data
}