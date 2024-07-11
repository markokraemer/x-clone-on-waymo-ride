import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/UserAvatar';

const suggestedUsers = [
  { id: 1, name: 'Alice Johnson', handle: '@alice', followers: '10K' },
  { id: 2, name: 'Bob Smith', handle: '@bobsmith', followers: '5K' },
  { id: 3, name: 'Carol White', handle: '@carol', followers: '8K' },
];

const WhoToFollow = () => {
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
                  <p className="text-sm text-muted-foreground">{user.handle}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Follow</Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WhoToFollow;