import { useState } from 'react';
import Layout from '@/components/Layout';
import Feed from '@/components/Feed';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    handle: '@johndoe',
    avatar: '/api/placeholder/64/64',
    bio: 'Excited user of X49 - the everything app!',
    followers: 1234,
    following: 567,
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center sm:flex-row sm:items-start">
              <Avatar className="h-24 w-24 mb-4 sm:mb-0 sm:mr-6">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.handle}</p>
                <p className="mt-2">{user.bio}</p>
                <div className="mt-4 flex justify-center sm:justify-start space-x-4">
                  <span><strong>{user.followers}</strong> Followers</span>
                  <span><strong>{user.following}</strong> Following</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Posts</h2>
          <Feed userOnly={true} />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;