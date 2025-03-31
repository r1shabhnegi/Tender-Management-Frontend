"use client";
import { ISigninInputs } from "@/app/Types";
import { useLoginUserMutation } from "@/Redux/auth/authApi";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const SigninForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loginUser, { isLoading, isSuccess, isError, error }] =
    useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninInputs>();

  async function onSubmit(data: ISigninInputs) {
    // Store email in localStorage if remember me is checked
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", data.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    loginUser(data);
  }

  useEffect(() => {
    // Check for remembered email
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setRememberMe(true);
      // Pre-fill the email field would happen via defaultValues in useForm
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Sign In Successfully!");
      router.push("/");
    }
    if (isError) {
      toast.error("Sign-in failed. Please check your credentials.");
    }
  }, [isSuccess, isError, error, router]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900'>
            Welcome Back
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            Sign in to access your account
          </p>
        </div>

        <Card className='shadow-lg border-0'>
          <CardHeader className='space-y-1 pb-6'>
            <div className='flex justify-center mb-2'>
              <div className='rounded-full bg-blue-100 p-3'>
                <LogIn className='h-6 w-6 text-blue-600' />
              </div>
            </div>
            <CardTitle className='text-xl text-center'>Account Login</CardTitle>
            <p className='text-center text-sm text-gray-500'>
              Enter your credentials to access your account
            </p>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-5'>
              <div className='space-y-2'>
                <label
                  htmlFor='email'
                  className='text-sm font-medium block'>
                  Email Address
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <Mail className='h-4 w-4 text-gray-400' />
                  </div>
                  <Input
                    id='email'
                    type='email'
                    placeholder='you@example.com'
                    className='pl-10 py-2 bg-gray-50 border-gray-200'
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    defaultValue={localStorage.getItem("rememberedEmail") || ""}
                  />
                </div>
                {errors.email && (
                  <p className='text-sm text-red-500'>{errors.email.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='text-sm font-medium block'>
                    Password
                  </label>
                  <Link
                    href='/forgot-password'
                    className='text-xs text-blue-600 hover:text-blue-800 hover:underline'>
                    Forgot password?
                  </Link>
                </div>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <Lock className='h-4 w-4 text-gray-400' />
                  </div>
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='••••••••'
                    className='pl-10 pr-10 py-2 bg-gray-50 border-gray-200'
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 flex items-center pr-3'
                    onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <EyeOff className='h-4 w-4 text-gray-400 hover:text-gray-600' />
                    ) : (
                      <Eye className='h-4 w-4 text-gray-400 hover:text-gray-600' />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-sm text-red-500'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='remember'
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor='remember'
                  className='text-sm text-gray-600 cursor-pointer'>
                  Remember me
                </label>
              </div>

              <Button
                type='submit'
                className='w-full py-2.5 bg-blue-600 hover:bg-blue-700'
                disabled={isLoading}>
                {isLoading ? (
                  <div className='flex items-center justify-center'>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                    Signing in...
                  </div>
                ) : (
                  <div className='flex items-center justify-center'>
                    <span>Sign in</span>
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className='flex flex-col space-y-4 pt-0'>
            <div className='flex items-center pt-2'>
              <Separator className='flex-1' />
              <span className='px-3 text-xs text-gray-500'>OR</span>
              <Separator className='flex-1' />
            </div>

            <p className='text-center text-sm text-gray-600'>
              Don&apos;t have an account?{" "}
              <Link
                href='/register/agreement'
                className='text-blue-600 hover:text-blue-800 font-medium hover:underline'>
                Register Now
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className='flex items-center justify-center'>
          <ShieldCheck className='h-4 w-4 text-gray-400 mr-1.5' />
          <p className='text-xs text-gray-500'>
            Secure authentication. We don&apos;t store your password.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
