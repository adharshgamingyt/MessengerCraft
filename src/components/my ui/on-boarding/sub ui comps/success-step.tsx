"use client";

import { motion } from "framer-motion";
import { Check, MessageSquare } from "lucide-react";
import Image from "next/image";

import { Button } from "@/src/components/ui/button";
import {
  staggerChildren,
  staggerItem,
  scaleUp,
  slideUp,
} from "@/src/components/my ui/on-boarding/framer-animation";

interface SuccessStepProps {
  formData: {
    username: string;
    name: string;
    profileImage: string;
    phoneNumber: string;
  };
  selectedCountry: {
    phoneCode: string;
  };
  onStartMessaging: () => void;
}

export const SuccessStep = ({
  formData,
  selectedCountry,
  onStartMessaging,
}: SuccessStepProps) => {
  return (
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

      <motion.div variants={staggerChildren()} className="text-center">
        <motion.h3
          variants={staggerItem()}
          className="text-xl font-semibold text-white"
        >
          Welcome to MessengerCraft!
        </motion.h3>
        <motion.p variants={staggerItem()} className="mt-2 text-zinc-400">
          Your secure messaging account is ready. Start connecting with friends
          and family in a private, encrypted environment.
        </motion.p>
      </motion.div>

      <motion.div className="mt-6 space-y-3" variants={staggerChildren()}>
        {formData.profileImage && (
          <motion.div
            className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-violet-600"
            variants={staggerItem()}
          >
            <Image
              src={formData.profileImage || "/placeholder.svg"}
              alt={formData.name || "User"}
              width={80}
              height={80}
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
          <span className="text-sm font-medium text-green-500">Verified ✓</span>
        </motion.div>
      </motion.div>

      <motion.div className="mt-6" variants={slideUp()}>
        <Button
          type="button"
          className="w-full cursor-pointer bg-violet-600 text-white hover:bg-violet-700"
          onClick={onStartMessaging}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Start Messaging
        </Button>
      </motion.div>
    </motion.div>
  );
};
