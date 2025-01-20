import * as v from "valibot";

export const RegistrationSchema = v.pipe(
  // Form inputs
  v.object({
    // Name
    name: v.pipe(
      v.string("Your name must be a string"),
      v.nonEmpty("Please enter your name"),
      v.minLength(3, "Your name must be at least 3 characters"),
    ),
    // Email
    email: v.pipe(
      v.string("Your email must be a string"),
      v.nonEmpty("Please enter your email"),
      v.email("Your email must be a valid email address"),
    ),
    // Password
    password: v.pipe(
      v.string("Your password must be a string"),
      v.nonEmpty("Please enter your password"),
      v.minLength(6, "Your password must be at least 6 characters"),
    ),
    // Confirm Password
    confirmPassword: v.pipe(
      v.string("Your confirm password must be a string"),
      v.nonEmpty("Please confirm your password"),
    ),
  }),

  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (inputs) => inputs.password === inputs.confirmPassword,
      "Please make sure your passwords match!",
    ),
    // if the password and confirm password match, error will be attached
    // to the confirmPassword field
    ["confirmPassword"],
  ),
);

export type RegistrationInputs = v.InferInput<typeof RegistrationSchema>;
