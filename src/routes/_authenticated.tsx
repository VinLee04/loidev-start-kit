import { sessionQueryOptions } from '#/features/auth/server/session.ts';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import type { User } from 'better-auth/db';

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: async ({ context }): Promise<{ user: User; isAdmin: boolean }> => {
    const { isLoggedIn, user, isAdmin } = await context.queryClient.ensureQueryData(sessionQueryOptions);
    if (!isLoggedIn || !user) {
      throw redirect({
        to: '..'
      })
    }

    return { user, isAdmin };
  }
})

function RouteComponent() {
  return <Outlet />
}
