import { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search as SearchIcon } from 'lucide-react';
import api from '@/lib/api';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ posts: [], users: [] });
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      setLoading(true);
      try {
        const searchResults = await api.searchPosts(query);
        setResults({ posts: searchResults, users: [] }); // For now, we're only searching posts
        setLoading(false);
      } catch (error) {
        console.error('Search failed:', error);
        setLoading(false);
      }
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <form onSubmit={handleSearch} className="mb-6">
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
            <p>Searching...</p>
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
          <p>User search not implemented yet.</p>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Search;