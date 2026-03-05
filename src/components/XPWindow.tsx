import React, { useState, useRef, useEffect } from 'react';
import { X, Square, Minus, ChevronLeft, ChevronRight, Home, Star, Search } from 'lucide-react';

interface XPWindowProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  url?: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
  initialPosition?: { x: number, y: number };
}

const XPWindow: React.FC<XPWindowProps> = ({ 
  id, title, icon, url = "C:\\Documents and Settings\\Affan\\Desktop", 
  isMinimized, isMaximized, zIndex, 
  onClose, onMinimize, onMaximize, onFocus, 
  children, initialPosition = { x: 100, y: 100 } 
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState({ width: 700, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMaximized) {
      setPosition({ x: 0, y: 0 });
    }
  }, [isMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    if (isMaximized) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && !isMaximized) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (isMinimized) return null;

  return (
    <div 
      ref={windowRef}
      className="absolute bg-[#ECE9D8] rounded-t-lg shadow-[2px_2px_10px_rgba(0,0,0,0.5)] border border-[#0055E5] flex flex-col font-sans select-none overflow-hidden"
      style={{ 
        left: isMaximized ? 0 : position.x, 
        top: isMaximized ? 0 : position.y, 
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? 'calc(100vh - 30px)' : size.height,
        zIndex 
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div 
        className="h-[30px] rounded-t-lg flex items-center justify-between px-1 cursor-move"
        style={{
          background: 'linear-gradient(to bottom, #0058EE 0%, #3593FF 8%, #288EFF 40%, #127DFF 88%, #036BFF 100%)',
          borderBottom: '1px solid #000'
        }}
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-1 overflow-hidden">
          {icon ? (
            <div className="w-4 h-4 text-white drop-shadow-md flex-shrink-0 ml-1">{icon}</div>
          ) : (
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Internet_Explorer_6_Logo.svg/512px-Internet_Explorer_6_Logo.svg.png" alt="IE" className="w-4 h-4 ml-1 drop-shadow-md" referrerPolicy="no-referrer" />
          )}
          <span className="text-white font-bold text-sm drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] truncate" style={{ fontFamily: 'Trebuchet MS, sans-serif' }}>
            {title}
          </span>
        </div>
        
        <div className="flex items-center gap-[2px] pr-1 flex-shrink-0">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-[21px] h-[21px] bg-gradient-to-b from-[#fff] to-[#C4D3EB] border border-white rounded-[3px] flex items-center justify-center hover:brightness-110 shadow-[inset_0_-1px_2px_rgba(0,0,0,0.1)]"
            style={{ boxShadow: 'inset -1px -1px 1px rgba(0,0,0,0.2), inset 1px 1px 1px rgba(255,255,255,0.8)' }}
          >
            <Minus className="w-3 h-3 text-black stroke-[3]" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-[21px] h-[21px] bg-gradient-to-b from-[#fff] to-[#C4D3EB] border border-white rounded-[3px] flex items-center justify-center hover:brightness-110 shadow-[inset_0_-1px_2px_rgba(0,0,0,0.1)]"
            style={{ boxShadow: 'inset -1px -1px 1px rgba(0,0,0,0.2), inset 1px 1px 1px rgba(255,255,255,0.8)' }}
          >
            <Square className="w-3 h-3 text-black stroke-[3]" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-[21px] h-[21px] bg-gradient-to-b from-[#ECA49A] to-[#D03E2F] border border-white rounded-[3px] flex items-center justify-center hover:brightness-110 shadow-[inset_0_-1px_2px_rgba(0,0,0,0.1)]"
            style={{ boxShadow: 'inset -1px -1px 1px rgba(0,0,0,0.2), inset 1px 1px 1px rgba(255,255,255,0.8)' }}
          >
            <X className="w-4 h-4 text-white stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="h-[22px] bg-[#ECE9D8] border-b border-white flex items-center px-1 text-[11px] text-black" style={{ fontFamily: 'Tahoma, sans-serif' }}>
        <div className="px-2 hover:bg-[#316AC5] hover:text-white cursor-default">File</div>
        <div className="px-2 hover:bg-[#316AC5] hover:text-white cursor-default">Edit</div>
        <div className="px-2 hover:bg-[#316AC5] hover:text-white cursor-default">View</div>
        <div className="px-2 hover:bg-[#316AC5] hover:text-white cursor-default">Favorites</div>
        <div className="px-2 hover:bg-[#316AC5] hover:text-white cursor-default">Tools</div>
        <div className="px-2 hover:bg-[#316AC5] hover:text-white cursor-default">Help</div>
      </div>

      {/* Toolbar */}
      <div className="h-[38px] bg-[#ECE9D8] border-b border-gray-300 flex items-center px-1 gap-1">
        <div className="flex items-center gap-1 border-r border-gray-400 pr-2 h-[30px]">
          <button className="flex items-center gap-1 px-1 hover:border hover:border-gray-400 hover:bg-gray-200 rounded h-full text-gray-400 cursor-default">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center opacity-50">
              <ChevronLeft className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Back</span>
          </button>
          <button className="flex items-center gap-1 px-1 hover:border hover:border-gray-400 hover:bg-gray-200 rounded h-full text-gray-400 cursor-default">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center opacity-50">
              <ChevronRight className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>
        <div className="flex items-center gap-1 px-2 h-[30px]">
          <button className="flex flex-col items-center justify-center px-2 hover:border hover:border-gray-400 hover:bg-gray-200 rounded h-full">
            <Search className="w-4 h-4 text-blue-600" />
            <span className="text-[9px]">Search</span>
          </button>
          <button className="flex flex-col items-center justify-center px-2 hover:border hover:border-gray-400 hover:bg-gray-200 rounded h-full">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-[9px]">Favorites</span>
          </button>
        </div>
      </div>

      {/* Address Bar */}
      <div className="h-[26px] bg-[#ECE9D8] border-b border-gray-300 flex items-center px-2 gap-2 text-[11px]" style={{ fontFamily: 'Tahoma, sans-serif' }}>
        <span className="text-gray-600">Address</span>
        <div className="flex-1 bg-white border border-gray-400 h-[20px] flex items-center px-1 shadow-inner">
          <img 
            src={url.startsWith('http') ? "https://image2url.com/r2/default/images/1772598969844-b5d1b4cf-b972-47ef-939b-b00061816301.png" : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Folder_Icon.svg/512px-Folder_Icon.svg.png"} 
            alt="icon" 
            className="w-3 h-3 mr-1" 
            referrerPolicy="no-referrer" 
          />
          <span className="text-black truncate">{url}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white border-t border-white p-0 overflow-auto relative">
        {children}
      </div>
    </div>
  );
};

export default XPWindow;
