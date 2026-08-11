import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from 'react'

type AuthWrapperProps = {
  title?: string
  description?: string
  footer?: React.ReactNode
  children: React.ReactNode
}

const AuthWrapper = ({
  title = 'Title',
  description = 'Description',
  footer = 'Footer',
  children
}: AuthWrapperProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <Card className="w-full max-w-md shadow-none border-0">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        <CardFooter>
          {footer}
        </CardFooter>
      </Card>
    </div>
  )
}

export default AuthWrapper