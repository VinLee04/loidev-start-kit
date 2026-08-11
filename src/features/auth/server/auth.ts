import { auth } from "#/lib/auth.ts";
import { createServerFn } from "@tanstack/react-start";
import { signInSchema, signUpSchema } from "../schema";

export const signUpServerFn = createServerFn({ method: "POST" })
  .validator(signUpSchema)
  .handler(async ({ data }) => {
    await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
        image: `https://api.dicebear.com/10.x/planets/svg?seed=${data.name}`,
        callbackURL: `${process.env.APP_URL}/sign-up`,
      },
    });
  })


export const signInServerFn = createServerFn({ method: "POST" })
  .validator(signInSchema)
  .handler(async ({ data }) => {
    await auth.api.signInEmail({
      body: {
        ...data,
        callbackURL: `${process.env.APP_URL}/sign-in`,
      },
    });
  })