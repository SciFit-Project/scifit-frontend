import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useForm } from "react-hook-form";
import { SignupInput, signupSchema } from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const SignupForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SignupInput>({ resolver: zodResolver(signupSchema) })
    const { EmailSignUp } = useAuth()

    const onSubmit = async (data: SignupInput) => {
        if (isLoading) return
        setIsLoading(true)
        const payload = {
            email: data.email,
            fullname: data.fullname,
            password: data.password,
            confirmPassword: data.confirmPassword
        };
        await EmailSignUp(payload)
        reset();
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-white gap-3">
            <div className="flex flex-col mb-2 gap-2">
                <label className="text-sm font-bold" htmlFor="email">Email Address</label>
                <input {...register("email")} placeholder="john@domain.com" className="border outline-0 pl-3 p-1 rounded-md text-sm" />
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
                <label className="text-sm font-bold" htmlFor="fullname">Full name</label>
                <input {...register("fullname")} placeholder="john doe" className="border outline-0 pl-3 p-1 rounded-md text-sm" />
                {errors.fullname && (
                    <p className="text-sm text-red-500">{errors.fullname.message}</p>
                )}
                <label className="text-sm font-bold" htmlFor="password">Password</label>
                <input {...register("password")} placeholder="password" type="password" className="border outline-0 pl-3 p-1 rounded-md text-sm" />
                {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
                <label className="text-sm font-bold" htmlFor="password">Confirm password</label>
                <input {...register("confirmPassword")} placeholder="password" type="password" className="border outline-0 pl-3 p-1 rounded-md text-sm" />
                {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
            </div>
            <button
                disabled={isLoading}
                className={`${isLoading ? 'opacity-30' : ""}disabled mt-2 w-full gap-3 py-1 px-5 rounded-md border border-white/10 bg-white/4 hover:bg-white/8 hover:border-white/20 duration-200`}
                type="submit" >
                {isLoading ? "Signing up" : "Sign up"}
            </button>
        </form >
    )
}

export default SignupForm