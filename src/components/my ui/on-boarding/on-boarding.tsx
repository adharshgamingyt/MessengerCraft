"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState, useTransition } from "react";
import { Shield, ShieldCheckIcon, ShieldEllipsis } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormItem,
} from "@/src/components/ui/form";
import { OnBoardingSchema } from "@/src/schema";
import { onBoarding } from "@/src/actions/on-boarding";

export const OnBoardingForm = () => {
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof OnBoardingSchema>>({
    resolver: zodResolver(OnBoardingSchema),
    defaultValues: {
      name: "",
      image: "",
      phone_number: "",
    },
  });

  const onSubmit = (data: z.infer<typeof OnBoardingSchema>) => {
    startTransition(() => {
      onBoarding(data).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Visual */}
      <div className="hidden w-1/2 bg-black lg:block">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-violet-600 via-purple-900 to-black opacity-90"></div>
          <div className="z-10 px-12 text-center">
            <motion.div
              initial={{
                y: 0,
                x: 0,
              }}
              animate={{
                y: [-10, 10, -10],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop",
              }}
              className="mb-8 hidden lg:block"
            >
              {step == 1 ? (
                <Shield className="mx-auto size-32 text-violet-400" />
              ) : step == 2 ? (
                <ShieldEllipsis className="mx-auto size-32 text-violet-400" />
              ) : step == 3 ? (
                <ShieldEllipsis className="mx-auto size-32 text-violet-400" />
              ) : step == 4 ? (
                <ShieldCheckIcon className="mx-auto size-32 text-violet-400" />
              ) : null}
            </motion.div>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white">
              MessengerCraft
            </h1>
            <p className="text-xl font-medium text-white/80">
              Let&apos;s get you started with MessengerCraft!
            </p>
          </div>
          {/* Abstract shapes */}
          <div className="absolute -bottom-32 -left-40 h-96 w-96 rounded-full bg-purple-700/30 blur-3xl"></div>
          <div className="absolute top-1/4 -right-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"></div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full flex-col justify-center bg-zinc-950 px-4 py-12 lg:w-1/2 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-12 text-center lg:hidden">
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              MessengerCraft
            </h1>
            <p className="mt-2 text-lg text-zinc-400">
              Let&apos;s get you started with MessengerCraft!
            </p>
          </div>

          <div className="mb-8 hidden lg:block">
            <h2 className="text-3xl font-bold text-white">Welcome </h2>
            <p className="mt-2 text-zinc-400">
              On-Boarding you to a secure messaging experience!
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-zinc-200">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="name"
                          placeholder="Name"
                          autoCapitalize="words"
                          autoComplete="name"
                          autoCorrect="off"
                          disabled={isPending}
                          className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-400 focus-visible:ring-violet-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Todo: Add proper phone number field */}
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-sm font-medium text-zinc-200">
                          Phone number
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          id="phone_number"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-400 focus-visible:ring-violet-600"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>{" "}
              <Button
                type="submit"
                className="w-full cursor-pointer bg-violet-600 text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-600"
                disabled={isPending}
              >
                Verified phone number
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
