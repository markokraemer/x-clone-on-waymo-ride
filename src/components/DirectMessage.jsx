import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser } from '@/context/UserContext';
import { faker } from '@faker-js/faker';

const generateMockMessages = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    sender: faker.helpers.arrayElement(['user', 'other']),
    content: faker.lorem.sentence(),
    timestamp: faker.date.recent(),
  }));
};

const DirectMessage = ({ recipient }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    setMessages(generateMockMessages(20));
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: faker.string.uuid(),
        sender: 'user',
        content: newMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <Card className="h-[calc(100vh-4rem)]">
      <CardHeader>
        <CardTitle>{recipient.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <ScrollArea className="flex-grow mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary'
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
        <form onSubmit={handleSendMessage} className="flex">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow mr-2"
          />
          <Button type="submit">Send</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DirectMessage;