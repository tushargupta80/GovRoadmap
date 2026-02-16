import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency in INR
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount)
}

/**
 * Format currency in USD (for Stripe)
 */
export function formatUSD(amountInCents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amountInCents / 100)
}

/**
 * Format percentage for display
 */
export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`
}

/**
 * Format date in readable format
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

/**
 * Format time for display
 */
export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(d)
}

/**
 * Calculate days remaining until target date
 */
export function daysRemaining(targetDate: Date | string): number {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate
  const today = new Date()
  const diffTime = target.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Truncate long text with ellipsis
 */
export function truncate(text: string, length: number): string {
  return text.length > length ? text.substring(0, length) + '...' : text
}

/**
 * Calculate average of numbers
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return Math.round(numbers.reduce((a, b) => a + b, 0) / numbers.length)
}

/**
 * Get difficulty badge color
 */
export function getDifficultyColor(difficulty: 'Easy' | 'Medium' | 'Hard'): string {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
    case 'Medium':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
    case 'Hard':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
