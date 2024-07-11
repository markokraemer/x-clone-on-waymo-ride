import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import DirectMessage from '@/components/DirectMessage';
import { faker } from '@faker-js/faker';

const generateMockConversations = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    user: {
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
    lastMessage: faker.lorem.sentence(),
    timestamp: faker.date.recent(),
  }));
};

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    setConversations(generateMockConversations(10));
  }, []);

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        <Card className="w-1/3 mr-4">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`p-4 cursor-pointer hover:bg-accent ${selectedConversation?.id === conv.id ? 'bg-accent' : ''}`}
                  onClick={() => setSelectedConversation(conv)}
                >
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={conv.user.avatar} alt={conv.user.name} />
                      <AvatarFallback>{conv.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-medium">{conv.user.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <div className="flex-grow">
          {selectedConversation ? (
            <DirectMessage recipient={selectedConversation.user} />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent>
                <p className="text-center text-muted-foreground">Select a conversation to start messaging</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;