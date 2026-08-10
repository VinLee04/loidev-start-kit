// lib/form/use-field-status.ts
import { useSelector } from "@tanstack/react-store"
import { useFieldContext } from "./form-context"

export function useFieldStatus() {
  const field = useFieldContext<unknown>()

  const errors = useSelector(field.store, (s) => s.meta.errors)
  const isTouched = useSelector(field.store, (s) => s.meta.isTouched)
  const isValid = useSelector(field.store, (s) => s.meta.isValid)

  const isInvalid = isTouched && !isValid
  const fieldErrors = errors.map((e) => ({
    message: typeof e === "string" ? e : e.message,
  }))

  return { isInvalid, fieldErrors }
}