import { supabase } from '../data/supabase.js'

export const authService = {
  async signup(email, password, fullName) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      })

      if (authError) throw new Error(authError.message)
      if (!authData.user) throw new Error('Signup failed')

      return { user: authData.user, session: authData.session }
    } catch (err) {
      throw new Error(err.message || 'Signup failed')
    }
  },

  async login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw new Error(error.message)
      if (!data.user) throw new Error('Login failed')

      return { user: data.user, session: data.session }
    } catch (err) {
      throw new Error(err.message || 'Invalid email or password')
    }
  },

  async logout() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw new Error(error.message)
    } catch (err) {
      throw new Error(err.message || 'Logout failed')
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw new Error(error.message)
      return user
    } catch (err) {
      return null
    }
  },

  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw new Error(error.message)
      return session
    } catch (err) {
      return null
    }
  },

  async isUserAdmin(email) {
    const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',').map(e => e.trim()) || []
    return adminEmails.includes(email)
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}
