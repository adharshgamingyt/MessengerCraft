"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, User } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import * as z from "zod";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";

import { OnBoardingSchema } from "@/src/schema";
import {
  staggerChildren,
  staggerItem,
  slideUp,
} from "@/src/components/my ui/on-boarding/framer-animation";

interface PhoneVerificationStepProps {
  onSubmit: (data: z.infer<typeof OnBoardingSchema>) => void;
  isPending: boolean;
  formData: {
    username: string;
    name: string;
    profileImage: string;
    phoneNumber: string;
  };
  selectedCountry: {
    name: string;
    code: string;
    phoneCode: string;
    flag: string;
  };
  onEditProfile: () => void;
}

export const PhoneVerificationStep = ({
  onSubmit,
  isPending,
  formData,
  selectedCountry,
  onEditProfile,
}: PhoneVerificationStepProps) => {
  const form = useForm({
    resolver: zodResolver(OnBoardingSchema),
    defaultValues: {
      phoneNumber: formData.phoneNumber,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <motion.div className="space-y-4" variants={staggerChildren()}>
          <motion.div
            className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
            variants={staggerItem()}
          >
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-violet-600/20 text-violet-600">
                {formData.profileImage ? (
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={formData.profileImage || "/placeholder.svg"}
                      alt={formData.name || "User"}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  @{formData.username}
                </p>
                <p className="text-xs text-zinc-400">{formData.name}</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onEditProfile}
              className="text-zinc-400 hover:text-white"
            >
              Edit
            </Button>
          </motion.div>

          <motion.div variants={staggerItem()}>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-200">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center justify-center rounded-l-md border border-r-0 border-zinc-800 bg-zinc-900 px-3 text-zinc-200">
                        <span className="mr-1">{selectedCountry.flag}</span>
                        <span>{selectedCountry.phoneCode}</span>
                      </div>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="Your 10-digit number"
                        maxLength={10}
                        disabled={isPending}
                        className="rounded-l-none border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-400 focus-visible:ring-violet-600"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                  <p className="mt-2 text-xs text-zinc-500">
                    We&apos;ll send a verification code to this number. Standard
                    message rates may apply.
                  </p>
                </FormItem>
              )}
            />
          </motion.div>
        </motion.div>

        <motion.div variants={slideUp()}>
          <Button
            type="submit"
            className="w-full cursor-pointer bg-violet-600 text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-600/70"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending code...
              </>
            ) : (
              "Send Verification Code"
            )}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
};
