import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { faker } from '@faker-js/faker';

const generateMockNotifications = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    content: faker.helpers.arrayElement([
      'liked your post',
      'commented on your post',
      'mentioned you in a post',
      'started following you',
    ]),
    user: faker.person.fullName(),
    read: faker.datatype.boolean(),
    timestamp: faker.date.recent(),
  }));
};

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setNotifications(generateMockNotifications(10));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </Button>
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 z-50">
          <CardContent className="p-0">
            <ScrollArea className="h-64">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b last:border-b-0 cursor-pointer ${
                    notification.read ? 'bg-background' : 'bg-accent'
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <p className="font-medium">{notification.user} {notification.content}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationCenter;