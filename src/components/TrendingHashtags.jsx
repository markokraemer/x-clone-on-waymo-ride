import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Hash } from 'lucide-react';
import { faker } from '@faker-js/faker';
import { useRouter } from 'next/router';

const generateTrendingHashtags = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    posts: faker.number.int({ min: 1000, max: 100000 }),
  }));
};

const TrendingHashtags = () => {
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setTrendingHashtags(generateTrendingHashtags(5));
  }, []);

  const handleHashtagClick = (hashtag) => {
    router.push(`/search?q=${encodeURIComponent(hashtag)}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Hashtags</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {trendingHashtags.map((hashtag) => (
            <li key={hashtag.id} className="flex justify-between items-center">
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-left"
                onClick={() => handleHashtagClick(hashtag.name)}
              >
                <Hash className="h-4 w-4 mr-1" />
                {hashtag.name}
              </Button>
              <span className="text-sm text-muted-foreground">{hashtag.posts.toLocaleString()} posts</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TrendingHashtags;