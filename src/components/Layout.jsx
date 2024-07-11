import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Home, MessageSquare, User, Settings, Search } from 'lucide-react';

const Layout = ({ children }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-primary">X49</span>
              </Link>
            </div>
            <div className="flex items-center">
              <form onSubmit={handleSearch} className="mr-4">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
              </form>
              <Link href="/" passHref>
                <Button variant={router.pathname === '/' ? 'default' : 'ghost'}>
                  <Home className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/messages" passHref>
                <Button variant={router.pathname === '/messages' ? 'default' : 'ghost'}>
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/profile" passHref>
                <Button variant={router.pathname === '/profile' ? 'default' : 'ghost'}>
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/settings" passHref>
                <Button variant={router.pathname === '/settings' ? 'default' : 'ghost'}>
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;