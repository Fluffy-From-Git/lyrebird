"use client";
import Image from "next/image";
import { SignInSchema, SignInInputs } from "@/validation/signin";
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
import { loginUserAction } from "@/actions/login-user-action";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LogInPage() {
  const form = useForm<SignInInputs>({
    resolver: valibotResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const { handleSubmit, control, formState, setError } = form;

  const submit = async (data: SignInInputs) => {
    const res = await loginUserAction(data);

    if (res.success) {
      router.push("/dashboard");
    } else {
      switch (res.statusCode) {
        case 401:
          setError("password", { message: res.error });
          break;
        case 500:
        default:
          const error = res.error || "Internal Server Error";
          setError("password", { message: error });
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
          className="mx-auto h-10 w-auto"
        />
        <div className="w-full max-w-md space-y-10 shadow-md rounded-md p-6 bg-white">
          <div>
            <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(submit)} className="space-y-6">
              <div>
                <div className="col-span-2">
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
                            className="block w-full border h-14 rounded-none bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:rounded sm:text-sm/6"
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
                            className="block w-full border h-14 rounded-none bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:rounded sm:text-sm/6"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="text-sm/6">
                  <Link
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="w-full"
                >
                  Sign in
                </Button>
              </div>
            </form>
          </Form>
          <p className="text-center text-sm/6 text-gray-500">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign up to start a free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
