import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <Input
        type="text"
        placeholder="Search X49"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pr-10"
      />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default SearchBar;