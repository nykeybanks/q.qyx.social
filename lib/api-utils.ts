import { NextResponse } from 'next/server'
import type { ZodSchema } from 'zod'

/**
 * Validate request body against a Zod schema
 */
export async function validateRequest<T>(
  request: Request,
  schema: ZodSchema,
): Promise<{ data: T; error: null } | { data: null; error: NextResponse }> {
  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return {
        data: null,
        error: NextResponse.json(
          { error: 'Invalid request body', details: parsed.error.errors },
          { status: 400 },
        ),
      }
    }

    return { data: parsed.data as T, error: null }
  } catch (error) {
    return {
      data: null,
      error: NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }),
    }
  }
}

/**
 * Sanitize string input
 */
export function sanitizeInput(input: string, maxLength: number = 5000): string {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Remove potential HTML tags
}

/**
 * Generate a standardized API error response
 */
export function apiError(message: string, status: number = 500) {
  return NextResponse.json({ error: message }, { status })
}

/**
 * Generate a standardized API success response
 */
export function apiSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status })
}

/**
 * Rate limit handler (basic in-memory implementation)
 */
const rateLimitStore = new Map<string, { count: number; reset: number }>()

export function checkRateLimit(identifier: string, limit: number = 100, windowMs: number = 60000): boolean {
  const now = Date.now()
  const data = rateLimitStore.get(identifier)

  if (!data || now > data.reset) {
    rateLimitStore.set(identifier, { count: 1, reset: now + windowMs })
    return true
  }

  if (data.count >= limit) {
    return false
  }

  data.count++
  return true
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate username format
 */
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,32}$/
  return usernameRegex.test(username)
}
