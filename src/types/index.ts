import { z } from 'zod'

// Product Category Schema
export const ProductCategorySchema = z.enum([
  'supplements',
  'blue-light-glasses',
  'wearables',
  'nootropics',
  'recovery',
  'sleep',
  'performance',
])

export type ProductCategory = z.infer<typeof ProductCategorySchema>

// Product Schema
export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  shortDescription: z.string().optional(),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  category: ProductCategorySchema,
  images: z.array(z.string()).min(1),
  features: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  ingredients: z.array(z.string()).optional(),
  inStock: z.boolean(),
  inventory: z.number().nonnegative(),
  sku: z.string(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type Product = z.infer<typeof ProductSchema>

// Cart Item Schema
export const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().positive().int(),
  product: ProductSchema,
})

export type CartItem = z.infer<typeof CartItemSchema>

// Cart Schema
export const CartSchema = z.object({
  items: z.array(CartItemSchema),
  subtotal: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  shipping: z.number().nonnegative(),
  total: z.number().nonnegative(),
})

export type Cart = z.infer<typeof CartSchema>

// User Profile Schema
export const UserProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type UserProfile = z.infer<typeof UserProfileSchema>

// Address Schema
export const AddressSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  phone: z.string().min(1, 'Phone is required'),
})

export type Address = z.infer<typeof AddressSchema>

// Order Status Schema
export const OrderStatusSchema = z.enum([
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
])

export type OrderStatus = z.infer<typeof OrderStatusSchema>

// Order Schema
export const OrderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(CartItemSchema),
  subtotal: z.number(),
  tax: z.number(),
  shipping: z.number(),
  total: z.number(),
  status: OrderStatusSchema,
  shippingAddress: AddressSchema,
  billingAddress: AddressSchema.optional(),
  paymentIntentId: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type Order = z.infer<typeof OrderSchema>
