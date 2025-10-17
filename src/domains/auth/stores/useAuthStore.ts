import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  
  // Actions
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
  updatePassword: (newPassword: string) => Promise<{ error: any }>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: true,

      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),

      signIn: async (email, password) => {
        set({ isLoading: true })
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          set({ isLoading: false })
          return { error }
        }

        set({
          user: data.user,
          session: data.session,
          isLoading: false,
        })

        return { error: null }
      },

      signUp: async (email, password, metadata = {}) => {
        set({ isLoading: true })
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: metadata,
          },
        })

        if (error) {
          set({ isLoading: false })
          return { error }
        }

        set({
          user: data.user,
          session: data.session,
          isLoading: false,
        })

        return { error: null }
      },

      signOut: async () => {
        await supabase.auth.signOut()
        set({ user: null, session: null })
      },

      resetPassword: async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        })
        return { error }
      },

      updatePassword: async (newPassword) => {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        })
        return { error }
      },

      initialize: async () => {
        set({ isLoading: true })
        
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession()
        
        set({
          user: session?.user ?? null,
          session: session ?? null,
          isLoading: false,
        })

        // Listen for auth changes
        supabase.auth.onAuthStateChange((_event, session) => {
          set({
            user: session?.user ?? null,
            session: session ?? null,
          })
        })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
      }),
    }
  )
)
