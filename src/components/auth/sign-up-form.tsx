import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import type { SignUpSchemaType } from "@/database/validators";

import { Button } from "@/components/ui/button";
import { SignUpSchema } from "@/database/validators";
import { authClient } from "@/lib/auth-client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import PasswordField from "./password-field";

const SignUpForm = () => {
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignUpSchemaType) => {
    await authClient.signUp.email(
      {
        name: data.fullName,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Sign up successfully");
          navigate(`/onboarding`);
        },
        onError: (ctx) => {
          toast.error("Sign In failed", {
            description: `ERROR: ${ctx.error.status}, ${ctx.error.message}`,
          });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col gap-y-5"}
      >
        <FormField
          control={form.control}
          name={"fullName"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-white"}>Full name:</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Eg: Super Mario"}
                  {...field}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-white"}>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Eg: super@gmail.com"}
                  {...field}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-white"}>Password</FormLabel>
              <FormControl>
                <PasswordField
                  onChange={field.onChange}
                  value={field.value}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"confirmPassword"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-white"}>Password</FormLabel>
              <FormControl>
                <PasswordField
                  onChange={field.onChange}
                  value={field.value}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className={"mt-4 w-full text-white"}
          variant={"cosmic"}
          type={"submit"}
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {form.formState.isSubmitting
            ? (
                <>
                  <Loader2 className={"mr-2 inline-block animate-spin"} />
                  <span>Signing Up..</span>
                </>
              )
            : (
                <span>Sign Up</span>
              )}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
