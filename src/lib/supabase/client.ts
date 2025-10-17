import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

// Warning for development
if (supabaseUrl === 'https://demo.supabase.co') {
  console.warn(
    '⚠️  Using demo Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local for production.'
  )
}

/**
 * Supabase client for client-side operations
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Database types
 */
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          avatar: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      orders: {
        Row: {
          id: string
          user_id: string
          items: unknown
          subtotal: number
          tax: number
          shipping: number
          total: number
          status: string
          shipping_address: unknown
          billing_address: unknown | null
          payment_intent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          first_name: string
          last_name: string
          address1: string
          address2: string | null
          city: string
          state: string
          postal_code: string
          country: string
          phone: string
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['addresses']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['addresses']['Insert']>
      }
    }
  }
}
