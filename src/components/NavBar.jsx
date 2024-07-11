import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/UserAvatar';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import { useUser } from '@/context/UserContext';
import { Home, MessageSquare, Bell, Settings, User, Menu } from 'lucide-react';
import { useState } from 'react';

const NavBar = () => {
  const router = useRouter();
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/messages', icon: MessageSquare, label: 'Messages' },
    { href: '/notifications', icon: Bell, label: 'Notifications' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="border-b sticky top-0 z-10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Logo className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold text-primary">X49</span>
            </Link>
          </div>

          <div className="hidden md:block w-full max-w-xs ml-10">
            <SearchBar />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button variant={router.pathname === item.href ? 'default' : 'ghost'} size="icon">
                  <item.icon className="h-5 w-5" />
                </Button>
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/profile" passHref>
                  <Button variant="ghost" size="icon">
                    <UserAvatar user={user} size="sm" />
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="outline">Logout</Button>
              </>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={router.pathname === item.href ? 'default' : 'ghost'}
                  className="w-full justify-start"
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/profile" passHref>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="outline" className="w-full">Logout</Button>
              </>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;