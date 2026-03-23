"use client";

import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/src/schemas/signin-schema";
import { z } from "zod";
import { useState } from "react";
import { signIn, signInWithSocial } from "@/src/lib/actions/auth-actions";

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
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type SignInValues = z.infer<typeof signInSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInValues) => {
    setIsLoading(true);
    try {
      const result = await signIn(data.email, data.password);
      if (!result.user) {
        toast.error("Invalid email or password.");
      }
      else {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: string) => {
    setSocialLoading(provider);
    try {
      await signInWithSocial(provider);
    } catch (err: any) {
      toast.error(err.message || "Failed to sign in with social provider.");
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00b365]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 p-10 z-10 animate-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Welcome back.</h1>
          <p className="text-gray-400 font-medium tracking-wide">Access your financial sanctuary.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        className="pl-12 pr-12 py-7 bg-gray-50 border-gray-200 text-gray-900 rounded-xl focus-visible:border-[#00b365] transition-all font-medium border-2 text-base"
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
                        className="pl-12 pr-12 py-7 bg-gray-50 border-gray-200 text-gray-900 rounded-xl focus-visible:border-[#00b365] transition-all font-medium border-2 text-base"
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
                <>Sign In <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
              )}
            </Button>
          </form>
        </Form>

        <div className="my-10 flex items-center gap-6">
          <div className="h-px bg-gray-100 flex-1" />
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Or continue with</span>
          <div className="h-px bg-gray-100 flex-1" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button disabled={isLoading || socialLoading !== null} onClick={() => {
            if (isLoading || socialLoading !== null) return;
            handleSocialAuth("google");
          }} variant="outline" className="h-auto py-4 px-4 cursor-pointer text-black hover:text-black hover:bg-gray-50 !border-[#e5e7eb] rounded-xl font-bold text-sm flex gap-2 w-full">
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
          }} variant="outline" className="h-auto py-4 px-4 cursor-pointer text-black hover:text-black hover:bg-gray-50 !border-[#e5e7eb] rounded-xl font-bold text-sm flex gap-2 w-full">
            {socialLoading === "facebook" ? (
              <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
            ) : (
              <FaFacebook size={20} className="text-blue-600" />
            )}
            Facebook
          </Button>
        </div>

        <div className="mt-12 text-center text-sm font-semibold text-gray-400">
          New to the ledger? <Link href="/register" className="text-gray-900 border-b border-transparent hover:border-gray-900 transition-all ml-1">Create an account</Link>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-6 text-[10px] font-bold text-gray-300 uppercase tracking-widest z-10 transition-opacity hover:opacity-100 opacity-60">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
          256-bit AES Encryption
        </div>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-gray-500 transition-colors underline-offset-4 hover:underline">Privacy Policy</Link>
          <Link href="#" className="hover:text-gray-500 transition-colors underline-offset-4 hover:underline">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
}
