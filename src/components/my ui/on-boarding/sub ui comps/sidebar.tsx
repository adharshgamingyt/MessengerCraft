"use client";

import { motion } from "framer-motion";
import { MessageSquare, Shield, Lock, Users, Bell } from "lucide-react";
import {
  fadeIn,
  slideUp,
  staggerChildren,
  staggerItem,
  pulse,
} from "@/src/components/my ui/on-boarding/framer-animation";

interface OnboardingSidebarProps {
  step: number;
}

export const OnboardingSidebar = ({ step }: OnboardingSidebarProps) => {
  const features = [
    {
      icon: MessageSquare,
      title: "Secure Messaging",
      description: "End-to-end encrypted conversations",
    },
    {
      icon: Shield,
      title: "Privacy Protection",
      description: "Your data stays private",
    },
    {
      icon: Lock,
      title: "Account Security",
      description: "Multi-factor authentication",
    },
    {
      icon: Users,
      title: "Group Chats",
      description: "Connect with multiple people",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Stay updated on your terms",
    },
  ];

  return (
    <div className="hidden w-1/2 bg-black lg:block">
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden p-10">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-violet-600 via-purple-900 to-black opacity-90"></div>

        {/* Header */}
        <motion.div
          className="z-10 mb-12 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn()}
        >
          <motion.div variants={slideUp()}>
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white">
              MessengerCraft
            </h1>
            <p className="text-xl font-medium text-white/80">
              Secure. Private. Connected.
            </p>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="z-10 flex-1"
          initial="hidden"
          animate="visible"
          variants={staggerChildren()}
        >
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem()}
                className="flex items-start space-x-4 rounded-xl bg-white/5 p-4 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-600/20">
                  <feature.icon className="h-6 w-6 text-violet-300" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{feature.title}</h3>
                  <p className="text-sm text-white/70">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Step indicator */}
        <motion.div
          className="z-10 mt-12 flex justify-center space-x-4"
          variants={staggerChildren()}
        >
          <motion.div
            className={`h-2 w-16 rounded-full ${step >= 1 ? "bg-white" : "bg-white/30"}`}
            variants={staggerItem()}
            animate={step === 1 ? pulse() : {}}
          ></motion.div>
          <motion.div
            className={`h-2 w-16 rounded-full ${step >= 2 ? "bg-white" : "bg-white/30"}`}
            variants={staggerItem()}
            animate={step === 2 ? pulse() : {}}
          ></motion.div>
          <motion.div
            className={`h-2 w-16 rounded-full ${step >= 3 ? "bg-white" : "bg-white/30"}`}
            variants={staggerItem()}
            animate={step === 3 ? pulse() : {}}
          ></motion.div>
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
  );
};
