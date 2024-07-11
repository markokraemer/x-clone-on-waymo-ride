import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Heart, MessageCircle, Repeat } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const mockNotifications = [
  { id: 1, type: 'like', user: 'John Doe', content: 'liked your post', time: '2h ago' },
  { id: 2, type: 'comment', user: 'Jane Smith', content: 'commented on your post', time: '4h ago' },
  { id: 3, type: 'repost', user: 'Alice Johnson', content: 'reposted your post', time: '1d ago' },
];

const NotificationItem = ({ notification }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'repost':
        return <Repeat className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="flex items-center p-4">
        <div className="mr-4">{getIcon(notification.type)}</div>
        <div className="flex-grow">
          <p><strong>{notification.user}</strong> {notification.content}</p>
          <p className="text-sm text-muted-foreground">{notification.time}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    // In a real app, you would fetch notifications from an API
    setNotifications(mockNotifications);
  }, []);

  if (!user) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your notifications</h1>
          <Button>Log In</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))
      )}
    </Layout>
  );
};

export default Notifications;