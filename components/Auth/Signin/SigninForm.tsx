"use client";
import { formLabelStyle, inputStyle } from "@/app/Styles";
import { ISigninInputs } from "@/app/Types";
import { useLoginUserMutation } from "@/Redux/auth/authApi";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SigninForm = () => {
  const router = useRouter();
  const [loginUser, { isLoading: loginLoading, isSuccess, isError, error }] =
    useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninInputs>();

  function onSubmit(data: ISigninInputs) {
    loginUser(data);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Sign In Successfully!");
      router.push("/");
    }
    if (isError) {
      toast.error("Sign-in failed, Try Again!");
    }
  }, [isSuccess, isError, error, router]);

  return (
    <div className='flex justify-center'>
      <div className='max-w-[32rem] mt-28 w-full bg-card-color py-6 px-10 rounded-xl'>
        <div className=''>
          <h1 className='text-center text-gray-900 font-medium text-2xl pb-10'>
            Sign In
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`flex flex-col gap-10 justify-center items-center ${errors}`}>
            <div className='flex w-full flex-col'>
              <label
                className={formLabelStyle}
                htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                className={inputStyle}
                placeholder='Enter your email here'
                {...register("email", {
                  required: "This field is required",
                })}
              />
              {errors.email && (
                <p className='text-red-600 text-[13.5px] mt-1 font-medium'>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className='flex w-full flex-col'>
              <label
                className={formLabelStyle}
                htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                className={inputStyle}
                placeholder='Enter your password here'
                {...register("password", {
                  required: "This field is required",
                  maxLength: {
                    message:
                      "Password field should have less then 100 characters",
                    value: 100,
                  },
                })}
              />
              {errors.password && !errors.email && (
                <p className='text-red-600 text-[13.5px] mt-1 font-medium'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              className={`bg-blue-600 text-white font-medium w-full py-2 px-4 rounded-full  mt-3 hover:bg-blue-700 transition-colors duration-300`}
              disabled={loginLoading}
              type='submit'>
              {loginLoading ? (
                <Loader2 className='mx-auto animate-spin' />
              ) : (
                "Submit"
              )}
            </button>
          </form>

          <p className='text-gray-700 text-center mt-8 mb-5'>
            Don&apos;t have an account?
            <Link
              href={"/register/agreement"}
              className='ml-2   text-blue-600 font-semibold underline underline-offset-2 cursor-pointer'>
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
