import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Heart, MessageCircle, Repeat } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import useWebSocket from '@/lib/websocket';

const mockNotifications = [
  { id: 1, type: 'like', user: 'John Doe', content: 'liked your post', time: '2h ago', read: false },
  { id: 2, type: 'comment', user: 'Jane Smith', content: 'commented on your post', time: '4h ago', read: false },
  { id: 3, type: 'repost', user: 'Alice Johnson', content: 'reposted your post', time: '1d ago', read: true },
];

const NotificationItem = ({ notification, onMarkAsRead }) => {
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
    <Card className={`mb-4 ${notification.read ? 'opacity-60' : ''}`}>
      <CardContent className="flex items-center p-4">
        <div className="mr-4">{getIcon(notification.type)}</div>
        <div className="flex-grow">
          <p><strong>{notification.user}</strong> {notification.content}</p>
          <p className="text-sm text-muted-foreground">{notification.time}</p>
        </div>
        {!notification.read && (
          <Button variant="outline" size="sm" onClick={() => onMarkAsRead(notification.id)}>
            Mark as Read
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useUser();
  const { socket } = useWebSocket('wss://api.x49.com/notifications');

  useEffect(() => {
    // In a real app, you would fetch notifications from an API
    setNotifications(mockNotifications);

    // Set up WebSocket listener for new notifications
    socket.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications(prev => [newNotification, ...prev]);
    };

    return () => {
      socket.close();
    };
  }, [socket]);

  const handleMarkAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif => ({ ...notif, read: true }))
    );
  };

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button onClick={handleMarkAllAsRead}>Mark All as Read</Button>
      </div>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={handleMarkAsRead}
          />
        ))
      )}
    </Layout>
  );
};

export default Notifications;