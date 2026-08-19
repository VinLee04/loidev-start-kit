// lib/form/app-forms.tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '#/components/ui/input-group.tsx'
import { Spinner } from '#/components/ui/spinner.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Field, FieldError, FieldLabel } from '@/components/ui/field.tsx'
import { Switch } from '@/components/ui/switch.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import type { LucideIcon } from 'lucide-react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useFieldContext, useFormContext } from './form-context'
import { useFieldStatus } from './use-field-status'
import { useSelector } from '@tanstack/react-form'

export function TextField({
  ref,
  label,
  type = 'text',
  placeholder,
  autoFocus,
  Icon,
}: {
  ref?: React.Ref<HTMLInputElement>
  label?: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  autoFocus?: boolean
  Icon?: LucideIcon
}) {
  const field = useFieldContext<string>()
  const { isInvalid, fieldErrors } = useFieldStatus()
  const [isHidePassword, setIsHidePassword] = useState(true)

  return (
    <Field data-invalid={isInvalid} className="gap-1.5">
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <InputGroup>
        {Icon && (
          <InputGroupAddon align="inline-start">
            <Icon />
          </InputGroupAddon>
        )}
        {type == 'password' && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setIsHidePassword((prev) => !prev)}
              tabIndex={-1}
              className="rounded-md"
            >
              {isHidePassword ? <EyeIcon /> : <EyeOffIcon />}
            </InputGroupButton>
          </InputGroupAddon>
        )}
        <InputGroupInput
          ref={ref}
          autoComplete="off"
          id={field.name}
          name={field.name}
          type={isHidePassword ? type : 'text'}
          placeholder={placeholder}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          autoFocus={autoFocus}
        />
      </InputGroup>
      {isInvalid && <FieldError errors={fieldErrors} />}
    </Field>
  )
}

export function TextAreaField({
  label,
  placeholder,
  rows = 4,
}: {
  label?: string
  placeholder?: string
  rows?: number
}) {
  const field = useFieldContext<string>()
  const { isInvalid, fieldErrors } = useFieldStatus()

  return (
    <Field data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Textarea
        id={field.name}
        name={field.name}
        placeholder={placeholder}
        rows={rows}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
      />
      {isInvalid && <FieldError errors={fieldErrors} />}
    </Field>
  )
}

export function SwitchField({
  label,
  description,
}: {
  label?: string
  description?: string // dòng mô tả nhỏ bên dưới label (tuỳ chọn)
}) {
  const field = useFieldContext<boolean>()
  const { isInvalid, fieldErrors } = useFieldStatus()

  return (
    <Field data-invalid={isInvalid}>
      {/* Layout ngang: text bên trái, switch bên phải */}
      <div className="flex items-center justify-between gap-4">
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <FieldLabel htmlFor={field.name} className="cursor-pointer">
                {label}
              </FieldLabel>
            )}
            {description && (
              <p className="text-muted-foreground text-sm">{description}</p>
            )}
          </div>
        )}
        <Switch
          id={field.name}
          checked={field.state.value}
          onBlur={field.handleBlur}
          onCheckedChange={(checked) => field.handleChange(checked)}
          aria-invalid={isInvalid}
        />
      </div>
      {isInvalid && <FieldError errors={fieldErrors} />}
    </Field>
  )
}

export function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(s) => s.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer mt-4"
        >
          {isSubmitting ? (
            <>
              <Spinner className="mr-2" />
              Loading...
            </>
          ) : (
            label
          )}
        </Button>
      )}
    </form.Subscribe>
  )
}

export function ResetAndSubscribeForm({ label }: { label: string }) {
  const form = useFormContext()
  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting)

  return (
    <div className="flex gap-2 w-full">
      <Button
        type="reset"
        variant="secondary"
        disabled={isSubmitting}
        className="cursor-pointer mt-4 min-w-32 sm:min-w-40"
        onClick={() => {
          form.reset()
          ;(document.querySelector('form input') as HTMLFormElement).focus()
        }}
      >
        Reset
      </Button>
      <div className="flex-1">
        <SubscribeButton label={label} />
      </div>
    </div>
  )
}
