"use client";

import Link from "next/link";
import { MoveRight, Star, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/src/schemas/signup-schema";
import { z } from "zod";
import { useState } from "react";
import { signInWithSocial, signUp } from "@/src/lib/actions/auth-actions";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type SignUpValues = z.infer<typeof signUpSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const router = useRouter();
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpValues) => {
    setIsLoading(true);
    try {
      const result = await signUp(data.name, data.email, data.password);
      if (!result.user) {
        toast.error("Something went wrong. Please try again.");
      }
      else {
        toast.success("Account created successfully!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: "google" | "facebook") => {
    setSocialLoading(provider);

    try {
      await signInWithSocial(provider);
    } catch (err) {
      toast.error(
        `Error authenticating with ${provider}: ${err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setSocialLoading(null);
    }
  };


  return (
    <div className="flex min-h-screen font-sans text-[#1a1a1a]">
      {/* Left Side - Branding & Social Proof */}
      <div className="hidden lg:flex w-1/2 bg-[#006231] p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-20 text-white group">
            <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            <span className="font-bold text-xl tracking-tight">Lucid Ledger</span>
          </Link>

          <h1 className="text-6xl font-semibold text-white leading-[1.1] mb-6 max-w-md">
            Master your financial narrative.
          </h1>
          <p className="text-white/80 text-lg max-w-sm font-medium">
            Experience editorial-grade portfolio tracking designed for the modern investor.
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center justify-between text-white/40 text-xs font-medium">
            <span>© 2024 Lucid Ledger</span>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Create your account.</h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-xs font-bold text-gray-700 uppercase tracking-widest ml-1">Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                          <User className="w-5 h-5" />
                        </div>
                        <Input
                          placeholder="Alexander Hamilton"
                          className="pl-12 pr-12 py-7 bg-gray-50 border-gray-200 rounded-xl focus-visible:border-[#00b365] transition-all font-medium border-2 text-base"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px] font-semibold ml-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-xs font-bold text-gray-700 uppercase tracking-widest ml-1">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                          <Mail className="w-5 h-5" />
                        </div>
                        <Input
                          placeholder="name@company.com"
                          type="email"
                          className="pl-12 pr-12 py-7 bg-gray-50 border-gray-200 rounded-xl focus-visible:border-[#00b365] transition-all font-medium border-2 text-base"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px] font-semibold ml-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-xs font-bold text-gray-700 uppercase tracking-widest ml-1">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                          <Lock className="w-5 h-5" />
                        </div>
                        <Input
                          placeholder="********"
                          type={showPassword ? "text" : "password"}
                          className="pl-12 pr-12 py-7 bg-gray-50 border-gray-200 rounded-xl focus-visible:border-[#00b365] transition-all font-medium border-2 text-base"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-4 flex items-center text-gray-300 hover:text-gray-500 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px] font-semibold ml-1" />
                    {!form.formState.errors.password && (
                      <p className="text-[10px] text-gray-400 font-medium ml-1">
                        Must be at least 8 characters with a number and symbol.
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-linear-to-r cursor-pointer from-[#1d9d59] to-[#00b365] text-white py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#00b365]/20 transition-all group active:scale-[0.98] disabled:opacity-70 border-none h-auto"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Start Growing <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </Button>
            </form>
          </Form>

          <div className="my-10 flex items-center gap-4">
            <div className="h-px bg-gray-100 flex-1" />
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">or continue with</span>
            <div className="h-px bg-gray-100 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button disabled={isLoading || socialLoading !== null} onClick={() => {
              if (isLoading || socialLoading !== null) return;
              handleSocialAuth("google");
            }} variant="outline" className="h-auto py-4 px-4 cursor-pointer hover:text-black hover:bg-gray-50 !border-[#e5e7eb] rounded-xl font-bold text-sm flex gap-2 w-full">
              {socialLoading === "google" ? (
                <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              ) : (
                <FcGoogle size={20} />
              )}
              Google
            </Button>
            <Button disabled={isLoading || socialLoading !== null} onClick={() => {
              if (isLoading || socialLoading !== null) return;
              handleSocialAuth("facebook");
            }} variant="outline" className="h-auto py-4 px-4 cursor-pointer hover:text-black hover:bg-gray-50 !border-[#e5e7eb] rounded-xl font-bold text-sm flex gap-2 w-full">
              {socialLoading === "facebook" ? (
                <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              ) : (
                <FaFacebook size={20} className="text-blue-600" />
              )}
              Facebook
            </Button>
          </div>

          <p className="mt-12 text-center text-sm font-semibold text-gray-400">
            Already have an account? <Link href="/login" className="text-[#00b365] hover:underline underline-offset-4 font-bold transition-colors">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
