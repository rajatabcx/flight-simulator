'use client';
import Simulation from '@/components/Simulation';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className='w-full h-screen'>
      {mounted ? (
        <Simulation />
      ) : (
        <div className='flex items-center justify-center flex-col gap-2 h-full'>
          <h1 className='text-2xl font-bold'>Awesome experience loading...</h1>
          <p>Please wait while we load the model textures and others</p>
        </div>
      )}
    </div>
  );
}
