import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Repeat, Share2, RefreshCw, Hash } from 'lucide-react';
import UserAvatar from '@/components/UserAvatar';
import { useUser } from '@/context/UserContext';
import { useInView } from 'react-intersection-observer';
import useToast from '@/hooks/useToast';
import { motion } from 'framer-motion';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import api from '@/lib/api';

const extractHashtags = (content) => {
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  return content.match(hashtagRegex) || [];
};

const PostCard = React.memo(({ post, onAction, onRepost }) => {
  const hashtags = extractHashtags(post.content);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-4">
        <CardContent className="pt-6">
          {post.repostedBy && (
            <p className="text-sm text-muted-foreground mb-2">
              <Repeat className="inline-block w-4 h-4 mr-1" />
              Reposted by {post.repostedBy.name}
            </p>
          )}
          <div className="flex items-start space-x-4">
            <UserAvatar user={post.user} />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{post.user.name}</h3>
                <span className="text-sm text-muted-foreground">{post.user.handle}</span>
              </div>
              <p className="mt-2 mb-2">{post.content}</p>
              {hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {hashtags.map((tag, index) => (
                    <span key={`${post.id}-${tag}-${index}`} className="text-primary text-sm">
                      <Hash className="inline-block w-3 h-3 mr-1" />
                      {tag.slice(1)}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <Button variant="ghost" size="sm" onClick={() => onAction(post.id, 'likes')}
                        className="hover:text-red-500 transition-colors duration-200">
                  <Heart className={`h-4 w-4 mr-1 ${post.liked ? 'fill-current text-red-500' : ''}`} /> {post.likes}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onAction(post.id, 'comments')}
                        className="hover:text-blue-500 transition-colors duration-200">
                  <MessageCircle className="h-4 w-4 mr-1" /> {post.comments}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onRepost(post)}
                        className="hover:text-green-500 transition-colors duration-200">
                  <Repeat className={`h-4 w-4 mr-1 ${post.reposted ? 'fill-current text-green-500' : ''}`} /> {post.reposts}
                </Button>
                <Button variant="ghost" size="sm" className="hover:text-primary transition-colors duration-200">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

const Feed = React.forwardRef(({ userOnly = false, onNewPost }, ref) => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { showToast } = useToast();

  const { ref: inViewRef, inView } = useInView({
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
      showToast("Error", "Failed to fetch posts. Please try again.", "destructive");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, hasMore, showToast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (inView && !loading && hasMore) {
      fetchPosts();
    }
  }, [inView, fetchPosts, loading, hasMore]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      try {
        const post = await api.createPost(newPost, user);
        setPosts(prevPosts => [post, ...prevPosts]);
        setNewPost('');
        if (onNewPost) onNewPost(post);
        showToast("Success", "Your post has been successfully created!", "default");
      } catch (err) {
        setError('Failed to create post. Please try again.');
        showToast("Error", "Failed to create post. Please try again.", "destructive");
      }
    }
  };

  const handleAction = useCallback(async (postId, action) => {
    // Optimistic update
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        switch (action) {
          case 'likes':
            return { ...post, likes: post.likes + 1, liked: true };
          case 'comments':
            return { ...post, comments: post.comments + 1 };
          case 'reposts':
            return { ...post, reposts: post.reposts + 1, reposted: true };
          default:
            return post;
        }
      }
      return post;
    }));

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
      // Revert optimistic update on error
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === postId) {
          switch (action) {
            case 'likes':
              return { ...post, likes: post.likes - 1, liked: false };
            case 'comments':
              return { ...post, comments: post.comments - 1 };
            case 'reposts':
              return { ...post, reposts: post.reposts - 1, reposted: false };
            default:
              return post;
          }
        }
        return post;
      }));
      setError(`Failed to ${action} post. Please try again.`);
      showToast("Error", `Failed to ${action} post. Please try again.`, "destructive");
    }
  }, [showToast]);

  const handleRepost = useCallback(async (post) => {
    try {
      const repostedPost = await api.repostPost(post.id);
      setPosts(prevPosts => [repostedPost, ...prevPosts]);
      showToast("Success", "Post reposted successfully!", "default");
    } catch (err) {
      setError('Failed to repost. Please try again.');
      showToast("Error", "Failed to repost. Please try again.", "destructive");
    }
  }, [showToast]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts(true);
  }, [fetchPosts]);

  React.useImperativeHandle(ref, () => ({
    handleRefresh
  }));

  const memoizedPosts = useMemo(() => posts.map(post => (
    <PostCard key={post.id} post={post} onAction={handleAction} onRepost={handleRepost} />
  )), [posts, handleAction, handleRepost]);

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
                placeholder="What's happening? Use #hashtags to categorize your post!"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="mb-4"
              />
              <Button type="submit">Post</Button>
            </form>
          </CardContent>
        </Card>
      )}
      {memoizedPosts}
      {loading && <LoadingSkeleton />}
      <div ref={inViewRef} style={{ height: '10px' }}></div>
    </div>
  );
});

Feed.displayName = 'Feed';

export default Feed;