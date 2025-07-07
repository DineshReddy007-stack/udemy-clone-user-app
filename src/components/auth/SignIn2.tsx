"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { LogIn, Lock, Mail } from "lucide-react";
import { loginStart, loginSuccess, loginFailure } from "@/lib/authSlice";
import { AppDispatch } from "@/lib/store";

const SignIn2: React.FC = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    
    setError("");
    dispatch(loginStart());
    
    try {
      // Mock login for testing - replace with actual API call later
      setTimeout(() => {
        const mockUser = {
          id: '1',
          email: email,
          name: 'Test User',
          avatar: ''
        };
        
        const mockToken = 'mock-jwt-token';
        
        dispatch(loginSuccess({ user: mockUser, token: mockToken }));
        router.replace('/home'); // Use replace instead of push
      }, 1000);
      
    } catch (error) {
      dispatch(loginFailure('Login failed. Please try again.'));
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white rounded-xl">
      <div className="w-full max-w-sm bg-gradient-to-b from-sky-50/50 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-blue-100 text-black">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-lg">
          <LogIn className="w-7 h-7 text-black" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Sign in with email
        </h2>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Make a new doc to bring your words, data, and teams together. For free
        </p>
        <div className="w-full flex flex-col gap-3 mb-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock className="w-4 h-4" />
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
            />
          </div>
          <div className="w-full flex justify-end">
            {error && (
              <div className="text-sm text-red-500 text-left">{error}</div>
            )}
            <button className="text-xs hover:underline font-medium">
              Forgot password?
            </button>
          </div>
        </div>
        <button
          onClick={handleSignIn}
          className="w-full bg-gradient-to-b from-gray-700 to-gray-900 text-white font-medium py-2 rounded-xl shadow hover:brightness-105 transition mb-4 mt-2"
        >
          Get Started
        </button>
        <div className="flex items-center w-full my-2">
          <div className="flex-grow border-t border-dashed border-gray-200" />
          <span className="mx-2 text-xs text-gray-400">Or sign in with</span>
          <div className="flex-grow border-t border-dashed border-gray-200" />
        </div>
        <div className="flex gap-3 w-full justify-center mt-2">
          {/** Social buttons **/}
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition">
            <img
              src="https://www.svgrepo.com/show/448224/facebook.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition">
            <img
              src="https://www.svgrepo.com/show/511330/apple-173.svg"
              alt="Apple"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

// Change to default export
export default SignIn2;