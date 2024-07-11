import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Repeat, Share2, RefreshCw, Hash } from 'lucide-react';
import UserAvatar from '@/components/UserAvatar';
import { useUser } from '@/context/UserContext';
import { motion } from 'framer-motion';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import useFeed from '@/hooks/useFeed';
import useToast from '@/hooks/useToast';

const extractHashtags = (content) => {
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  return content.match(hashtagRegex) || [];
};

const PostCard = React.memo(({ post, onAction, onRepost }) => {
  const hashtags = extractHashtags(post.content);
  
  return (
    <motion.div
      key={post.id}
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
  const [newPost, setNewPost] = useState('');
  const { showToast } = useToast();
  const {
    posts,
    loading,
    error,
    hasMore,
    refreshing,
    handleRefresh,
    createPost,
    ref: infiniteScrollRef
  } = useFeed();

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      try {
        const post = await createPost(newPost, user);
        setNewPost('');
        if (onNewPost) onNewPost(post);
        showToast("Success", "Your post has been successfully created!", "default");
      } catch (err) {
        showToast("Error", "Failed to create post. Please try again.", "destructive");
      }
    }
  };

  const handleAction = useCallback(async (postId, action) => {
    // Implement post actions (like, comment, repost) here
    // This should be moved to the useFeed hook in a real application
  }, []);

  const handleRepost = useCallback(async (post) => {
    // Implement repost functionality here
    // This should be moved to the useFeed hook in a real application
  }, []);

  React.useImperativeHandle(ref, () => ({
    handleRefresh
  }));

  const memoizedPosts = useMemo(() => posts.map(post => (
    <PostCard key={post.id} post={post} onAction={handleAction} onRepost={handleRepost} />
  )), [posts, handleAction, handleRepost]);

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={handleRefresh}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Feed</h2>
        <Button onClick={handleRefresh} disabled={refreshing || loading}>
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
      {!loading && hasMore && <div ref={infiniteScrollRef} style={{ height: '10px' }}></div>}
      {!hasMore && <p className="text-center text-muted-foreground mt-4">No more posts to load</p>}
    </div>
  );
});

Feed.displayName = 'Feed';

export default Feed;