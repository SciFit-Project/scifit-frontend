"use client"
import { Button } from '@/components/ui/button'
import { getSession, getUser, signOut } from '@/lib/auth/auth'
import { UserData } from '@/types/user'
import React, { useEffect, useState } from 'react'

const HomePage = () => {
    const [user, setUser] = useState<UserData>();
    useEffect(() => {
        const fetchUser = async () => {
            const session = await getSession();
            if (!session) {
                window.location.href = "/login";
                return;
            }
            const data = await getUser();
            if (!data) return;
            setUser(data);
        }
        fetchUser();
    }, [])
    if (!user) return <div>Loading...</div>;
    return (
        <div className='flex bg-[#0a0a0a] h-screen flex-col justify-center items-center gap-5 '>

            <div
                className='flex flex-col items-center rounded-2xl border border-white/80 backdrop-blur-xl p-10 text-white gap-5'
                style={{ boxShadow: "0 0 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)" }}
            >
                <img
                    src={user.avatar}
                    alt={`${user.name}'s profile`}
                    onError={(e) => {
                        e.currentTarget.src = "/default-avatar.png";
                    }}
                />
                <h1 className='font-bold text-xl'>{user.name}</h1>
                <h1>{user.email}</h1>
                <Button onClick={signOut}>Log out</Button>
            </div>
        </div>
    )
}

export default HomePage