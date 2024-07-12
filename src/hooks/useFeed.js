import { useState, useCallback, useRef } from 'react';
import api from '@/lib/api';
import useToast from './useToast';

const useFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const { showToast } = useToast();

  const fetchPosts = useCallback(async (pageToFetch) => {
    try {
      setLoading(true);
      const response = await api.getPosts(pageToFetch);
      if (response.error) {
        throw new Error(response.message);
      }
      return response;
    } catch (error) {
      setError('Failed to fetch posts. Please try again.');
      showToast('Error', 'Failed to fetch posts. Please try again.', 'destructive');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const fetchMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;
    try {
      const response = await fetchPosts(page);
      setPosts(prevPosts => [...prevPosts, ...response.data]);
      setPage(prevPage => prevPage + 1);
      setHasMore(response.hasMore);
    } catch (error) {
      console.error('Error fetching more posts:', error);
    }
  }, [fetchPosts, hasMore, loading, page]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetchPosts(1);
      setPosts(response.data);
      setPage(2);
      setHasMore(response.hasMore);
      setError(null);
      showToast('Success', 'Feed refreshed successfully!', 'default');
    } catch (error) {
      console.error('Error refreshing feed:', error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchPosts, showToast]);

  const createPost = useCallback(async (content, user) => {
    try {
      const response = await api.createPost(content, user);
      if (response.error) {
        throw new Error(response.message);
      }
      setPosts(prevPosts => [response.data, ...prevPosts]);
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
    fetchMorePosts
  };
};

export default useFeed;