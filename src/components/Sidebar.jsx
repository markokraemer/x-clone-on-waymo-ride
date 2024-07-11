import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { Home, MessageSquare, Bell, User, Settings, DollarSign } from 'lucide-react';

const Sidebar = () => {
  const router = useRouter();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/messages', icon: MessageSquare, label: 'Messages' },
    { href: '/notifications', icon: Bell, label: 'Notifications' },
    { href: '/profile', icon: User, label: 'Profile' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col h-screen p-4">
      <Link href="/" className="flex items-center mb-6">
        <Logo className="h-8 w-8 text-primary" />
        <span className="ml-2 text-2xl font-bold text-primary">X49</span>
      </Link>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} passHref>
                <Button
                  variant={router.pathname === item.href ? 'default' : 'ghost'}
                  className="w-full justify-start"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Button className="w-full" size="lg">
        <DollarSign className="h-5 w-5 mr-2" />
        Upgrade to Pro
      </Button>
    </div>
  );
};

export default Sidebar;