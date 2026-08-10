import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authentication/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      hihi

    </div>
  )
}
