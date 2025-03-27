
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex gap-6 items-center">
            <Link to="/" className="font-semibold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {t('companyName')}
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link 
                to="/" 
                className={`transition-colors hover:text-primary ${
                  location.pathname === '/' ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {t('home')}
              </Link>
              <Link 
                to="/predict" 
                className={`transition-colors hover:text-primary ${
                  location.pathname === '/predict' ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {t('detectBreed')}
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSelector />
            
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  <Link 
                    to="/" 
                    className={`text-lg px-2 py-1 rounded-md transition-colors ${
                      location.pathname === '/' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-secondary'
                    }`}
                  >
                    {t('home')}
                  </Link>
                  <Link 
                    to="/predict" 
                    className={`text-lg px-2 py-1 rounded-md transition-colors ${
                      location.pathname === '/predict' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-secondary'
                    }`}
                  >
                    {t('detectBreed')}
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-border/40 py-6 md:py-0 bg-secondary/30">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
          <p className="text-sm text-muted-foreground">
            {t('copyright')}
          </p>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('privacyPolicy')}
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('termsOfService')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
