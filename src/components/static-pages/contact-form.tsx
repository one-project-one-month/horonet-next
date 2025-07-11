import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { TContactFormSchema } from "@/database/validators";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormSchema } from "@/database/validators";

import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

const ContactForm = () => {
  const form = useForm<TContactFormSchema>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = () => {
    toast.success("Successfully submitted!");
    form.reset();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col gap-y-5"}
      >
        <FormField
          control={form.control}
          name={"name"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-white"}>Name:</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Your full name"}
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
              <FormLabel className={"text-white"}>Email:</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Your email"}
                  {...field}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"subject"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-white"}>Subject:</FormLabel>
              <FormControl>
                <Input
                  placeholder={"What's this about?"}
                  {...field}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"message"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-white"}>Message:</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={"Tell us how we can help you"}
                  {...field}
                  className=" min-h-[220px] bg-white/10 border-white/20 text-white placeholder-white/50"
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
                  <span>Sending Message..</span>
                </>
              )
            : (
                <span>
                  Send message <Sparkles className={"ml-2 inline"} />
                </span>
              )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
