import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import PricingCard from '@/components/PricingCard';
import TrendingTopics from '@/components/TrendingTopics';
import WhoToFollow from '@/components/WhoToFollow';
import NotificationSystem from '@/components/NotificationSystem';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const Layout = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoadingSpinner />;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen bg-background ${theme === 'dark' ? 'dark' : ''}`}>
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block w-64">
            <Sidebar />
          </div>
          <Card className="flex-grow">
            <CardContent className="p-6">
              {children}
            </CardContent>
          </Card>
          <div className="lg:w-80 space-y-6">
            <div className="lg:sticky lg:top-20">
              <TrendingTopics />
              <div className="mt-6">
                <WhoToFollow />
              </div>
              <div className="mt-6">
                <PricingCard />
              </div>
              <Card className="mt-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">About X49</h3>
                  <p className="text-sm text-muted-foreground">
                    X49 is the everything app for just $49/year. Connect, share, and transact with ease.
                  </p>
                </CardContent>
              </Card>
              <Button onClick={toggleTheme} variant="outline" className="w-full mt-6">
                {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <NotificationSystem />
    </div>
  );
};

export default Layout;