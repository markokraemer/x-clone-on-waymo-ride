import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

const useInfiniteScroll = (fetchData, options = {}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const { threshold = 0.1, rootMargin = '0px' } = options;

  const { ref, inView } = useInView({
    threshold,
    rootMargin,
  });

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newData = await fetchData(page);
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => [...prevData, ...newData]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchData, page, loading, hasMore]);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  const reset = useCallback(() => {
    setData([]);
    setPage(1);
    setLoading(false);
    setError(null);
    setHasMore(true);
  }, []);

  return { data, loading, error, hasMore, reset, ref };
};

export default useInfiniteScroll;