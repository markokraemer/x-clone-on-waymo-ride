import { useState, useEffect } from 'react';
import { Toast, ToastProvider, ToastViewport } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/context/UserContext';
import useNotifications from '@/hooks/useNotifications';

const NotificationSystem = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const { notifications, addNotification } = useNotifications();

  useEffect(() => {
    // Simulating receiving notifications
    const interval = setInterval(() => {
      if (user?.preferences?.notifications) {
        const newNotification = {
          id: Date.now(),
          title: 'New Notification',
          description: `You have a new notification at ${new Date().toLocaleTimeString()}`,
        };
        addNotification(newNotification);
        toast({
          title: newNotification.title,
          description: newNotification.description,
        });
      }
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [user, toast, addNotification]);

  return (
    <ToastProvider>
      {notifications.map((notification) => (
        <Toast key={notification.id}>
          <div className="grid gap-1">
            <div className="font-medium">{notification.title}</div>
            <div className="text-sm text-muted-foreground">{notification.description}</div>
          </div>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
};

export default NotificationSystem;