import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Feed from '@/components/Feed';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/context/UserContext';
import useToast from '@/hooks/useToast';
import { faker } from '@faker-js/faker';

const Profile = () => {
  const { user, login } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [posts, setPosts] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio || '');
      setFollowers(faker.number.int({ min: 100, max: 10000 }));
      setFollowing(faker.number.int({ min: 50, max: 1000 }));
      setPosts(generateMockPosts(20));
    }
  }, [user]);

  const generateMockPosts = (count) => {
    return Array.from({ length: count }, () => ({
      id: faker.string.uuid(),
      content: faker.lorem.paragraph(),
      likes: faker.number.int({ min: 0, max: 1000 }),
      comments: faker.number.int({ min: 0, max: 100 }),
      reposts: faker.number.int({ min: 0, max: 50 }),
      timestamp: faker.date.recent(),
    }));
  };

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

  const handleSave = () => {
    login({ ...user, name, bio });
    setIsEditing(false);
    showToast("Success", "Profile updated successfully!", "default");
  };

  return (
    <Layout>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center sm:flex-row sm:items-start">
            <Avatar className="h-24 w-24 mb-4 sm:mb-0 sm:mr-6">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left flex-grow">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Bio"
                    rows={3}
                  />
                  <div>
                    <Button onClick={handleSave} className="mr-2">Save</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">{user.handle}</p>
                  <p className="mt-2">{user.bio}</p>
                  <div className="mt-4 flex justify-center sm:justify-start space-x-4">
                    <span><strong>{followers.toLocaleString()}</strong> Followers</span>
                    <span><strong>{following.toLocaleString()}</strong> Following</span>
                  </div>
                  <Button onClick={() => setIsEditing(true)} className="mt-4">Edit Profile</Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="replies">Replies</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {posts.map((post) => (
            <Card key={post.id} className="mb-4">
              <CardContent className="pt-6">
                <p>{post.content}</p>
                <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                  <span>{post.likes} Likes</span>
                  <span>{post.comments} Comments</span>
                  <span>{post.reposts} Reposts</span>
                  <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="replies">
          <p>Replies content (to be implemented)</p>
        </TabsContent>
        <TabsContent value="media">
          <p>Media content (to be implemented)</p>
        </TabsContent>
        <TabsContent value="likes">
          <p>Likes content (to be implemented)</p>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Profile;