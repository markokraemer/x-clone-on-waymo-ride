import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search as SearchIcon, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { faker } from '@faker-js/faker';

const generateMockPosts = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    content: faker.lorem.sentence(),
    user: {
      name: faker.person.fullName(),
      handle: faker.internet.userName(),
      avatar: faker.image.avatar(),
    },
  }));
};

const generateMockUsers = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    handle: faker.internet.userName(),
    avatar: faker.image.avatar(),
  }));
};

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ posts: [], users: [] });
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.query.q) {
      setQuery(router.query.q);
      handleSearch(router.query.q);
    }
  }, [router.query.q]);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const postResults = generateMockPosts(5).filter(post => 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.user.handle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const userResults = generateMockUsers(5).filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.handle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setResults({ posts: postResults, users: userResults });
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`, undefined, { shallow: true });
      handleSearch(query);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex">
          <Input
            type="text"
            placeholder="Search X49"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" className="ml-2">
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </form>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {loading ? (
            <p>Searching posts...</p>
          ) : (
            results.posts.map((post) => (
              <Card key={post.id} className="mb-4">
                <CardContent className="p-4">
                  <p className="font-semibold">{post.user.name}</p>
                  <p className="text-sm text-muted-foreground">{post.user.handle}</p>
                  <p className="mt-2">{post.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        <TabsContent value="users">
          {loading ? (
            <p>Searching users...</p>
          ) : (
            results.users.map((user) => (
              <Card key={user.id} className="mb-4">
                <CardContent className="p-4 flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.handle}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Search;