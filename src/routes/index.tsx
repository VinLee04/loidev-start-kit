import TanstackStartStarterGithubRepo from '#/components/github-repo.tsx'
import Header from '#/components/layout/header.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: async () => {
    try {
      const res = await fetch(
        'https://api.github.com/repos/VinLee04/loidev-start-kit',
      )
      if (!res.ok) throw new Error('Failed to fetch repo data')
      const data = await res.json()
      return {
        stars: data.stargazers_count as number,
        updatedAt: data.pushed_at as string,
      }
    } catch {
      return { stars: null, updatedAt: null }
    }
  },
  component: Home,
})

function Home() {
  return (
    <>
      <Header />
      <div className="h-svh flex items-center justify-center">
        <TanstackStartStarterGithubRepo />
      </div>
    </>
  )
}
