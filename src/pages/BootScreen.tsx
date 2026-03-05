import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BootScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 6000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center cursor-none">
      <div className="flex flex-col items-center gap-12">
        <div className="flex items-end gap-2">
          <h1 className="text-white text-6xl font-bold italic tracking-tighter">
            Microsoft
          </h1>
          <h1 className="text-white text-7xl font-bold italic tracking-tighter">
            Windows <span className="text-orange-500">XP</span>
          </h1>
        </div>
        
        <div className="w-64 h-6 border-2 border-gray-500 rounded-md p-1 relative overflow-hidden bg-black">
          <div className="h-full w-12 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 rounded-sm absolute animate-xp-load shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        </div>
      </div>
    </div>
  );
}
