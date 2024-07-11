import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const dummyConversations = [
  { id: 1, user: { name: 'Alice Johnson', avatar: '/api/placeholder/32/32' }, lastMessage: 'Hey, how are you?' },
  { id: 2, user: { name: 'Bob Smith', avatar: '/api/placeholder/32/32' }, lastMessage: 'Did you see the latest update?' },
];

const Messages = () => {
  const [conversations, setConversations] = useState(dummyConversations);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      // In a real app, you would send this message to the server
      console.log('Sending message:', newMessage, 'to:', selectedConversation.user.name);
      setNewMessage('');
    }
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="w-1/3 border-r p-4">
          <h2 className="text-2xl font-bold mb-4">Conversations</h2>
          {conversations.map((conv) => (
            <Card
              key={conv.id}
              className={`mb-2 cursor-pointer ${selectedConversation?.id === conv.id ? 'bg-accent' : ''}`}
              onClick={() => setSelectedConversation(conv)}
            >
              <CardContent className="flex items-center p-4">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={conv.user.avatar} alt={conv.user.name} />
                  <AvatarFallback>{conv.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-sm font-medium">{conv.user.name}</CardTitle>
                  <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="w-2/3 p-4 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={selectedConversation.user.avatar} alt={selectedConversation.user.name} />
                  <AvatarFallback>{selectedConversation.user.name[0]}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{selectedConversation.user.name}</h2>
              </div>
              <div className="flex-grow overflow-y-auto mb-4">
                {/* Message history would go here */}
                <p className="text-center text-muted-foreground">No messages yet</p>
              </div>
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
            </>
          ) : (
            <p className="text-center text-muted-foreground">Select a conversation to start messaging</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;