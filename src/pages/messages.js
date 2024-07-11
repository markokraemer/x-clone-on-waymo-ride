import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { faker } from '@faker-js/faker';

const generateMockConversations = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    user: {
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
    lastMessage: faker.lorem.sentence(),
    messages: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => ({
      id: faker.string.uuid(),
      content: faker.lorem.sentence(),
      sender: faker.datatype.boolean() ? 'user' : 'other',
      timestamp: faker.date.recent(),
    })),
  }));
};

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    setConversations(generateMockConversations(10));
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      const updatedConversations = conversations.map(conv => {
        if (conv.id === selectedConversation.id) {
          return {
            ...conv,
            messages: [...conv.messages, {
              id: faker.string.uuid(),
              content: newMessage,
              sender: 'user',
              timestamp: new Date(),
            }],
            lastMessage: newMessage,
          };
        }
        return conv;
      });
      setConversations(updatedConversations);
      setSelectedConversation(updatedConversations.find(conv => conv.id === selectedConversation.id));
      setNewMessage('');
    }
  };

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
        <Card className="flex-grow">
          {selectedConversation ? (
            <>
              <CardHeader className="flex flex-row items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={selectedConversation.user.avatar} alt={selectedConversation.user.name} />
                  <AvatarFallback>{selectedConversation.user.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle>{selectedConversation.user.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-16rem)] p-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                    >
                      <div
                        className={`inline-block p-2 rounded-lg ${
                          message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent'
                        }`}
                      >
                        {message.content}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex">
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-grow mr-2"
                    />
                    <Button type="submit">Send</Button>
                  </div>
                </form>
              </CardContent>
            </>
          ) : (
            <CardContent className="h-full flex items-center justify-center">
              <p className="text-center text-muted-foreground">Select a conversation to start messaging</p>
            </CardContent>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default Messages;