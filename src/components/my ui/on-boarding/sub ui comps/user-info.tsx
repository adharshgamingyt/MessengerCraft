"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { UserInfoSchema } from "@/src/schema";
import { ImageUpload } from "@/src/components/my ui/on-boarding/sub ui comps/image-uploader";
import {
  staggerChildren,
  staggerItem,
  slideUp,
} from "@/src/components/my ui/on-boarding/framer-animation";
import { CountriesType } from "@/src/types/types";
import { useEffect, useState } from "react";
import { country_list } from "./country";

interface UserInfoStepProps {
  onSubmit: (data: z.infer<typeof UserInfoSchema>) => void;
  isPending: boolean;
}

export const UserInfoStep = ({ onSubmit, isPending }: UserInfoStepProps) => {
  const [countries, setCountries] = useState<CountriesType>([]);

  useEffect(() => {
    setCountries(country_list);
  }, []);

  const form = useForm<z.infer<typeof UserInfoSchema>>({
    resolver: zodResolver(UserInfoSchema),
    defaultValues: {
      username: "",
      name: "",
      country: "US",
      profileImage: "",
    },
    mode: "onSubmit",
  });

  const formVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const handleSubmit = async (data: z.infer<typeof UserInfoSchema>) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        {" "}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={formVariants as any}
        >
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
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

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
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

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
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

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
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
                            <span className="mr-2">{country.flag}</span>
                            <span>{country.name}</span>{" "}
                            <span className="ml-2 text-zinc-400">
                              {country.dial_code}
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
  );
};
