import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Portfolio {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
}

interface PortfolioContextType {
  portfolios: Portfolio[];
  updatePortfolio: (id: string, data: Partial<Portfolio>) => void;
}

const defaultPortfolios: Portfolio[] = [
  {
    id: '1',
    name: 'Muhammad Azzam Rantisi',
    role: 'Frontend Developer',
    bio: 'Passionate about creating beautiful and responsive user interfaces.',
    imageUrl: 'https://image2url.com/r2/default/images/1772511499125-d3fb6fd2-fdc4-41de-b681-810cbbeb99e0.jpg',
    githubUrl: '#',
    linkedinUrl: '#',
    portfolioUrl: '#'
  },
  {
    id: '2',
    name: 'Gavin Rafif Ghaisan',
    role: 'Backend Developer',
    bio: 'Specializing in robust server-side architecture and databases.',
    imageUrl: 'https://image2url.com/r2/default/images/1772511535840-f2ee7615-75af-49e4-8cf9-938a66668087.jpg',
    githubUrl: '#',
    linkedinUrl: '#',
    portfolioUrl: '#'
  },
  {
    id: '3',
    name: 'Athailah Sachio',
    role: 'UI/UX Designer',
    bio: 'Designing intuitive and engaging user experiences.',
    imageUrl: 'https://image2url.com/r2/default/images/1772511560662-0afeff96-da33-4726-ba13-60412165d515.jpg',
    githubUrl: '#',
    linkedinUrl: '#',
    portfolioUrl: '#'
  },
  {
    id: '4',
    name: 'Zhafran Radya Bagaskara Marhali',
    role: 'Fullstack Developer',
    bio: 'Bridging the gap between frontend and backend technologies.',
    imageUrl: 'https://image2url.com/r2/default/images/1772511456166-508db69d-1198-43bf-a5ba-32dc692a0ce1.jpg',
    githubUrl: '#',
    linkedinUrl: '#',
    portfolioUrl: '#'
  }
];

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(defaultPortfolios);

  useEffect(() => {
    const fetchPortfolios = () => {
      try {
        const stored = localStorage.getItem('portfolios');
        if (stored) {
          const parsed = JSON.parse(stored) as Portfolio[];
          
          // Force update images if they don't match defaultPortfolios
          const updatedPortfolios = parsed.map(p => {
            const defaultP = defaultPortfolios.find(dp => dp.id === p.id);
            if (defaultP && p.imageUrl !== defaultP.imageUrl) {
              return { ...p, imageUrl: defaultP.imageUrl };
            }
            return p;
          });
          
          setPortfolios(updatedPortfolios);
          localStorage.setItem('portfolios', JSON.stringify(updatedPortfolios));
        } else {
          setPortfolios(defaultPortfolios);
          localStorage.setItem('portfolios', JSON.stringify(defaultPortfolios));
        }
      } catch (error) {
        console.error("Error fetching portfolios from localStorage:", error);
        setPortfolios(defaultPortfolios);
      }
    };

    fetchPortfolios();
  }, []);

  const updatePortfolio = (id: string, data: Partial<Portfolio>) => {
    setPortfolios(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...data } : p);
      localStorage.setItem('portfolios', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <PortfolioContext.Provider value={{ portfolios, updatePortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolios = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolios must be used within a PortfolioProvider');
  }
  return context;
};
