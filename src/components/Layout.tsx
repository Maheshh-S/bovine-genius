
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex gap-6 items-center">
            <Link to="/" className="font-semibold text-xl">
              CattleVision
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link 
                to="/" 
                className={`transition-colors hover:text-primary ${
                  location.pathname === '/' ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/predict" 
                className={`transition-colors hover:text-primary ${
                  location.pathname === '/predict' ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                Detect Breed
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-border/40 py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
          <p className="text-sm text-muted-foreground">
            © 2024 CattleVision. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
