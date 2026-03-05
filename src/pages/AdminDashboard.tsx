import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, LogOut, UserCircle, Link as LinkIcon, Image as ImageIcon, Briefcase, FileText } from 'lucide-react';
import { usePortfolios, Portfolio } from '../context/PortfolioContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { portfolios, updatePortfolio } = usePortfolios();
  const [selectedId, setSelectedId] = useState<string>(portfolios[0].id);
  const [formData, setFormData] = useState<Portfolio>(portfolios[0]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const selected = portfolios.find(p => p.id === selectedId);
    if (selected) {
      setFormData(selected);
    }
  }, [selectedId, portfolios]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updatePortfolio(selectedId, formData);
      setIsSaving(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#ECE9D8] font-sans select-none flex flex-col">
      {/* Title Bar */}
      <div className="h-8 bg-gradient-to-r from-[#0058EE] via-[#3593FF] to-[#0058EE] flex items-center justify-between px-2 border-b border-white/20 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
            <UserCircle className="w-3 h-3 text-blue-600" />
          </div>
          <span className="text-white font-bold text-sm drop-shadow-md">Admin Dashboard - Affan</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-1 text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-2 py-0.5 rounded border border-white/30 transition-colors"
        >
          <LogOut className="w-3 h-3" /> Logout
        </button>
      </div>

      {/* Menu Bar */}
      <div className="bg-[#ECE9D8] border-b border-gray-300 px-2 py-1 flex gap-4 text-xs">
        <span className="hover:bg-blue-600 hover:text-white px-2 cursor-default">File</span>
        <span className="hover:bg-blue-600 hover:text-white px-2 cursor-default">Edit</span>
        <span className="hover:bg-blue-600 hover:text-white px-2 cursor-default">View</span>
        <span className="hover:bg-blue-600 hover:text-white px-2 cursor-default">Help</span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-300 flex flex-col">
          <div className="p-4 bg-gradient-to-b from-[#7BA2E7] to-[#6375D6] text-white font-bold text-sm shadow-inner">
            Team Members
          </div>
          <div className="flex-1 overflow-auto p-2 space-y-1">
            {portfolios.map(portfolio => (
              <button
                key={portfolio.id}
                onClick={() => setSelectedId(portfolio.id)}
                className={`w-full text-left px-3 py-2 flex items-center gap-3 transition-colors border ${
                  selectedId === portfolio.id 
                    ? 'bg-[#316AC5] text-white border-[#316AC5]' 
                    : 'text-gray-800 border-transparent hover:bg-[#E5F3FF] hover:border-[#CCE8FF]'
                }`}
              >
                <img 
                  src={portfolio.imageUrl} 
                  alt={portfolio.name} 
                  className="w-8 h-8 object-cover border border-gray-300"
                  referrerPolicy="no-referrer"
                />
                <div className="truncate">
                  <div className="font-bold text-xs truncate">{portfolio.name}</div>
                  <div className={`text-[10px] truncate ${selectedId === portfolio.id ? 'text-blue-100' : 'text-gray-500'}`}>
                    {portfolio.role}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Editor */}
        <main className="flex-1 bg-white p-8 overflow-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8 border-b-2 border-gray-100 pb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
                <p className="text-gray-500 text-sm">Update information for {formData.name}</p>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="bg-gradient-to-b from-[#F0F0F0] to-[#D0D0D0] border border-gray-400 hover:brightness-105 disabled:opacity-50 text-gray-800 px-6 py-2 rounded font-bold shadow-sm flex items-center gap-2 transition-all active:shadow-inner"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 flex items-center gap-2">
                  <UserCircle className="w-4 h-4" /> Full Name
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 shadow-inner"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Role
                </label>
                <input 
                  type="text" 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 shadow-inner"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-600 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Profile Image URL
                </label>
                <input 
                  type="url" 
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 shadow-inner"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-600 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Biography
                </label>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 shadow-inner resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> GitHub URL
                </label>
                <input 
                  type="url" 
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 shadow-inner"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> LinkedIn URL
                </label>
                <input 
                  type="url" 
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 shadow-inner"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-600 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> Portfolio Website URL
                </label>
                <input 
                  type="url" 
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 shadow-inner"
                />
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
