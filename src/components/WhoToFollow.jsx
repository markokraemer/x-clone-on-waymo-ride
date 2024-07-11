import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/UserAvatar';
import { faker } from '@faker-js/faker';

const generateSuggestedUsers = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    handle: faker.internet.userName().toLowerCase(),
    followers: faker.number.int({ min: 1000, max: 100000 }),
  }));
};

const WhoToFollow = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSuggestedUsers(generateSuggestedUsers(3));
        setError(null);
      } catch (err) {
        setError('Failed to fetch suggested users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedUsers();
  }, []);

  const handleFollow = (userId) => {
    // In a real app, you would call an API to follow the user
    console.log(`Following user with id: ${userId}`);
    // For now, let's just remove the user from the suggestions
    setSuggestedUsers(suggestedUsers.filter(user => user.id !== userId));
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Who to Follow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                </div>
              </div>
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
          <CardTitle>Who to Follow</CardTitle>
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
        <CardTitle>Who to Follow</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {suggestedUsers.map((user) => (
            <li key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <UserAvatar user={user} />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">@{user.handle}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleFollow(user.id)}>Follow</Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WhoToFollow;