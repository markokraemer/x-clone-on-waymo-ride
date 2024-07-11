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
  const [replies, setReplies] = useState([]);
  const [media, setMedia] = useState([]);
  const [likes, setLikes] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio || '');
      setFollowers(faker.number.int({ min: 100, max: 10000 }));
      setFollowing(faker.number.int({ min: 50, max: 1000 }));
      setPosts(generateMockPosts(20));
      setReplies(generateMockPosts(10));
      setMedia(generateMockMedia(15));
      setLikes(generateMockPosts(25));
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
      user: {
        name: user?.name || faker.person.fullName(),
        handle: user?.handle || faker.internet.userName(),
        avatar: user?.avatar || faker.image.avatar(),
      },
    }));
  };

  const generateMockMedia = (count) => {
    return Array.from({ length: count }, () => ({
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement(['image', 'video']),
      url: faker.image.url(),
      timestamp: faker.date.recent(),
    }));
  };

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
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name[0]}</AvatarFallback>
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
                  <h1 className="text-2xl font-bold">{user?.name}</h1>
                  <p className="text-muted-foreground">{user?.handle}</p>
                  <p className="mt-2">{user?.bio}</p>
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
          <Feed posts={posts} />
        </TabsContent>
        <TabsContent value="replies">
          <Feed posts={replies} />
        </TabsContent>
        <TabsContent value="media">
          <div className="grid grid-cols-3 gap-4">
            {media.map((item) => (
              <div key={item.id} className="aspect-square">
                {item.type === 'image' ? (
                  <img src={item.url} alt="Media" className="w-full h-full object-cover rounded" />
                ) : (
                  <video src={item.url} className="w-full h-full object-cover rounded" controls />
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="likes">
          <Feed posts={likes} />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Profile;