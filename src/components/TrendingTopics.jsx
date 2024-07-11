import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { faker } from '@faker-js/faker';
import { useRouter } from 'next/router';

const generateTrendingTopics = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(2),
    posts: faker.number.int({ min: 1000, max: 100000 }),
  }));
};

const TrendingTopics = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTrendingTopics(generateTrendingTopics(5));
        setError(null);
      } catch (err) {
        setError('Failed to fetch trending topics. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTopics();
  }, []);

  const handleTopicClick = (topicName) => {
    router.push(`/search?q=${encodeURIComponent(topicName)}`);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Trending Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-6 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Trending Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {trendingTopics.map((topic) => (
            <li key={topic.id} className="flex justify-between items-center">
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-left"
                onClick={() => handleTopicClick(topic.name)}
              >
                #{topic.name}
              </Button>
              <span className="text-sm text-muted-foreground">{topic.posts.toLocaleString()} posts</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;