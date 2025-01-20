"use server";
import * as v from "valibot";
import argon2 from "argon2";
import { RegistrationSchema } from "@/validation/registration";
import db from "@/drizzle";
import { lower, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

type Res =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 500 | 409 };

export async function registerUserAction(values: unknown): Promise<Res> {
  const parsedValues = v.safeParse(RegistrationSchema, values);

  if (!parsedValues.success) {
    const flatErrors = v.flatten(parsedValues.issues);
    return { success: false, error: flatErrors, statusCode: 400 };
  }

  const { name, email, password } = parsedValues.output;

  try {
    const exists = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(lower(users.email), email.toLowerCase()))
      .then((res) => res.length > 0);

    if (exists) {
      return {
        success: false,
        error: "email already exists",
        statusCode: 409,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "internal server error",
      statusCode: 500,
    };
  }

  try {
    // Hash the password
    const hashedPassword = await argon2.hash(password);

    // Insert the user into the database
    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
      });
    console.log(newUser);

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "internal server error",
      statusCode: 500,
    };
  }
}
