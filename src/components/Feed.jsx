import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Repeat, Share2 } from 'lucide-react';
import UserAvatar from '@/components/UserAvatar';
import { useUser } from '@/context/UserContext';

const Feed = ({ userOnly = false }) => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [userOnly]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const response = await new Promise(resolve => setTimeout(() => resolve(dummyPosts), 1000));
      setPosts(userOnly ? response.filter(post => post.user.handle === user.handle) : response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        user: { name: user.name, handle: user.handle },
        content: newPost,
        likes: 0,
        comments: 0,
        reposts: 0,
      };
      setPosts([post, ...posts]);
      setNewPost('');
      // In a real app, you would send this to your backend
    }
  };

  const handleAction = (postId, action) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, [action]: post[action] + 1 } : post
    ));
  };

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-2xl mx-auto">
      {!userOnly && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create a Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePostSubmit}>
              <Textarea
                placeholder="What's happening?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="mb-4"
              />
              <Button type="submit">Post</Button>
            </form>
          </CardContent>
        </Card>
      )}
      {posts.map((post) => (
        <Card key={post.id} className="mb-4">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <UserAvatar user={post.user} />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{post.user.name}</h3>
                  <span className="text-sm text-muted-foreground">{post.user.handle}</span>
                </div>
                <p className="mt-2 mb-4">{post.content}</p>
                <div className="flex justify-between text-muted-foreground">
                  <Button variant="ghost" size="sm" onClick={() => handleAction(post.id, 'likes')}
                          className="hover:text-red-500 transition-colors duration-200">
                    <Heart className="h-4 w-4 mr-1" /> {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleAction(post.id, 'comments')}
                          className="hover:text-blue-500 transition-colors duration-200">
                    <MessageCircle className="h-4 w-4 mr-1" /> {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleAction(post.id, 'reposts')}
                          className="hover:text-green-500 transition-colors duration-200">
                    <Repeat className="h-4 w-4 mr-1" /> {post.reposts}
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:text-primary transition-colors duration-200">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const dummyPosts = [
  {
    id: 1,
    user: { name: 'John Doe', handle: '@johndoe' },
    content: 'Just signed up for X49! Amazing features for just $49!',
    likes: 15,
    comments: 3,
    reposts: 2,
  },
  {
    id: 2,
    user: { name: 'Jane Smith', handle: '@janesmith' },
    content: 'X49 is revolutionizing the way we connect and transact online. Goodbye expensive alternatives!',
    likes: 24,
    comments: 5,
    reposts: 7,
  },
];

export default Feed;