import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/UserAvatar';
import { faker } from '@faker-js/faker';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import useToast from '@/hooks/useToast';

const generateSuggestedUsers = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    handle: faker.internet.userName().toLowerCase(),
    followers: faker.number.int({ min: 1000, max: 100000 }),
    isFollowing: false,
  }));
};

const WhoToFollow = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

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

  const handleFollowToggle = (userId) => {
    setSuggestedUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
    const user = suggestedUsers.find(u => u.id === userId);
    const action = user.isFollowing ? 'unfollowed' : 'followed';
    showToast("Success", `You have ${action} ${user.name}!`, "default");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Who to Follow</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <AnimatePresence>
            <ul className="space-y-4">
              {suggestedUsers.map((user, index) => (
                <motion.li
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <UserAvatar user={user} />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">@{user.handle}</p>
                    </div>
                  </div>
                  <Button
                    variant={user.isFollowing ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => handleFollowToggle(user.id)}
                  >
                    {user.isFollowing ? 'Unfollow' : 'Follow'}
                  </Button>
                </motion.li>
              ))}
            </ul>
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  );
};

export default WhoToFollow;