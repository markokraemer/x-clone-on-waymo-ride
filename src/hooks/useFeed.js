import { useState, useCallback } from 'react';
import api from '@/lib/api';
import useInfiniteScroll from './useInfiniteScroll';
import useToast from './useToast';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const useFeed = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { showToast } = useToast();

  const fetchPosts = useCallback(async (page, retries = 0) => {
    try {
      const response = await api.getPosts(page);
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (error) {
      if (retries < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchPosts(page, retries + 1);
      }
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
      const response = await api.createPost(content, user);
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
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