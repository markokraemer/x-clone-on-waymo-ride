import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Repeat } from 'lucide-react';

const dummyPosts = [
  {
    id: 1,
    user: { name: 'John Doe', handle: '@johndoe', avatar: '/api/placeholder/32/32' },
    content: 'Just signed up for X49! Amazing features for just $49!',
    likes: 15,
    comments: 3,
    reposts: 2,
  },
  {
    id: 2,
    user: { name: 'Jane Smith', handle: '@janesmith', avatar: '/api/placeholder/32/32' },
    content: 'X49 is revolutionizing the way we connect and transact online. Goodbye expensive alternatives!',
    likes: 24,
    comments: 5,
    reposts: 7,
  },
];

const Feed = ({ userOnly = false }) => {
  const [posts, setPosts] = useState(dummyPosts);
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        user: { name: 'Current User', handle: '@currentuser', avatar: '/api/placeholder/32/32' },
        content: newPost,
        likes: 0,
        comments: 0,
        reposts: 0,
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleRepost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, reposts: post.reposts + 1 } : post
    ));
  };

  const displayPosts = userOnly ? posts.filter(post => post.user.handle === '@currentuser') : posts;

  return (
    <div className="max-w-2xl mx-auto">
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
      {displayPosts.map((post) => (
        <Card key={post.id} className="mb-4">
          <CardHeader>
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-medium">{post.user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{post.user.handle}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{post.content}</p>
            <div className="flex justify-between text-muted-foreground">
              <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                <Heart className="h-4 w-4 mr-1" /> {post.likes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4 mr-1" /> {post.comments}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleRepost(post.id)}>
                <Repeat className="h-4 w-4 mr-1" /> {post.reposts}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Feed;