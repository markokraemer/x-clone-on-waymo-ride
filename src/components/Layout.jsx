import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import PricingCard from '@/components/PricingCard';
import NotificationCenter from '@/components/NotificationCenter';
import TrendingTopics from '@/components/TrendingTopics';
import DarkModeToggle from '@/components/DarkModeToggle';
import NotificationSystem from '@/components/NotificationSystem';
import WhoToFollow from '@/components/WhoToFollow';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
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
            <div className="flex justify-end mb-4">
              <DarkModeToggle />
            </div>
            <NotificationCenter />
            <TrendingTopics />
            <WhoToFollow />
            <PricingCard />
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">About X49</h3>
                <p className="text-sm text-muted-foreground">
                  X49 is the everything app for just $49/year. Connect, share, and transact with ease.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <NotificationSystem />
    </div>
  );
};

export default Layout;