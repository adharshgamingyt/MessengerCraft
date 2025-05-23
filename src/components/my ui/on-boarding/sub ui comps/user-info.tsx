"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
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

import { OnBoardingSchema } from "@/src/schema";
import { ImageUpload } from "@/src/components/my ui/on-boarding/sub ui comps/image-uploader";
import {
  staggerChildren,
  staggerItem,
  slideUp,
} from "@/src/components/my ui/on-boarding/framer-animation";

interface UserInfoStepProps {
  onSubmit: (data: z.infer<typeof OnBoardingSchema>) => void;
  isPending: boolean;
  defaultValues: {
    username: string;
    name: string;
    country: string;
    profileImage: string;
  };
  countries: Array<{
    name: string;
    code: string;
    phoneCode: string;
    flag: string;
  }>;
}

export const UserInfoStep = ({
  onSubmit,
  isPending,
  defaultValues,
  countries,
}: UserInfoStepProps) => {
  const form = useForm({
    resolver: zodResolver(OnBoardingSchema),
    defaultValues: {
      username: defaultValues.username,
      name: defaultValues.name,
      country: defaultValues.country,
      profileImage: defaultValues.profileImage,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <motion.div className="space-y-4" variants={staggerChildren()}>
          <motion.div variants={staggerItem()}>
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

          <motion.div variants={staggerItem()}>
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

          <motion.div variants={staggerItem()}>
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

          <motion.div variants={staggerItem()}>
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
  );
};
