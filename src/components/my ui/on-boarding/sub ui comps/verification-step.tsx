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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";

import { OnBoardingSchema } from "@/src/schema";
import {
  staggerChildren,
  staggerItem,
  slideUp,
} from "@/src/components/my ui/on-boarding/framer-animation";

interface VerificationStepProps {
  onSubmit: (data: z.infer<typeof OnBoardingSchema>) => void;
  isPending: boolean;
  formData: {
    phoneNumber: string;
  };
  selectedCountry: {
    phoneCode: string;
  };
  resendCooldown: number;
  resendDisabled: boolean;
  onResendCode: () => void;
  onEditPhone: () => void;
}

export const VerificationStep = ({
  onSubmit,
  isPending,
  formData,
  selectedCountry,
  resendCooldown,
  resendDisabled,
  onResendCode,
  onEditPhone,
}: VerificationStepProps) => {
const form = useForm({
  resolver: zodResolver(VerificationSchema),
    defaultValues: {
      verificationCode: "",
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
              <div>
                <p className="text-sm font-medium text-white">
                  {selectedCountry.phoneCode} {formData.phoneNumber}
                </p>
                <p className="text-xs text-zinc-400">
                  Enter the 6-digit code sent to your phone
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onEditPhone}
              className="text-zinc-400 hover:text-white"
            >
              Edit
            </Button>
          </motion.div>

          <motion.div variants={staggerItem()}>
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormControl>
                    <motion.div
                      className="flex justify-center"
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
          </motion.div>
        </motion.div>

        <motion.div variants={slideUp()} className="space-y-3">
          <Button
            type="submit"
            className="w-full bg-violet-600 text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-600/70"
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

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full text-zinc-400 hover:text-white disabled:text-zinc-700"
            onClick={onResendCode}
            disabled={resendDisabled}
          >
            {resendDisabled ? `Resend in ${resendCooldown}s` : "Resend code"}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
};
      </form>
    </Form>
  );
};
