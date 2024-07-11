import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/UserAvatar';
import Logo from '@/components/Logo';
import Search from '@/components/Search';
import { useUser } from '@/context/UserContext';
import { Home, MessageSquare, Bell, Settings, User } from 'lucide-react';
import DarkModeToggle from '@/components/DarkModeToggle';
import NotificationCenter from '@/components/NotificationCenter';

const NavBar = () => {
  const router = useRouter();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleSearch = (query) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="border-b sticky top-0 z-10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Logo className="h-8 w-8 text-primary" />
            <span className="ml-2 text-2xl font-bold text-primary">X49</span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block w-64">
              <Search onSearch={handleSearch} />
            </div>
            <Link href="/" passHref>
              <Button variant={router.pathname === '/' ? 'default' : 'ghost'} size="icon">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/messages" passHref>
              <Button variant={router.pathname === '/messages' ? 'default' : 'ghost'} size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
            </Link>
            <NotificationCenter />
            {user ? (
              <>
                <Link href="/settings" passHref>
                  <Button variant={router.pathname === '/settings' ? 'default' : 'ghost'} size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </Link>
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
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;