// lib/form/form-hook.ts
import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from './form-context.ts'
import {
  TextField,
  TextAreaField,
  SwitchField,
  SubscribeButton,
  ResetAndSubscribeForm,
} from './app-forms.tsx'

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextAreaField,
    SwitchField,
  },
  formComponents: {
    SubscribeButton,
    ResetAndSubscribeForm,
  },
})
