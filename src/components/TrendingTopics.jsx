import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const trendingTopics = [
  { id: 1, name: '#X49Launch', posts: '50K' },
  { id: 2, name: 'Elon Musk', posts: '40K' },
  { id: 3, name: '#TechRevolution', posts: '35K' },
  { id: 4, name: 'Crypto', posts: '28K' },
  { id: 5, name: '#AI', posts: '25K' },
];

const TrendingTopics = () => {
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
                {topic.name}
              </Button>
              <span className="text-sm text-muted-foreground">{topic.posts} posts</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;