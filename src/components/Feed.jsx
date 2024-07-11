import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Repeat, Share2, RefreshCw } from 'lucide-react';
import UserAvatar from '@/components/UserAvatar';
import { useUser } from '@/context/UserContext';
import { useInView } from 'react-intersection-observer';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';

const Feed = ({ userOnly = false, onNewPost }) => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const fetchPosts = useCallback(async (refresh = false) => {
    if (!hasMore && !refresh) return;
    setLoading(true);
    try {
      const newPosts = await api.getPosts(refresh ? 1 : page);
      if (refresh) {
        setPosts(newPosts);
        setPage(2);
      } else {
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setPage(prevPage => prevPage + 1);
      }
      setHasMore(newPosts.length === 10);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts. Please try again.');
      toast({
        title: "Error",
        description: "Failed to fetch posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, hasMore, toast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (inView) {
      fetchPosts();
    }
  }, [inView, fetchPosts]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      try {
        const post = await api.createPost(newPost, user);
        setPosts(prevPosts => [post, ...prevPosts]);
        setNewPost('');
        if (onNewPost) onNewPost(post);
        toast({
          title: "Post created",
          description: "Your post has been successfully created!",
        });
      } catch (err) {
        setError('Failed to create post. Please try again.');
        toast({
          title: "Error",
          description: "Failed to create post. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAction = async (postId, action) => {
    try {
      let updatedPost;
      switch (action) {
        case 'likes':
          updatedPost = await api.likePost(postId);
          break;
        case 'comments':
          updatedPost = await api.commentOnPost(postId, 'A new comment');
          break;
        case 'reposts':
          updatedPost = await api.repostPost(postId);
          break;
        default:
          return;
      }
      setPosts(prevPosts => prevPosts.map(post => post.id === postId ? updatedPost : post));
    } catch (err) {
      setError(`Failed to ${action} post. Please try again.`);
      toast({
        title: "Error",
        description: `Failed to ${action} post. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts(true);
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Feed</h2>
        <Button onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>
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
      {posts.map((post, index) => (
        <Card key={`${post.id}-${index}`} className="mb-4">
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
      {loading && <div className="text-center py-4">Loading more posts...</div>}
      <div ref={ref} style={{ height: '10px' }}></div>
    </div>
  );
};

export default Feed;