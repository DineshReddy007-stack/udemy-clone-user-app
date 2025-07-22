// src/components/providers/AuthInitializer.tsx
"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/lib/store';
import { initializeAuth } from '@/lib/authSlice';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    console.log('🔧 AuthInitializer: Initializing auth state...');
    
    // Initialize auth state from localStorage
    dispatch(initializeAuth());
    
    // Check if user needs to be redirected after login
    const redirectPath = localStorage.getItem('redirectAfterLogin');
    if (redirectPath) {
      console.log('🔄 Redirecting user after login to:', redirectPath);
      localStorage.removeItem('redirectAfterLogin');
      router.push(redirectPath);
    }
  }, [dispatch, router]);

  return <>{children}</>;
}