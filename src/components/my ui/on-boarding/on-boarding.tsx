"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { Check, Loader2, MessageSquare, Shield, User } from "lucide-react";
import type * as z from "zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// Check V0 and change the code

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

import { OnBoardingSchema } from "@/src/schema";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";
import { ImageUpload } from "@/src/components/my ui/on-boarding/sub ui comps/image-uploader";

import {
  fadeIn,
  slideUp,
  staggerChildren,
  staggerItem,
  scaleUp,
  pulse,
  slideRight,
} from "@/src/components/my ui/on-boarding/framer-animation";
import Image from "next/image";
import { CountriesType } from "@/src/types/types";
import { country_list } from "./sub ui comps/country";
import { UserInfoStep } from "./sub ui comps/user-info";

// Todo: Fix all errors like the continue buttons isnt going to other row and add countrys

export const OnBoardingForm = () => {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    country: "US",
    phoneNumber: "",
    verificationCode: "",
    profileImage: "",
  });

  const [countries, setCountries] = useState<CountriesType>([]);
  const [selectedCountry, setSelectedCountry] = useState<
    CountriesType[number] | null
  >(null);

  useEffect(() => {
    setCountries(country_list);
  }, []);

  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);

  const phoneForm = useForm<z.infer<typeof OnBoardingSchema>>({
    resolver: zodResolver(OnBoardingSchema),
    defaultValues: {
      phoneNumber: formData.phoneNumber,
    },
  });

  const verificationForm = useForm<z.infer<typeof OnBoardingSchema>>({
    resolver: zodResolver(OnBoardingSchema),
    defaultValues: {
      verificationCode: formData.verificationCode,
    },
  });

  const onSubmitUserInfo = (data: z.infer<typeof OnBoardingSchema>) => {
    startTransition(() => {
      setFormData((prev) => ({
        ...prev,
        username: data.username || "",
        name: data.name || "",
        country: data.country || "US",
        profileImage: data.profileImage || "",
      }));

      setSelectedCountry(
        countries.find((c) => c.code === data.country) || "US",
      );

      setStep(2);
    });
  };

  const onSubmitPhone = (data: z.infer<typeof OnBoardingSchema>) => {
    startTransition(() => {
      setFormData((prev) => ({
        ...prev,
        phoneNumber: data.phoneNumber || "",
      }));

      setVerificationOpen(true);

      setResendCooldown(60);
      setResendDisabled(true);

      toast("Verification code sent", {
        description: `We&apos;ve sent a code to ${selectedCountry?.dial_code} ${data.phoneNumber}`,
      });
    });
  };

  const onSubmitVerification = (data: z.infer<typeof OnBoardingSchema>) => {
    startTransition(() => {
      setFormData((prev) => ({
        ...prev,
        verificationCode: data.verificationCode || "",
      }));

      setVerificationOpen(false);

      setStep(3);

      toast("Verification successful", {
        description: "You&apos;re ready to start messaging securely!",
      });
    });
  };

  const handleResendCode = () => {
    if (resendDisabled) return;

    setResendCooldown(60);
    setResendDisabled(true);

    toast("Verification Code resent successfully", {
      description: `A new verification code has been sent to ${selectedCountry?.dial_code} ${formData.phoneNumber}`,
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendCooldown]);

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Visual */}
      <div className="hidden w-1/2 bg-black lg:block">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-violet-600 via-purple-900 to-black opacity-90"></div>
          <motion.div
            className="z-10 px-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white">
                MessengerCraft
              </h1>
              <p className="text-xl font-medium text-white/80">
                Secure. Private. Connected.
              </p>
            </motion.div>

            {/* Animated messaging illustration */}
            <motion.div
              className="my-12 flex justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative h-40 w-40">
                <motion.div
                  className="absolute top-0 left-0 h-32 w-32 rounded-2xl bg-violet-500/20 backdrop-blur-sm"
                  animate={{
                    rotate: [0, 10, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <MessageSquare className="m-8 h-16 w-16 text-violet-200/70" />
                </motion.div>
                <motion.div
                  className="absolute right-0 bottom-0 h-32 w-32 rounded-2xl bg-purple-700/20 backdrop-blur-sm"
                  animate={{
                    rotate: [0, -10, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5,
                  }}
                >
                  <Shield className="m-8 h-16 w-16 text-purple-200/70" />
                </motion.div>
              </div>
            </motion.div>

            {/* Step indicator */}
            <motion.div
              className="mt-8 flex justify-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                className={`h-2 w-12 rounded-full ${step >= 1 ? "bg-white" : "bg-white/30"}`}
                animate={step === 1 ? { scale: [1, 1.1, 1] } : {}}
                transition={step === 1 ? { duration: 1, repeat: Infinity } : {}}
              ></motion.div>
              <motion.div
                className={`h-2 w-12 rounded-full ${step >= 2 ? "bg-white" : "bg-white/30"}`}
                animate={step === 2 ? { scale: [1, 1.1, 1] } : {}}
                transition={step === 2 ? { duration: 1, repeat: Infinity } : {}}
              ></motion.div>
              <motion.div
                className={`h-2 w-12 rounded-full ${step >= 3 ? "bg-white" : "bg-white/30"}`}
                animate={step === 3 ? { scale: [1, 1.1, 1] } : {}}
                transition={step === 3 ? { duration: 1, repeat: Infinity } : {}}
              ></motion.div>
            </motion.div>
          </motion.div>
          {/* Abstract shapes */}
          <motion.div
            className="absolute -bottom-32 -left-40 h-96 w-96 rounded-full bg-purple-700/30 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="absolute top-1/4 -right-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2,
            }}
          ></motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full flex-col justify-center bg-zinc-950 px-4 py-12 lg:w-1/2 lg:px-20">
        <motion.div
          className="mx-auto w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              MessengerCraft
            </h1>
            <p className="mt-2 text-lg text-zinc-400">
              Your secure messaging journey begins here
            </p>

            {/* Mobile step indicator */}
            <div className="mt-6 flex justify-center space-x-2">
              <motion.div
                className={`h-2 w-12 rounded-full ${step >= 1 ? "bg-violet-600" : "bg-zinc-700"}`}
                animate={step === 1 ? { scale: [1, 1.1, 1] } : {}}
                transition={step === 1 ? { duration: 1, repeat: Infinity } : {}}
              ></motion.div>
              <motion.div
                className={`h-2 w-12 rounded-full ${step >= 2 ? "bg-violet-600" : "bg-zinc-700"}`}
                animate={step === 2 ? { scale: [1, 1.1, 1] } : {}}
                transition={step === 2 ? { duration: 1, repeat: Infinity } : {}}
              ></motion.div>
              <motion.div
                className={`h-2 w-12 rounded-full ${step >= 3 ? "bg-violet-600" : "bg-zinc-700"}`}
                animate={step === 3 ? { scale: [1, 1.1, 1] } : {}}
                transition={step === 3 ? { duration: 1, repeat: Infinity } : {}}
              ></motion.div>
            </div>

            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white">
                {step === 1 && "Create your profile"}
                {step === 2 && "Secure your account"}
                {step === 3 && "You're all set!"}
              </h2>
              <p className="mt-2 text-zinc-400">
                {step === 1 &&
                  "Set up your identity in our secure messaging platform"}
                {step === 2 &&
                  "Add your phone number for verification and security"}
                {step === 3 && "Your secure messaging account is ready to use"}
              </p>
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Step 1: User Info Form */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <UserInfoStep
                  onSubmit={onSubmitUserInfo}
                  isPending={isPending}
                />
              </motion.div>
            )}

            {/* Step 2: Phone Number Form */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Form {...phoneForm}>
                  <form
                    className="space-y-6"
                    onSubmit={phoneForm.handleSubmit(onSubmitPhone)}
                  >
                    <div className="space-y-4">
                      <motion.div
                        className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-violet-600/20 text-violet-600">
                            {formData.profileImage ? (
                              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                                <Image
                                  src={
                                    formData.profileImage || "/placeholder.svg"
                                  }
                                  alt={formData.name || "User"}
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
                            <p className="text-xs text-zinc-400">
                              {formData.name}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setStep(1)}
                          className="text-zinc-400 hover:text-white"
                        >
                          Edit
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <FormField
                          control={phoneForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-zinc-200">
                                Phone Number
                              </FormLabel>
                              <FormControl>
                                <div className="flex">
                                  <div className="flex items-center justify-center rounded-l-md border border-r-0 border-zinc-800 bg-zinc-900 px-3 text-zinc-200">
                                    <span className="mr-1">
                                      {selectedCountry?.flag}
                                    </span>
                                    <span>{selectedCountry?.dial_code}</span>
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
                                We&apos;ll send a verification code to this
                                number. Standard message rates may apply.
                              </p>
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
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
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <motion.div
                  className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <motion.div
                    className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-600/20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                  >
                    <Check className="h-8 w-8 text-green-500" />
                  </motion.div>

                  <div className="text-center">
                    <motion.h3
                      className="text-xl font-semibold text-white"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      Welcome to MessengerCraft!
                    </motion.h3>
                    <motion.p
                      className="mt-2 text-zinc-400"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      Your secure messaging account is ready. Start connecting
                      with friends and family in a private, encrypted
                      environment.
                    </motion.p>
                  </div>

                  <div className="mt-6 space-y-3">
                    {formData.profileImage && (
                      <motion.div
                        className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-violet-600"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                      >
                        <Image
                          src={formData.profileImage || "/placeholder.svg"}
                          alt={formData.name || "User"}
                          className="h-full w-full object-cover"
                        />
                      </motion.div>
                    )}
                    <motion.div
                      className="flex justify-between rounded-md border border-zinc-800 bg-zinc-900 p-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <span className="text-sm text-zinc-400">Username</span>
                      <span className="text-sm font-medium text-white">
                        @{formData.username}
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex justify-between rounded-md border border-zinc-800 bg-zinc-900 p-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                    >
                      <span className="text-sm text-zinc-400">Phone</span>
                      <span className="text-sm font-medium text-white">
                        {selectedCountry?.code} {formData.phoneNumber}
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex justify-between rounded-md border border-zinc-800 bg-zinc-900 p-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                    >
                      <span className="text-sm text-zinc-400">Security</span>
                      <span className="text-sm font-medium text-green-500">
                        Verified ✓
                      </span>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                >
                  <Button
                    type="button"
                    className="w-full cursor-pointer bg-violet-600 text-white hover:bg-violet-700"
                    onClick={() => {
                      // In a real app, this would redirect to the dashboard or home page
                      toast("Starting your messaging experience", {
                        description:
                          "Setting up your encrypted conversations...",
                      });
                    }}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start Messaging
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Verification Dialog */}
          <Dialog open={verificationOpen} onOpenChange={setVerificationOpen}>
            <DialogContent className="border-zinc-800 bg-zinc-950 text-white sm:max-w-md">
              <DialogHeader className="text-center">
                <DialogTitle className="text-xl font-semibold">
                  Verify your phone
                </DialogTitle>
                <DialogDescription className="text-zinc-400">
                  Enter the 6-digit code sent to {selectedCountry?.dial_code}{" "}
                  {formData.phoneNumber}
                </DialogDescription>
              </DialogHeader>

              <Form {...verificationForm}>
                <form
                  className="space-y-4"
                  onSubmit={verificationForm.handleSubmit(onSubmitVerification)}
                >
                  <FormField
                    control={verificationForm.control}
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
                      onClick={handleResendCode}
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
        </motion.div>
      </div>
    </div>
  );
};
