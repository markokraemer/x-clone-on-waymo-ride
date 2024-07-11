import { useState } from 'react';
import Layout from '@/components/Layout';
import Feed from '@/components/Feed';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/context/UserContext';

const Profile = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('posts');

  if (!user) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
          <Button>Log In</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
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
        <div className="flex space-x-4 mb-4">
          <Button
            variant={activeTab === 'posts' ? 'default' : 'outline'}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </Button>
          <Button
            variant={activeTab === 'replies' ? 'default' : 'outline'}
            onClick={() => setActiveTab('replies')}
          >
            Replies
          </Button>
          <Button
            variant={activeTab === 'media' ? 'default' : 'outline'}
            onClick={() => setActiveTab('media')}
          >
            Media
          </Button>
          <Button
            variant={activeTab === 'likes' ? 'default' : 'outline'}
            onClick={() => setActiveTab('likes')}
          >
            Likes
          </Button>
        </div>
        <Feed userOnly={true} />
      </div>
    </Layout>
  );
};

export default Profile;