import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { faker } from '@faker-js/faker';

const generateMockUsers = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    handle: faker.internet.userName(),
    avatar: faker.image.avatar(),
    bio: faker.lorem.sentence(),
  }));
};

const Discover = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setUsers(generateMockUsers(50));
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Discover Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.handle}</p>
                  <p className="text-sm mt-1">{user.bio}</p>
                </div>
                <Button variant="outline" size="sm">Follow</Button>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Discover;