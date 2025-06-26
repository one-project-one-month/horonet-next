import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import type { SignInSchemaType } from "@/database/validators";

import { Button } from "@/components/ui/button";
import { SignInSchema } from "@/database/validators";
import { authClient } from "@/lib/auth-client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import PasswordField from "./password-field";

const SignInForm = () => {
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: SignInSchemaType) => {
    await authClient.signIn.email(
      {
        ...data,
      },
      {
        onSuccess: () => {
          toast.success("Sign In successfully");
          navigate("/app/horoscope");
        },
        onError: (ctx) => {
          toast.error("Sign In failed", { description: ctx.error.message });
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
                  <span>Signing In..</span>
                </>
              )
            : (
                <span>Sign In</span>
              )}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
