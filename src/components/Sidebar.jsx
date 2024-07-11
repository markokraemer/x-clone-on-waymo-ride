import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Home, MessageSquare, Bell, User, Settings, Search, TrendingUp, DollarSign } from 'lucide-react';

const Sidebar = () => {
  const router = useRouter();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/search', icon: Search, label: 'Search' },
    { href: '/notifications', icon: Bell, label: 'Notifications' },
    { href: '/messages', icon: MessageSquare, label: 'Messages' },
    { href: '/profile', icon: User, label: 'Profile' },
    { href: '/settings', icon: Settings, label: 'Settings' },
    { href: '/trending', icon: TrendingUp, label: 'Trending' },
  ];

  return (
    <div className="flex flex-col h-full">
      <nav className="space-y-2 mb-6">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} passHref>
            <Button
              variant={router.pathname === item.href ? 'default' : 'ghost'}
              className="w-full justify-start"
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <Button className="w-full" size="lg">
          <DollarSign className="h-5 w-5 mr-2" />
          Upgrade to Pro
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;