import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from '@/lib/auth.ts'
import { queryOptions } from '@tanstack/react-query'

export const getSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })

    return {
      session,
      user: session?.user ?? null,
      isAdmin: session?.user.role === 'admin',
      isLoggedIn: !!session?.user,
    }
  },
)

export const ensureSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })

    if (!session) {
      throw new Error('Unauthorized')
    }

    return session
  },
)

export const sessionQueryOptions = queryOptions({
  queryKey: ['session'],
  queryFn: () => getSession(),
  staleTime: 1000 * 60 * 5, // cache 5 phút
})
