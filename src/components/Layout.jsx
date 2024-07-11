import NavBar from '@/components/NavBar';
import { Card, CardContent } from '@/components/ui/card';
import PricingCard from '@/components/PricingCard';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-3">
            <CardContent className="p-6">
              {children}
            </CardContent>
          </Card>
          <div className="space-y-6">
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
    </div>
  );
};

export default Layout;