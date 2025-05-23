"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import * as z from "zod";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";

import { OnBoardingSchema } from "@/src/schema";

interface VerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: z.infer<typeof OnBoardingSchema>) => void;
  isPending: boolean;
  phoneNumber: string;
  selectedCountry: {
    phoneCode: string;
  };
  resendCooldown: number;
  resendDisabled: boolean;
  onResendCode: () => void;
}

export const VerificationDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  phoneNumber,
  selectedCountry,
  resendCooldown,
  resendDisabled,
  onResendCode,
}: VerificationDialogProps) => {
  const form = useForm({
    resolver: zodResolver(OnBoardingSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-zinc-800 bg-zinc-950 text-white sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold">
            Verify your phone
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Enter the 6-digit code sent to {selectedCountry.phoneCode}{" "}
            {phoneNumber}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormControl>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <InputOTP
                        maxLength={6}
                        value={field.value || ""}
                        onChange={field.onChange}
                        disabled={isPending}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </motion.div>
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-white disabled:text-zinc-700"
                onClick={onResendCode}
                disabled={resendDisabled}
              >
                {resendDisabled
                  ? `Resend in ${resendCooldown}s`
                  : "Resend code"}
              </Button>
              <Button
                type="submit"
                className="bg-violet-600 text-white hover:bg-violet-700"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
