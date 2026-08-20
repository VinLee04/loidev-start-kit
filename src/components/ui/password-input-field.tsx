import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '#/components/ui/input-group.tsx'
import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react'
import * as React from 'react'
import { Label } from './label'

type PasswordInputFieldProps = {
  isPending: boolean
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
}

export const PasswordInputField = ({
  isPending,
  password,
  setPassword,
}: PasswordInputFieldProps) => {
  const [hide, setHide] = React.useState<boolean>(true)

  return (
    <>
      <Label>Password</Label>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <LockIcon />
        </InputGroupAddon>
        <InputGroupInput
          readOnly={isPending}
          type={hide ? 'password' : 'text'}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setHide((prev) => !prev)}
            tabIndex={-1}
            className="rounded-md"
          >
            {hide ? <EyeIcon /> : <EyeOffIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </>
  )
}
