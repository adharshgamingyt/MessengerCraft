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

// Todo: Fix all errors like the continue buttons isnt going to other row and add countrys

export const OnBoardingForm = () => {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [countries, setCountries] = useState<CountriesType>([]);
  const [selectedCountry, setSelectedCountry] = useState<
    CountriesType[number] | null
  >(null);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    country: "US",
    phoneNumber: "",
    verificationCode: "",
    profileImage: "",
  });

  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);
  useEffect(() => {
    fetch("/countries.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: CountriesType) => setCountries(data))
      .catch((err) => {
        console.error("Failed to load countries:", err);
        toast.error("Unable to load country list");
      });
  }, []);

  const userInfoForm = useForm<z.infer<typeof OnBoardingSchema>>({
    resolver: zodResolver(OnBoardingSchema),
    defaultValues: {
      username: formData.username,
      name: formData.name,
      country: formData.country,
      profileImage: formData.profileImage,
    },
  });

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
      const country = countries.find((c) => c.code === data.country);
      if (country) {
        setSelectedCountry(country);
      }

      setFormData((prev) => ({
        ...prev,
        username: data.username || "",
        name: data.name || "",
        country: data.country || "US",
        profileImage: data.profileImage || "",
      }));

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
        description: `We&apos;ve sent a code to ${selectedCountry.phoneCode} ${data.phoneNumber}`,
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
      description: `A new verification code has been sent to ${selectedCountry.phoneCode} ${formData.phoneNumber}`,
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
            initial="hidden"
            animate="visible"
            variants={fadeIn()}
          >
            <motion.div variants={slideUp()}>
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
              variants={scaleUp()}
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
                    repeat: Number.POSITIVE_INFINITY,
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
                    repeat: Number.POSITIVE_INFINITY,
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
              variants={staggerChildren()}
            >
              <motion.div
                className={`h-2 w-12 rounded-full ${step >= 1 ? "bg-white" : "bg-white/30"}`}
                variants={staggerItem()}
                animate={step === 1 ? pulse() : {}}
              ></motion.div>
              <motion.div
                className={`h-2 w-12 rounded-full ${step >= 2 ? "bg-white" : "bg-white/30"}`}
                variants={staggerItem()}
                animate={step === 2 ? pulse() : {}}
              ></motion.div>
              <motion.div
                className={`h-2 w-12 rounded-full ${step >= 3 ? "bg-white" : "bg-white/30"}`}
                variants={staggerItem()}
                animate={step === 3 ? pulse() : {}}
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
              repeat: Number.POSITIVE_INFINITY,
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
              repeat: Number.POSITIVE_INFINITY,
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
          initial="hidden"
          animate="visible"
          variants={fadeIn()}
        >
          <motion.div className="mb-8 text-center" variants={slideUp()}>
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
                animate={step === 1 ? pulse() : {}}
              ></motion.div>
              <motion.div
                className={`h-2 w-12 rounded-full ${step >= 2 ? "bg-violet-600" : "bg-zinc-700"}`}
                animate={step === 2 ? pulse() : {}}
              ></motion.div>
              <motion.div
                className={`h-2 w-12 rounded-full ${step >= 3 ? "bg-violet-600" : "bg-zinc-700"}`}
                animate={step === 3 ? pulse() : {}}
              ></motion.div>
            </div>

            <motion.div className="mt-4 text-center" variants={slideUp()}>
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
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideRight()}
              >
                <Form {...userInfoForm}>
                  <form
                    className="space-y-6"
                    onSubmit={userInfoForm.handleSubmit(onSubmitUserInfo)}
                  >
                    <motion.div
                      className="space-y-4"
                      variants={staggerChildren()}
                    >
                      <motion.div variants={staggerItem()}>
                        <FormField
                          control={userInfoForm.control}
                          name="profileImage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-zinc-200">
                                Profile Image
                              </FormLabel>
                              <FormControl>
                                <ImageUpload
                                  value={field.value}
                                  onChange={field.onChange}
                                  disabled={isPending}
                                  className="mx-auto max-w-[200px]"
                                  rounded={false}
                                  aspectRatio={1}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={staggerItem()}>
                        <FormField
                          control={userInfoForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-zinc-200">
                                Username
                              </FormLabel>
                              <FormControl>
                                <div className="flex">
                                  <div className="flex items-center justify-center rounded-l-md border border-r-0 border-zinc-800 bg-zinc-900 px-3 text-zinc-400">
                                    @
                                  </div>
                                  <Input
                                    {...field}
                                    placeholder="username"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    disabled={isPending}
                                    className="rounded-l-none border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-400 focus-visible:ring-violet-600"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={staggerItem()}>
                        <FormField
                          control={userInfoForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-zinc-200">
                                Display Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="How others will see you"
                                  disabled={isPending}
                                  className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-400 focus-visible:ring-violet-600"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={staggerItem()}>
                        <FormField
                          control={userInfoForm.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-zinc-200">
                                Country
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={isPending}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-zinc-800 bg-zinc-900 text-white focus:ring-violet-600">
                                    <SelectValue placeholder="Select your country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="max-h-80 bg-zinc-900 text-white">
                                  {countries.map((country) => (
                                    <SelectItem
                                      key={country.code}
                                      value={country.code}
                                      className="focus:bg-zinc-800"
                                    >
                                      <div className="flex items-center">
                                        <span className="mr-2">
                                          {country.flag}
                                        </span>
                                        <span>{country.name}</span>
                                        <span className="ml-2 text-zinc-400">
                                          {country.phoneCode}
                                        </span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
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
                            Processing...
                          </>
                        ) : (
                          "Continue to Verification"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </motion.div>
            )}

            {/* Step 2: Phone Number Form */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideRight()}
              >
                <Form {...phoneForm}>
                  <form
                    className="space-y-6"
                    onSubmit={phoneForm.handleSubmit(onSubmitPhone)}
                  >
                    <motion.div
                      className="space-y-4"
                      variants={staggerChildren()}
                    >
                      <motion.div
                        className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
                        variants={staggerItem()}
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

                      <motion.div variants={staggerItem()}>
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
                                      {selectedCountry.flag}
                                    </span>
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
                                We&apos;ll send a verification code to this
                                number. Standard message rates may apply.
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
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideRight()}
                className="space-y-6"
              >
                <motion.div
                  className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
                  variants={scaleUp()}
                >
                  <motion.div
                    className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-600/20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <Check className="h-8 w-8 text-green-500" />
                  </motion.div>

                  <motion.div
                    variants={staggerChildren()}
                    className="text-center"
                  >
                    <motion.h3
                      variants={staggerItem()}
                      className="text-xl font-semibold text-white"
                    >
                      Welcome to MessengerCraft!
                    </motion.h3>
                    <motion.p
                      variants={staggerItem()}
                      className="mt-2 text-zinc-400"
                    >
                      Your secure messaging account is ready. Start connecting
                      with friends and family in a private, encrypted
                      environment.
                    </motion.p>
                  </motion.div>

                  <motion.div
                    className="mt-6 space-y-3"
                    variants={staggerChildren()}
                  >
                    {formData.profileImage && (
                      <motion.div
                        className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-violet-600"
                        variants={staggerItem()}
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
                      variants={staggerItem()}
                    >
                      <span className="text-sm text-zinc-400">Username</span>
                      <span className="text-sm font-medium text-white">
                        @{formData.username}
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex justify-between rounded-md border border-zinc-800 bg-zinc-900 p-3"
                      variants={staggerItem()}
                    >
                      <span className="text-sm text-zinc-400">Phone</span>
                      <span className="text-sm font-medium text-white">
                        {selectedCountry.phoneCode} {formData.phoneNumber}
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex justify-between rounded-md border border-zinc-800 bg-zinc-900 p-3"
                      variants={staggerItem()}
                    >
                      <span className="text-sm text-zinc-400">Security</span>
                      <span className="text-sm font-medium text-green-500">
                        Verified ✓
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div variants={slideUp()}>
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
                  Enter the 6-digit code sent to {selectedCountry.phoneCode}{" "}
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
