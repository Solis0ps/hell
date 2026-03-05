import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolios } from '../context/PortfolioContext';
import Taskbar from '../components/Taskbar';
import XPWindow from '../components/XPWindow';
import { FileText, ExternalLink, Github, Linkedin, Power } from 'lucide-react';

interface WindowData {
  id: string;
  title: string;
  icon?: React.ReactNode;
  url?: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  content: React.ReactNode;
}

export default function Desktop() {
  const navigate = useNavigate();
  const { portfolios } = usePortfolios();
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isShutdownDialogOpen, setIsShutdownDialogOpen] = useState(false);
  const [isPoweredOff, setIsPoweredOff] = useState(false);

  const bringToFront = (id: string) => {
    setNextZIndex(prev => prev + 1);
    setWindows(prev => prev.map(win => 
      win.id === id ? { ...win, zIndex: nextZIndex } : win
    ));
    setActiveWindowId(id);
  };

  const openWindow = (windowData: Omit<WindowData, 'isMinimized' | 'isMaximized' | 'zIndex'>) => {
    const existingWindow = windows.find(w => w.id === windowData.id);
    if (existingWindow) {
      setWindows(prev => prev.map(win => 
        win.id === windowData.id ? { ...win, isMinimized: false } : win
      ));
      bringToFront(windowData.id);
    } else {
      setNextZIndex(prev => prev + 1);
      setWindows(prev => [...prev, {
        ...windowData,
        isMinimized: false,
        isMaximized: false,
        zIndex: nextZIndex
      }]);
      setActiveWindowId(windowData.id);
    }
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(win => win.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const toggleMinimize = (id: string) => {
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        const newMinimized = !win.isMinimized;
        if (!newMinimized) bringToFront(id);
        return { ...win, isMinimized: newMinimized };
      }
      return win;
    }));
  };

  const toggleMaximize = (id: string) => {
    setWindows(prev => prev.map(win => 
      win.id === id ? { ...win, isMaximized: !win.isMaximized } : win
    ));
    bringToFront(id);
  };

  const handleTaskbarClick = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (!win) return;
    
    if (win.isMinimized) {
      toggleMinimize(id);
    } else if (activeWindowId === id) {
      toggleMinimize(id);
    } else {
      bringToFront(id);
    }
  };

  const handleLogOff = () => {
    navigate('/');
  };

  const handleShutDownClick = () => {
    setIsStartMenuOpen(false);
    setIsShutdownDialogOpen(true);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const handleShutDown = () => {
    try {
      window.close();
    } catch (e) {
      // Ignore error
    }
    setIsPoweredOff(true);
  };

  const getRole = (name: string, originalRole: string) => {
    if (name.includes('Muhammad Azzam Rantisi')) return 'Entry Fragger';
    if (name.includes('Gavin Rafif Ghaisan')) return 'Main AWPer';
    if (name.includes('Athailah Sachio')) return 'Support & Secondary AWPer';
    if (name.includes('Zhafran Radya Bagaskara Marhali')) return 'In-Game Leader';
    return originalRole;
  };

  const getBio = (name: string, originalBio: string) => {
    if (name.includes('Muhammad Azzam Rantisi')) return "First through the door, every round. Takes the fight so the team doesn't have to.";
    if (name.includes('Gavin Rafif Ghaisan')) return "One shot, one kill. Controls the map with patience and precision from behind the scope.";
    if (name.includes('Athailah Sachio')) return "Sets up his teammates with the right flash at the right time. Picks up the AWP when it counts.";
    if (name.includes('Zhafran Radya Bagaskara Marhali')) return "The brain behind every round. Reads the game, calls the strats, and keeps the team sharp under pressure.";
    return originalBio;
  };

  const renderLandingPageContent = () => (
    <div className="w-full h-full bg-[#0d1117] overflow-y-auto" style={{ fontFamily: 'Tahoma, Verdana, sans-serif', fontSize: '11px', color: '#cccccc' }}>
      <div className="w-[960px] mx-auto bg-[#0d1117] border-x border-[#2a3a4a] min-h-full flex flex-col">
        
        {/* Header Banner */}
        <div 
          className="h-[100px] border-b-2 border-[#5b9bd5] flex items-center px-6 relative"
          style={{ background: 'linear-gradient(to bottom, #1a2433 0%, #0d1117 100%)' }}
        >
          <div className="text-white text-3xl font-bold tracking-tighter" style={{ textShadow: '1px 1px 2px black' }}>
            Team Liquid
          </div>
          <div className="absolute bottom-0 right-6 flex gap-1">
            <div className="px-4 py-1 bg-[#0d1117] border border-b-0 border-[#2a3a4a] text-[#5b9bd5] font-bold text-[10px] uppercase">Home</div>
            <div className="px-4 py-1 bg-[#1a2433] border border-b-0 border-[#2a3a4a] text-[#cccccc] hover:text-white hover:bg-[#2a3a4a] cursor-pointer text-[10px] uppercase transition-colors">Forums</div>
            <div className="px-4 py-1 bg-[#1a2433] border border-b-0 border-[#2a3a4a] text-[#cccccc] hover:text-white hover:bg-[#2a3a4a] cursor-pointer text-[10px] uppercase transition-colors">Servers</div>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex flex-1">
          
          {/* Left Sidebar */}
          <div className="w-[200px] border-r border-[#2a3a4a] p-3 flex flex-col gap-4 bg-[#0d1117]">
            
            {/* Nav Block */}
            <div className="border border-[#2a3a4a]">
              <div 
                className="px-2 py-1 text-[#5b9bd5] font-bold text-[11px] uppercase border-b border-[#2a3a4a]"
                style={{ background: 'linear-gradient(to bottom, #1a2433 0%, #0d1117 100%)' }}
              >
                Main Menu
              </div>
              <div className="flex flex-col">
                <a href="#" className="px-2 py-1.5 border-b border-[#2a3a4a] hover:bg-[#1a2433] text-[#cccccc] hover:text-[#5b9bd5] transition-colors">News</a>
                <a href="#" className="px-2 py-1.5 border-b border-[#2a3a4a] hover:bg-[#1a2433] text-[#cccccc] hover:text-[#5b9bd5] transition-colors">Roster</a>
                <a href="#" className="px-2 py-1.5 border-b border-[#2a3a4a] hover:bg-[#1a2433] text-[#cccccc] hover:text-[#5b9bd5] transition-colors">Matches</a>
                <a href="#" className="px-2 py-1.5 border-b border-[#2a3a4a] hover:bg-[#1a2433] text-[#cccccc] hover:text-[#5b9bd5] transition-colors">Downloads</a>
                <a href="#" className="px-2 py-1.5 hover:bg-[#1a2433] text-[#cccccc] hover:text-[#5b9bd5] transition-colors">Contact</a>
              </div>
            </div>

            {/* Server Status Block */}
            <div className="border border-[#2a3a4a]">
              <div 
                className="px-2 py-1 text-[#5b9bd5] font-bold text-[11px] uppercase border-b border-[#2a3a4a]"
                style={{ background: 'linear-gradient(to bottom, #1a2433 0%, #0d1117 100%)' }}
              >
                Server Status
              </div>
              <div className="p-2 text-[10px]">
                <div className="text-[#5b9bd5] font-bold mb-1">CS 1.6 Public</div>
                <div className="flex justify-between mb-2"><span>Players:</span><span className="text-white">24/32</span></div>
                <div className="text-[#5b9bd5] font-bold mb-1">TF2 Payload</div>
                <div className="flex justify-between"><span>Players:</span><span className="text-white">18/24</span></div>
              </div>
            </div>

          </div>

          {/* Content Area */}
          <div className="flex-1 p-4 bg-[#0d1117]">
            
            <div className="border border-[#2a3a4a] mb-4">
              <div 
                className="px-3 py-1.5 text-[#5b9bd5] font-bold text-[12px] border-b border-[#2a3a4a]"
                style={{ background: 'linear-gradient(to bottom, #1a2433 0%, #0d1117 100%)' }}
              >
                MEET THE TEAM
              </div>
              <div className="p-3">
                <p className="mb-4 text-[11px] leading-relaxed">
                  Official CS 1.6 Team Liquid roster.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {portfolios.map((portfolio) => (
                    <div key={portfolio.id} className="border border-[#2a3a4a] bg-[#0d1117]">
                      <div 
                        className="px-2 py-1 border-b border-[#2a3a4a] flex justify-between items-center"
                        style={{ background: 'linear-gradient(to bottom, #1a2433 0%, #0d1117 100%)' }}
                      >
                        <span className="text-white font-bold">{portfolio.name}</span>
                        <span className="text-[#5b9bd5] text-[10px]">{getRole(portfolio.name, portfolio.role)}</span>
                      </div>
                      <div className="p-2 flex gap-3">
                        <img 
                          src={portfolio.imageUrl} 
                          alt={portfolio.name}
                          className="w-[60px] h-[60px] object-cover border border-[#2a3a4a]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 flex flex-col">
                          <p className="text-[10px] mb-2 line-clamp-3">{getBio(portfolio.name, portfolio.bio)}</p>
                          
                          <div className="flex items-center gap-2 mt-auto pt-2 border-t border-[#2a3a4a]">
                            <a 
                              href={portfolio.portfolioUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="ml-auto px-2 py-0.5 border border-[#2a3a4a] bg-[#1a2433] hover:bg-[#2a3a4a] hover:border-[#5b9bd5] text-white text-[10px] transition-colors flex items-center gap-1"
                            >
                              Profile <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="h-[40px] border-t border-[#2a3a4a] bg-[#0d1117] flex items-center justify-center text-[10px] text-[#888888]">
          © 2008 Team Liquid CS 1.6 Division. All rights reserved.
        </div>
      </div>
    </div>
  );

  if (isPoweredOff) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden font-sans select-none">
        <span 
          className="text-center"
          style={{ 
            fontFamily: 'Tahoma, sans-serif', 
            color: '#FF8C00', 
            fontSize: '24px'
          }}
        >
          It is now safe to turn off your computer.
        </span>
      </div>
    );
  }

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative font-sans select-none bg-[#004E98]"
      style={{
        backgroundImage: 'url("https://images.hdqwalls.com/download/windows-xp-bliss-4k-lu-3840x2160.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      onClick={() => isStartMenuOpen && setIsStartMenuOpen(false)}
    >
      {/* Desktop Icons */}
      <div className="p-4 flex flex-col gap-6 w-max">
        <div 
          className="flex flex-col items-center gap-1 cursor-pointer group w-20"
          onDoubleClick={() => openWindow({
            id: 'landing-page',
            title: 'Affan - Landing Page',
            url: 'http://www.teamliquid.net/team/roster.php',
            icon: <FileText className="w-4 h-4" />,
            content: renderLandingPageContent()
          })}
        >
          <div className="w-[32px] h-[32px] relative flex items-center justify-center drop-shadow-md">
            <img 
              src="https://image2url.com/r2/default/images/1772598969844-b5d1b4cf-b972-47ef-939b-b00061816301.png" 
              alt="Internet Explorer" 
              className="w-full h-full object-contain drop-shadow-sm group-hover:opacity-80 transition-opacity" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <span 
            className="text-white text-[11px] text-center px-1 group-hover:bg-[#316AC5] group-hover:bg-opacity-60 rounded-sm"
            style={{ fontFamily: 'Tahoma, sans-serif', textShadow: '1px 1px 2px black' }}
          >
            landing page
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 cursor-pointer group w-20">
          <div className="w-[32px] h-[32px] relative flex items-center justify-center drop-shadow-md">
            <img 
              src="https://image2url.com/r2/default/images/1772525103774-ddb7a041-a2bd-4d81-9f1f-d953095e296f.png" 
              alt="Half-Life" 
              className="w-full h-full object-contain drop-shadow-sm group-hover:opacity-80 transition-opacity" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <span 
            className="text-white text-[11px] text-center px-1 group-hover:bg-[#316AC5] group-hover:bg-opacity-60 rounded-sm"
            style={{ fontFamily: 'Tahoma, sans-serif', textShadow: '1px 1px 2px black' }}
          >
            Half-Life
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 cursor-pointer group w-20">
          <div className="w-[32px] h-[32px] relative flex items-center justify-center drop-shadow-md">
            <img 
              src="https://image2url.com/r2/default/images/1772525215657-45fc3910-c878-4f42-8c60-aba5d1db3b3a.png" 
              alt="Counter-Strike" 
              className="w-full h-full object-contain drop-shadow-sm group-hover:opacity-80 transition-opacity" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <span 
            className="text-white text-[11px] text-center px-1 group-hover:bg-[#316AC5] group-hover:bg-opacity-60 rounded-sm"
            style={{ fontFamily: 'Tahoma, sans-serif', textShadow: '1px 1px 2px black' }}
          >
            Counter-Strike
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 cursor-pointer group w-20">
          <div className="w-[32px] h-[32px] relative flex items-center justify-center drop-shadow-md">
            <img 
              src="https://image2url.com/r2/default/images/1772524941831-ade6d5a6-32a0-4013-a890-a6b1dfef9d42.png" 
              alt="Yume Nikki" 
              className="w-full h-full object-contain drop-shadow-sm group-hover:opacity-80 transition-opacity" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <span 
            className="text-white text-[11px] text-center px-1 group-hover:bg-[#316AC5] group-hover:bg-opacity-60 rounded-sm"
            style={{ fontFamily: 'Tahoma, sans-serif', textShadow: '1px 1px 2px black' }}
          >
            Yume Nikki
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 cursor-pointer group w-20">
          <div className="w-[32px] h-[32px] relative flex items-center justify-center drop-shadow-md">
            <img 
              src="https://image2url.com/r2/default/images/1772525314035-f0ef9d6d-a805-4785-91ad-13faa9d63eca.png" 
              alt="Team Fortress 2" 
              className="w-full h-full object-contain drop-shadow-sm group-hover:opacity-80 transition-opacity" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <span 
            className="text-white text-[11px] text-center px-1 group-hover:bg-[#316AC5] group-hover:bg-opacity-60 rounded-sm"
            style={{ fontFamily: 'Tahoma, sans-serif', textShadow: '1px 1px 2px black' }}
          >
            Team Fortress 2
          </span>
        </div>
      </div>

      {/* Render Windows */}
      {windows.map(win => (
        <XPWindow 
          key={win.id}
          id={win.id}
          title={win.title}
          icon={win.icon}
          url={win.url}
          isMinimized={win.isMinimized}
          isMaximized={win.isMaximized}
          zIndex={win.zIndex}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => toggleMinimize(win.id)}
          onMaximize={() => toggleMaximize(win.id)}
          onFocus={() => bringToFront(win.id)}
          initialPosition={{ x: 50 + (windows.indexOf(win) * 20), y: 50 + (windows.indexOf(win) * 20) }}
        >
          {win.content}
        </XPWindow>
      ))}

      {/* Start Menu */}
      {isStartMenuOpen && (
        <div 
          className="start-menu absolute bottom-[30px] left-0 w-[380px] z-[100] shadow-[2px_2px_10px_rgba(0,0,0,0.5)] rounded-t-md overflow-hidden flex flex-col"
          style={{
            background: 'linear-gradient(to right, #4282D6 0%, #3B75C4 100%)',
            border: '1px solid #0055EA',
            borderBottom: 'none',
            fontFamily: 'Tahoma, sans-serif',
            fontSize: '11px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header */}
          <div 
            className="h-[50px] flex items-center px-2 gap-2"
            style={{
              background: 'linear-gradient(to bottom, #1868CE 0%, #0E60CB 12%, #0E60CB 20%, #1164CF 32%, #1667D0 33%, #1B6CD3 47%, #1E70D9 54%, #2476DC 60%, #297AE0 65%, #3482E3 77%, #3786E5 79%, #428EE9 90%, #4791EB 100%)',
              borderBottom: '1px solid #F58200'
            }}
          >
            <div className="w-10 h-10 bg-white rounded-md border-2 border-white overflow-hidden flex items-center justify-center shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Folder_Icon.svg/512px-Folder_Icon.svg.png" className="w-6 h-6" alt="User" referrerPolicy="no-referrer" />
            </div>
            <span className="text-white font-bold text-sm drop-shadow-md">Affan</span>
          </div>

          {/* Body (Empty for simplified menu) */}
          <div className="flex-1 bg-white flex min-h-[300px]">
            <div className="w-[180px] bg-white border-r border-[#95BEE6]"></div>
            <div className="flex-1 bg-[#D3E5FA]"></div>
          </div>

          {/* Bottom Footer */}
          <div 
            className="h-[42px] flex items-center justify-end px-4 gap-4"
            style={{
              background: 'linear-gradient(to bottom, #4282D6 0%, #3B75C4 100%)',
              borderTop: '1px solid #71A9ED'
            }}
          >
            <button 
              onClick={handleLogOff}
              className="flex items-center gap-1 text-white hover:brightness-110 group"
            >
              <img src="https://image2url.com/r2/default/images/1772513277856-711d0992-6aa7-4762-944c-74e50f656510.png" alt="Log Off" className="w-6 h-6 group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
              <span>Log Off</span>
            </button>
            <button 
              onClick={handleShutDownClick}
              className="flex items-center gap-1 text-white hover:brightness-110 group"
            >
              <img src="https://www.rw-designer.com/icon-view/6357.png" alt="Shut Down" className="w-6 h-6 group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
              <span>Shut Down</span>
            </button>
          </div>
        </div>
      )}

      {/* Shutdown Overlay */}
      {isShutdownDialogOpen && (
        <div className="shutdown-overlay fixed inset-0 z-[200] flex items-center justify-center backdrop-grayscale backdrop-brightness-50">
          <div className="w-[400px] flex flex-col font-sans select-none">
            {/* Header */}
            <div 
              className="h-[40px] flex items-center px-4"
              style={{
                background: 'linear-gradient(to right, #003399 0%, #0055E5 100%)',
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px'
              }}
            >
              <span className="text-white text-lg font-bold" style={{ fontFamily: 'Franklin Gothic Medium, sans-serif' }}>
                Microsoft<sup className="text-xs">®</sup> Windows<sup className="text-xs">®</sup> XP Professional
              </span>
            </div>
            
            {/* Body */}
            <div 
              className="bg-[#5A7EDC] flex flex-col items-center py-8"
              style={{
                background: 'linear-gradient(to right, #5A7EDC 0%, #7A9DF4 50%, #5A7EDC 100%)',
              }}
            >
              <span className="text-white text-xl mb-8" style={{ fontFamily: 'Tahoma, sans-serif' }}>Turn off computer</span>
              
              <div className="flex items-center gap-12">
                <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={handleRestart}>
                  <div className="w-10 h-10 rounded-md bg-[#316AC5] flex items-center justify-center shadow-md border border-white/30 group-hover:bg-[#4282D6] transition-colors">
                    <img src="https://image2url.com/r2/default/images/1772513325713-16573e0d-11a4-49e9-b1f0-1e2d921f9141.png" alt="Restart" className="w-6 h-6" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-white text-sm" style={{ fontFamily: 'Tahoma, sans-serif' }}>Restart</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={handleShutDown}>
                  <div className="w-10 h-10 rounded-md bg-[#E43E24] flex items-center justify-center shadow-md border border-white/30 group-hover:bg-[#F54F35] transition-colors">
                    <img src="https://www.rw-designer.com/icon-view/6357.png" alt="Shut Down" className="w-6 h-6" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-white text-sm" style={{ fontFamily: 'Tahoma, sans-serif' }}>Turn Off</span>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div 
              className="h-[40px] flex items-center justify-end px-4"
              style={{
                background: 'linear-gradient(to right, #003399 0%, #0055E5 100%)',
                borderBottomLeftRadius: '4px',
                borderBottomRightRadius: '4px'
              }}
            >
              <button 
                onClick={() => setIsShutdownDialogOpen(false)}
                className="px-4 py-1 bg-[#ECE9D8] border border-gray-400 rounded shadow-sm text-black text-xs hover:bg-[#F5F4EA]"
                style={{ fontFamily: 'Tahoma, sans-serif' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Taskbar 
        windows={windows} 
        onWindowClick={handleTaskbarClick} 
        activeWindowId={activeWindowId} 
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
      />
    </div>
  );
}
