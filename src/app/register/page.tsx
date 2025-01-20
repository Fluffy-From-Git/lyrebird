"use client";
import Image from "next/image";
import {
  RegistrationSchema,
  RegistrationInputs,
} from "@/validation/registration";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUserAction } from "@/actions/register-user-action";

export default function SignUp() {
  const form = useForm<RegistrationInputs>({
    resolver: valibotResolver(RegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, control, formState, reset, setError } = form;

  const submit = async (data: RegistrationInputs) => {
    const res = await registerUserAction(data);
    if (res.success) {
      console.log("User signed up successfully");
      reset();
    } else {
      switch (res.statusCode) {
        case 400:
          const nestedErrors = res.error.nested;

          for (const key in nestedErrors) {
            setError(key as keyof RegistrationInputs, {
              message: nestedErrors[key]?.[0],
            });
          }
          break;
        case 500:
        default:
          const error = res.error || "Internal Server Error";
          setError("confirmPassword", { message: error });
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 flex-col gap-5">
        <Image
          alt="Lyrebird"
          src="https://cdn.prod.website-files.com/65bc2f3a6904e30369f2209a/66e39302f1dcd6d644794e10_Lyrebird-logo-main.svg"
          width={40}
          height={40}
          className="mx-auto h-14 w-auto"
        />
        <div className="w-full max-w-md space-y-10 shadow-md rounded-md p-6 bg-white">
          <div>
            <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Create a new account
            </h2>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(submit)} className="space-y-6">
              <div>
                <div className="col-span-2">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            autoComplete="name"
                            aria-label="Name"
                            className="block w-full h-14 rounded-t-md rounded-b-none border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:rounded sm:text-sm/6"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="-mt-px">
                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            id="email-address"
                            name="email"
                            placeholder="Email address"
                            autoComplete="email"
                            aria-label="Email address"
                            className="block w-full h-14 border rounded-none bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:rounded sm:text-sm/6"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="-mt-px">
                  <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            aria-label="Password"
                            className="block w-full border h-14  rounded-none bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:rounded sm:text-sm/6"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="-mt-px">
                  <FormField
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            placeholder="Confirm password"
                            autoComplete="current-password"
                            aria-label="Confirm password"
                            className="block w-full rounded-b-md h-14 rounded-t-none border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:rounded sm:text-sm/6"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="w-full"
                >
                  Sign up
                </Button>
              </div>
            </form>
          </Form>
          <p className="text-center text-sm/6 text-gray-500">
            Already a member?{" "}
            <a
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
