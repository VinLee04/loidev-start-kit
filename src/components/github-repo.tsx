import { Badge } from '@/components/reui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getRouteApi } from '@tanstack/react-router'
import {
  ArrowUpRightIcon,
  DatabaseIcon,
  LockIcon,
  PaletteIcon,
  RocketIcon,
  StarIcon,
  GithubIcon,
} from 'lucide-react'

const Route = getRouteApi('/')

const TanstackStartStarterGithubRepo = () => {
  const { stars, updatedAt } = Route.useLoaderData()

  const updatedLabel = updatedAt
    ? new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
        Math.round(
          (new Date(updatedAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
        ),
        'day',
      )
    : null

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-16 text-center">
      <Card className="w-full text-left">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="info-light" className="gap-1">
              <RocketIcon className="size-3" /> Work in progress
            </Badge>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <StarIcon className="size-3 text-yellow-400 fill-yellow-500" />
                {stars ?? '—'}
              </Badge>
              <Badge variant="outline">MIT License</Badge>
            </div>
          </div>
          <CardTitle className="text-xl items-center flex">
            Lợi Dev Start Kit
            {updatedLabel && (
              <Badge
                variant="success-light"
                className="text-xs text-muted-foreground ml-5"
              >
                Updated {updatedLabel}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Everything you need to start a TanStack Start project - auth,
            database, forms, and UI already wired up. Free to clone, free to
            deploy, ready to ship.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-2 text-sm">
              <LockIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>Auth via Better Auth</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <DatabaseIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>Drizzle ORM + PostgreSQL (Neon)</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <PaletteIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>shadcn/ui + Tailwind</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <RocketIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>Free deploy on Vercel</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {[
              'TanStack Start',
              'TanStack Query',
              'TanStack Table',
              'TanStack Form',
              'Zod',
              'TypeScript',
              'Tailwind',
              'Better Auth',
              'Drizzle ORM',
              'Resend',
            ].map((tag) => (
              <Badge key={tag} variant="outline" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          <Button asChild>
            <a
              href="https://start.vinhloi.tech"
              target="_blank"
              rel="noreferrer"
            >
              Live Demo <ArrowUpRightIcon className="size-4" />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/VinLee04/loidev-start-kit"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon className="size-4" /> Peek the code
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default TanstackStartStarterGithubRepo
