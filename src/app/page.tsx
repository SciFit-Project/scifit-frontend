import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans overflow-hidden relative">
      <span className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <span className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

      <nav className="w-full flex justify-between items-center p-6 max-w-7xl mx-auto z-10">
        <div className="font-bold text-2xl">
          SCIFIT<span className="text-blue-500">.</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login?type=login">
            <Button variant="ghost"
              className="text-white hover:bg-white/5 hover:text-white"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup?type=register">
            <Button className="bg-white text-black hover:bg-gray-200">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      <main className="flex flex-col justify-center items-center text-center px-4 z-10 mt-20">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium mb-8 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
          We Go Gym
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
          Let's SciFit <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
            Make You Fit.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl">
          Manage your tasks, track your progress, and elevate your productivity.
          Everything you need in one dark, sleek, and lightning-fast
          application.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/login?type=register">
            <Button
              size="lg"
              className="h-12 px-8 text-base bg-white text-black hover:bg-gray-200 w-full sm:w-auto"
            >
              Start for free
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
