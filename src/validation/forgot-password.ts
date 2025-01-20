import * as v from "valibot";

export const ForgotPasswordSchema = v.object({
  // Email
  email: v.pipe(
    v.string("Your email must be a string"),
    v.nonEmpty("Please enter your email"),
    v.email("Your email must be a valid email address"),
  ),
});

export type ForgotPasswordInputs = v.InferInput<typeof ForgotPasswordSchema>;
