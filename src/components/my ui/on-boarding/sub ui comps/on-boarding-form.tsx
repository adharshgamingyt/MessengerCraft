"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeIn,
  slideRight,
  slideUp,
  pulse,
} from "@/src/components/my ui/on-boarding/framer-animation";
import * as z from "zod";

import { UserInfoStep } from "@/src/components/my ui/on-boarding/sub ui comps/user-info";
import { PhoneVerificationStep } from "@/src/components/my ui/on-boarding/sub ui comps/phone-verification-step";
import { SuccessStep } from "@/src/components/my ui/on-boarding/sub ui comps/success-step";
import { VerificationDialog } from "@/src/components/my ui/on-boarding/sub ui comps/verification-dialog";
import { OnboardingSidebar } from "@/src/components/my ui/on-boarding/sub ui comps/sidebar";
import { OnBoardingSchema } from "@/src/schema";

// Country data
export const countries = [
  { name: "United States", code: "US", phoneCode: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", phoneCode: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "CA", phoneCode: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "AU", phoneCode: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "DE", phoneCode: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", phoneCode: "+33", flag: "🇫🇷" },
  { name: "Japan", code: "JP", phoneCode: "+81", flag: "🇯🇵" },
  { name: "China", code: "CN", phoneCode: "+86", flag: "🇨🇳" },
  { name: "India", code: "IN", phoneCode: "+91", flag: "🇮🇳" },
  { name: "Brazil", code: "BR", phoneCode: "+55", flag: "🇧🇷" },
];

export const OnBoardingForm = () => {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
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

  const handleUserInfoSubmit = (data: z.infer<typeof OnBoardingSchema>) => {
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

  const handlePhoneSubmit = (data: z.infer<typeof OnBoardingSchema>) => {
    startTransition(() => {
      setFormData((prev) => ({
        ...prev,
        phoneNumber: data.phoneNumber || "",
      }));

      setVerificationOpen(true);

      setResendCooldown(60);
      setResendDisabled(true);

      toast("Verification code sent", {
        description: `We've sent a code to ${selectedCountry.phoneCode} ${data.phoneNumber}`,
      });
    });
  };

  const handleVerificationSubmit = (data: z.infer<typeof OnBoardingSchema>) => {
    startTransition(() => {
      setFormData((prev) => ({
        ...prev,
        verificationCode: data.verificationCode || "",
      }));

      setVerificationOpen(false);

      setStep(3);

      toast("Verification successful", {
        description: "You're ready to start messaging securely!",
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

  const handleStartMessaging = () => {
    toast("Starting your messaging experience", {
      description: "Setting up your encrypted conversations...",
    });
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Visual */}
      <OnboardingSidebar step={step} />

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
                <UserInfoStep
                  onSubmit={handleUserInfoSubmit}
                  isPending={isPending}
                  defaultValues={formData}
                  countries={countries}
                />
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
                <PhoneVerificationStep
                  onSubmit={handlePhoneSubmit}
                  isPending={isPending}
                  formData={formData}
                  selectedCountry={selectedCountry}
                  onEditProfile={() => setStep(1)}
                />
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
                <SuccessStep
                  formData={formData}
                  selectedCountry={selectedCountry}
                  onStartMessaging={handleStartMessaging}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Verification Dialog */}
          <VerificationDialog
            open={verificationOpen}
            onOpenChange={setVerificationOpen}
            onSubmit={handleVerificationSubmit}
            isPending={isPending}
            phoneNumber={formData.phoneNumber}
            selectedCountry={selectedCountry}
            resendCooldown={resendCooldown}
            resendDisabled={resendDisabled}
            onResendCode={handleResendCode}
          />
        </motion.div>
      </div>
    </div>
  );
};
