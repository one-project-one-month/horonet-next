import type { User } from "better-auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useRouteLoaderData } from "react-router";
import { toast } from "sonner";

import type { OnboardingSchemaType } from "@/database/validators";

import BirthdayPicker from "@/components/onboarding/birthday-picker";
import GenderPicker from "@/components/onboarding/gender-picker";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { OnboardingSchema } from "@/database/validators";
import { trpc } from "@/trpc/clitent";

import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

const OnboardingForm = () => {
  const session = useRouteLoaderData("root") as User;

  const form = useForm<OnboardingSchemaType>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      birthday: new Date(),
      gender: "",
      bio: "",
    },
  });

  const mutation = trpc.onboard.onboardUser.useMutation();
  const navigate = useNavigate();

  if (mutation.error) {
    toast.error(mutation.error.message);
  }

  const onSubmit = async (data: OnboardingSchemaType) => {
    const res = await mutation.mutateAsync({
      id: session.id,
      ...data,
      birthday: data.birthday.toISOString(),
    });
    if (!res.success) {
      return toast.error(res.message);
    }
    return navigate(`/onboarding/sign?sid=${res.data.signId}`);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col gap-y-5"}
      >
        <FormField
          control={form.control}
          name={"birthday"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-white"}>
                When were you born?
              </FormLabel>
              <FormControl>
                <BirthdayPicker {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"gender"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-white"}>Gender</FormLabel>
              <FormControl>
                <GenderPicker {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"bio"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-white"}>
                Tell us more about you!
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className={
                    "bg-white/10 border-white/20 text-white placeholder-white/50"
                  }
                  placeholder={"Share about your hobby...."}
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
                  <span>Registering</span>
                </>
              )
            : (
                <span>Register Information</span>
              )}
        </Button>
      </form>
    </Form>
  );
};

export default OnboardingForm;
