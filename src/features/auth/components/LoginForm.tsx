'use client'
import { useForm } from "react-hook-form"
import { LoginInput, loginSchema } from "../schema/auth.schema"
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/use-auth";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })
    const { EmailLogin } = useAuth()

    const onSubmit = async (data: LoginInput) => {
        if (isLoading) return
        setIsLoading(true)
        const payload = {
            email: data.email,
            password: data.password,
        };
        await EmailLogin(payload)
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
            </div>
            <div className="flex flex-col mb-2 gap-2">
                <label className="text-sm font-bold" htmlFor="password">Password</label>
                <input {...register("password")} placeholder="password" type="password" className="border outline-0 pl-3 p-1 rounded-md text-sm" />
                {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
            </div>
            <button
                className="mt-2 w-full gap-3 py-1 px-5 rounded-md border border-white/10 bg-white/4 hover:bg-white/8 hover:border-white/20 duration-200 "
                type="submit" >Login</button>
        </form>
    )
}

export default LoginForm