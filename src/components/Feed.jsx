import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Repeat, Share2 } from 'lucide-react';
import UserAvatar from '@/components/UserAvatar';
import { useUser } from '@/context/UserContext';
import { useInView } from 'react-intersection-observer';
import api from '@/lib/api';

const Feed = ({ userOnly = false, onNewPost }) => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const fetchPosts = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const newPosts = await api.getPosts(page);
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setHasMore(newPosts.length === 10);
      setPage(prevPage => prevPage + 1);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

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
        setPosts([post, ...posts]);
        setNewPost('');
        if (onNewPost) onNewPost(post);
      } catch (err) {
        setError('Failed to create post. Please try again.');
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
          // For simplicity, we're not implementing a full comment system here
          updatedPost = await api.commentOnPost(postId, 'A new comment');
          break;
        case 'reposts':
          updatedPost = await api.repostPost(postId);
          break;
        default:
          return;
      }
      setPosts(posts.map(post => post.id === postId ? updatedPost : post));
    } catch (err) {
      setError(`Failed to ${action} post. Please try again.`);
    }
  };

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
      {loading && <div>Loading more posts...</div>}
      <div ref={ref} style={{ height: '10px' }}></div>
    </div>
  );
};

export default Feed;