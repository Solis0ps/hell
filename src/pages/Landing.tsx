import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, ExternalLink, ShieldCheck } from 'lucide-react';
import { usePortfolios } from '../context/PortfolioContext';
import { Link } from 'react-router-dom';

export default function Landing() {
  const { portfolios } = usePortfolios();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">I</span>
            IRON FIST
          </div>
          <Link 
            to="/admin" 
            className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            Admin
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Iron Fist</span> Team
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12"
          >
            A collective of passionate developers and designers building the future of the web. Explore our individual portfolios below.
          </motion.p>
        </div>
      </section>

      {/* Portfolios Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolios.map((portfolio, index) => (
              <motion.div
                key={portfolio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-colors"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={portfolio.imageUrl} 
                    alt={portfolio.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{portfolio.name}</h3>
                  <p className="text-indigo-400 text-sm font-medium mb-4">{portfolio.role}</p>
                  <p className="text-zinc-400 text-sm mb-6 line-clamp-3">
                    {portfolio.bio}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <a href={portfolio.githubUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href={portfolio.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={portfolio.portfolioUrl} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors">
                      Portfolio <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-zinc-500 text-sm">
        <p>© {new Date().getFullYear()} Iron Fist Team. All rights reserved.</p>
      </footer>
    </div>
  );
}
