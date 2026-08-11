// lib/form/app-forms.tsx
import { useFieldContext, useFormContext } from "./form-context"
import { useFieldStatus } from "./use-field-status"
import { Textarea } from "@/components/ui/textarea.tsx"
import { Switch } from "@/components/ui/switch.tsx"
import { Field, FieldError, FieldLabel } from "@/components/ui/field.tsx"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button.tsx"

export function TextField({
  label,
  type = "text",
  placeholder,
  autoFocus,
}: {
  label?: string
  type?: "text" | "email" | "password"
  placeholder?: string
  autoFocus?: boolean
}) {
  const field = useFieldContext<string>()
  const { isInvalid, fieldErrors } = useFieldStatus()

  return (
    <Field data-invalid={isInvalid} className="gap-1.5">
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Input
        autoComplete='off'
        id={field.name}
        name={field.name}
        type={type}
        placeholder={placeholder}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        autoFocus={autoFocus}
      />
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
        <Button type="submit" disabled={isSubmitting} className="w-full cursor-pointer mt-4">
          {isSubmitting ? "Đang xử lý..." : label}
        </Button>
      )}
    </form.Subscribe>
  )
}