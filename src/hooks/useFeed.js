import { useState, useCallback } from 'react';
import api from '@/lib/api';
import useInfiniteScroll from './useInfiniteScroll';
import useToast from './useToast';

const useFeed = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { showToast } = useToast();

  const fetchPosts = useCallback(async (page) => {
    try {
      const posts = await api.getPosts(page);
      return posts;
    } catch (error) {
      showToast('Error', 'Failed to fetch posts. Please try again.', 'destructive');
      throw error;
    }
  }, [showToast]);

  const {
    data: posts,
    loading,
    error,
    hasMore,
    reset,
    ref
  } = useInfiniteScroll(fetchPosts);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      reset();
      await fetchPosts(1);
      showToast('Success', 'Feed refreshed successfully!', 'default');
    } catch (error) {
      showToast('Error', 'Failed to refresh feed. Please try again.', 'destructive');
    } finally {
      setRefreshing(false);
    }
  }, [reset, fetchPosts, showToast]);

  const createPost = useCallback(async (content, user) => {
    try {
      const newPost = await api.createPost(content, user);
      return newPost;
    } catch (error) {
      showToast('Error', 'Failed to create post. Please try again.', 'destructive');
      throw error;
    }
  }, [showToast]);

  return {
    posts,
    loading,
    error,
    hasMore,
    refreshing,
    handleRefresh,
    createPost,
    ref
  };
};

export default useFeed;