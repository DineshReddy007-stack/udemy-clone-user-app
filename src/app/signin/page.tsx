'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import SignIn2 from '@/components/auth/SignIn2';

export default function SignInPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/home'); // Use replace instead of push
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen">
      <SignIn2 />
    </div>
  );
}