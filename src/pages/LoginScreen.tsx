import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Power, ArrowRight, HelpCircle, Settings } from 'lucide-react';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'password') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div 
      className="h-screen w-screen flex flex-col overflow-hidden select-none relative" 
      style={{ 
        fontFamily: '"Trebuchet MS", sans-serif',
        background: 'radial-gradient(circle at 15% 25%, rgba(255, 255, 255, 0.4) 0%, transparent 40%), linear-gradient(to bottom, #4a6fa5, #2a4a8a)'
      }}
    >
      {/* Subtle grid/texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '4px 4px'
        }}
      />

      {/* Top Bar */}
      <div className="h-[60px] w-full bg-[#00008B] relative z-10 border-b-2 border-[#FFA500]" />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        
        {/* Left Panel */}
        <div className="flex-1 flex flex-col items-end pr-12 gap-4">
          <div className="flex flex-col items-end">
            <div className="flex flex-col items-start mb-8">
              <img 
                src="https://image2url.com/r2/default/images/1772522315677-8e3f162f-c9ac-43e3-9914-5d0392ad3bf3.png" 
                alt="Windows XP Logo" 
                className="w-[100px] h-[100px] mb-4 drop-shadow-md object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col items-start w-full">
                <span className="text-white text-sm font-bold tracking-wider mb-[-4px]">Microsoft<sup className="text-[10px] font-normal">®</sup></span>
                <div className="flex items-start">
                  <span className="text-white text-5xl font-bold tracking-tighter" style={{ fontFamily: '"Franklin Gothic Medium", Tahoma, sans-serif' }}>Windows</span>
                  <span className="text-[#FFA500] text-xl font-bold ml-1 mt-1">XP</span>
                </div>
                <span className="text-white text-xl italic tracking-widest mt-1">Professional</span>
              </div>
            </div>
            
            <h2 className="text-white text-2xl font-normal tracking-tight">
              To begin, click your user name
            </h2>
          </div>
        </div>

        {/* Center Divider */}
        <div className="w-[1px] h-[70%] bg-gradient-to-b from-transparent via-white to-transparent opacity-40 mx-8" />

        {/* Right Panel */}
        <div className="flex-1 flex flex-col gap-6 pl-8">
          
          {/* Affan */}
          <div className="flex flex-col">
            <div 
              className={`flex items-center gap-4 cursor-pointer p-2 rounded-lg transition-all w-max ${selectedUser === 'Affan' ? 'bg-[#316AC5] border border-white/50' : 'border border-transparent hover:bg-white/10'}`}
              onClick={() => {
                setSelectedUser('Affan');
                setError('');
              }}
            >
              <div className="w-16 h-16 bg-white rounded-md border-2 border-white overflow-hidden flex items-center justify-center">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpreview.redd.it%2Fwindows-xp-user-icons-part-1-v0-3vnad5nw74qb1.jpg%3Fwidth%3D1080%26crop%3Dsmart%26auto%3Dwebp%26s%3D43c42cb3550232ca468ccbba4498bcfe686a6bdc&f=1&nofb=1&ipt=6c6dcc65602775177ba35221893d60182ad07d7ca56531ff2ca00eb0d2d382b2" alt="Affan" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-2xl font-bold">
                  Affan
                </span>
                {selectedUser === 'Affan' && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-white text-sm">Click to log in</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/desktop');
                      }}
                      className="w-7 h-7 bg-[#32CD32] hover:bg-[#228B22] rounded flex items-center justify-center border border-white"
                    >
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Administrator */}
          <div className="flex flex-col">
            <div 
              className={`flex items-center gap-4 cursor-pointer p-2 rounded-lg transition-all w-max ${selectedUser === 'Administrator' ? 'bg-[#316AC5] border border-white/50' : 'border border-transparent hover:bg-white/10'}`}
              onClick={() => {
                setSelectedUser('Administrator');
                setError('');
              }}
            >
              <div className="w-16 h-16 bg-white rounded-md border-2 border-white overflow-hidden flex items-center justify-center">
                <img src="https://image2url.com/r2/default/images/1772522818264-90fd0f57-349e-4847-8fe1-2cbada4d0eee.png" alt="Administrator" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-2xl font-bold">
                  Administrator
                </span>
              </div>
            </div>

            {selectedUser === 'Administrator' && (
              <form onSubmit={handleAdminLogin} className="ml-[88px] mt-2 flex flex-col gap-1">
                <span className="text-white text-sm">Type your password</span>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    className="w-40 px-2 py-1 rounded-sm border border-gray-400 text-black focus:outline-none focus:border-blue-500 shadow-inner text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                  />
                  <button 
                    type="submit"
                    className="w-7 h-7 bg-[#32CD32] hover:bg-[#228B22] rounded flex items-center justify-center border border-white"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                  <button type="button" className="w-7 h-7 bg-[#4169E1] hover:bg-[#0000CD] rounded flex items-center justify-center border border-white">
                    <HelpCircle className="w-4 h-4 text-white" />
                  </button>
                </div>
                {error && <p className="text-[#FFB6C1] text-xs mt-1">{error}</p>}
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-[60px] w-full bg-[#00008B] relative z-10 flex items-center justify-between px-8 border-t border-[#ffffff33]">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 bg-[#FF4500] rounded-md border border-white flex items-center justify-center shadow-sm group-hover:bg-[#DC143C]">
            <Power className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-sm">Turn off computer</span>
        </div>
        <div className="text-white text-xs text-right max-w-md opacity-90">
          After you log on, you can add or change accounts.<br/>
          Just go to Control Panel and click User Accounts.
        </div>
      </div>
    </div>
  );
}
