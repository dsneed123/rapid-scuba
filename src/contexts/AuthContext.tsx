import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import * as api from '@/lib/api'

type AuthState = {
  user: api.User | null
  loading: boolean
  signup: (data: {
    email: string
    password: string
    firstName: string
    lastName?: string
  }) => Promise<api.User>
  login: (data: { email: string; password: string }) => Promise<api.User>
  logout: () => Promise<void>
  refresh: () => Promise<void>
  updateProfile: (data: api.ProfileUpdate) => Promise<api.User>
  deleteAccount: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<api.User | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const { user } = await api.fetchMe()
      setUser(user)
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        await api.ensureCsrf()
      } catch {
        // CSRF endpoint unreachable — let other calls fail naturally.
      }
      if (cancelled) return
      try {
        const { user } = await api.fetchMe()
        if (!cancelled) setUser(user)
      } catch {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const signup = useCallback(async (data: Parameters<AuthState['signup']>[0]) => {
    const res = await api.signup(data)
    setUser(res.user)
    return res.user
  }, [])

  const login = useCallback(async (data: { email: string; password: string }) => {
    const res = await api.login(data)
    setUser(res.user)
    return res.user
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.logout()
    } finally {
      setUser(null)
    }
  }, [])

  const updateProfile = useCallback(async (data: api.ProfileUpdate) => {
    const res = await api.updateProfile(data)
    setUser(res.user)
    return res.user
  }, [])

  const deleteAccount = useCallback(async () => {
    await api.deleteAccount()
    setUser(null)
  }, [])

  const value = useMemo<AuthState>(
    () => ({
      user,
      loading,
      signup,
      login,
      logout,
      refresh,
      updateProfile,
      deleteAccount,
    }),
    [user, loading, signup, login, logout, refresh, updateProfile, deleteAccount],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
