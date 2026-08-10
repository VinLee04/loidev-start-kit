import { createFileRoute } from '@tanstack/react-router'
import { getUsers } from '@/features/users'

export const Route = createFileRoute('/')({
  loader: async () => {
    const users = await getUsers();
    return users
  },
  component: Home,
  errorComponent: (e) => {
    console.log(e)
    return (
      <div>
        {JSON.stringify(e, null, 2)}
      </div>
    )
  }
})

function Home() {
  const data = Route.useLoaderData();
  
  return (
    <div className="p-8">
      {JSON.stringify(data[0], null, 2)}
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
    </div>
  )
}
