import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/UserAvatar';
import { faker } from '@faker-js/faker';

const generateSuggestedUsers = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    handle: '@' + faker.internet.userName().toLowerCase(),
    avatar: faker.image.avatar(),
    bio: faker.lorem.sentence(),
  }));
};

const SuggestedUsers = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    setSuggestedUsers(generateSuggestedUsers(3));
  }, []);

  const handleFollow = (userId) => {
    // In a real app, you would call an API to follow the user
    console.log(`Following user with id: ${userId}`);
    // For now, let's just remove the user from the suggestions
    setSuggestedUsers(suggestedUsers.filter(user => user.id !== userId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggested Users</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {suggestedUsers.map((user) => (
            <li key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <UserAvatar user={user} />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.handle}</p>
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

export default SuggestedUsers;