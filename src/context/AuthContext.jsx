import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await authService.getCurrentUser()
        if (user) {
          setCurrentUser(user)
          const admin = await authService.isUserAdmin(user.email)
          setIsAdmin(admin)
        }
      } catch (err) {
        console.error('Auth init error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()

    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      if (session?.user) {
        setCurrentUser(session.user)
        authService.isUserAdmin(session.user.email).then(setIsAdmin)
      } else {
        setCurrentUser(null)
        setIsAdmin(false)
      }
    })

    return () => subscription?.unsubscribe?.()
  }, [])

  const signup = async (email, password, fullName) => {
    const { user } = await authService.signup(email, password, fullName)
    setCurrentUser(user)
    const admin = await authService.isUserAdmin(user.email)
    setIsAdmin(admin)
    return user
  }

  const login = async (email, password) => {
    const { user } = await authService.login(email, password)
    setCurrentUser(user)
    const admin = await authService.isUserAdmin(user.email)
    setIsAdmin(admin)
    return user
  }

  const logout = async () => {
    await authService.logout()
    setCurrentUser(null)
    setIsAdmin(false)
  }

  const value = {
    currentUser,
    isAdmin,
    isLoading,
    signup,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
