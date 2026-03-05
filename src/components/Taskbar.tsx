import React, { useState, useEffect } from 'react';

interface TaskbarProps {
  windows: any[];
  onWindowClick: (id: string) => void;
  activeWindowId: string | null;
  onStartClick: () => void;
}

export default function Taskbar({ windows, onWindowClick, activeWindowId, onStartClick }: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="h-[30px] w-full fixed bottom-0 left-0 flex items-center justify-between z-50 font-sans select-none"
         style={{
           background: 'linear-gradient(to bottom, #245EDC 0%, #3F8CF3 9%, #245EDC 18%, #245EDC 92%, #333 100%)',
           borderTop: '1px solid #0055EA'
         }}>
      <div className="flex items-center h-full flex-1 overflow-hidden">
        {/* Start Button */}
        <div 
          id="start-button"
          onClick={onStartClick}
          className="h-full flex items-center px-3 cursor-pointer hover:brightness-110 transition-all flex-shrink-0"
          style={{
            background: 'radial-gradient(circle at 50% 10%, #4EAC58 0%, #349E43 40%, #20812D 100%)',
            borderTopRightRadius: '10px',
            borderBottomRightRadius: '10px',
            boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.6), 2px 0 3px rgba(0,0,0,0.4)',
            borderRight: '1px solid #104216',
            borderTop: '1px solid #52C261'
          }}
        >
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 100 100" className="w-5 h-5 drop-shadow-md" style={{ transform: 'skewY(-5deg)' }}>
              <path d="M 0 20 Q 22 5 45 15 L 45 50 Q 22 40 0 55 Z" fill="#E83E24" />
              <path d="M 50 15 Q 75 25 100 10 L 100 45 Q 75 60 50 50 Z" fill="#35A736" />
              <path d="M 0 60 Q 22 45 45 55 L 45 90 Q 22 80 0 95 Z" fill="#00A2ED" />
              <path d="M 50 55 Q 75 65 100 50 L 100 85 Q 75 100 50 90 Z" fill="#F7B71D" />
            </svg>
            <span className="text-white font-bold italic text-base drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] pr-1" style={{ fontFamily: 'Tahoma, sans-serif' }}>start</span>
          </div>
        </div>

        {/* Window Buttons */}
        <div className="flex items-center gap-1 px-2 h-full flex-1 overflow-x-auto overflow-y-hidden">
          {windows.map(win => {
            const isActive = activeWindowId === win.id && !win.isMinimized;
            return (
              <div 
                key={win.id}
                onClick={() => onWindowClick(win.id)}
                className="h-[24px] min-w-[120px] max-w-[160px] flex items-center gap-1 px-2 rounded-[3px] cursor-pointer border truncate"
                style={{
                  background: isActive 
                    ? 'linear-gradient(to bottom, #1B56B5 0%, #15428A 100%)' 
                    : 'linear-gradient(to bottom, #3C81F3 0%, #2562D1 100%)',
                  borderColor: isActive ? '#000000' : '#104286',
                  boxShadow: isActive ? 'inset 1px 1px 2px rgba(0,0,0,0.5)' : 'inset 1px 1px 2px rgba(255,255,255,0.3)',
                  color: 'white',
                  fontFamily: 'Tahoma, sans-serif',
                  fontSize: '11px'
                }}
              >
                {win.icon ? (
                  <div className="w-4 h-4 text-white drop-shadow-md flex-shrink-0">{win.icon}</div>
                ) : (
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Internet_Explorer_6_Logo.svg/512px-Internet_Explorer_6_Logo.svg.png" alt="IE" className="w-4 h-4 flex-shrink-0 drop-shadow-md" referrerPolicy="no-referrer" />
                )}
                <span className="truncate drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">{win.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Tray */}
      <div 
        className="h-full flex items-center px-3 text-white text-xs font-normal flex-shrink-0"
        style={{
          background: 'linear-gradient(to bottom, #0C59B9 0%, #139EE9 10%, #18B5F2 15%, #0997DF 20%, #0862A6 100%)',
          borderLeft: '1px solid #104286',
          boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.2)'
        }}
      >
        <div className="flex items-center gap-3">
          {/* Icons */}
          <div className="flex items-center gap-1 opacity-90">
            {/* Volume Icon */}
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            {/* Network Icon */}
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm-9-3l-3-3h2V9h2v4h2l-3 3z"/>
            </svg>
          </div>
          <span className="drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]" style={{ fontFamily: 'Tahoma, sans-serif' }}>{timeString}</span>
        </div>
      </div>
    </div>
  );
}
