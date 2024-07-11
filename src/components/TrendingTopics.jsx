import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { faker } from '@faker-js/faker';

const generateTrendingTopics = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(2),
    posts: faker.number.int({ min: 1000, max: 100000 }),
  }));
};

const TrendingTopics = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);

  useEffect(() => {
    setTrendingTopics(generateTrendingTopics(5));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {trendingTopics.map((topic) => (
            <li key={topic.id} className="flex justify-between items-center">
              <Button variant="link" className="p-0 h-auto font-medium text-left">
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