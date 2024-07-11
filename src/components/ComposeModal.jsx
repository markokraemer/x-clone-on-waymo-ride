import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import UserAvatar from '@/components/UserAvatar';
import { useUser } from '@/context/UserContext';
import api from '@/lib/api';

const ComposeModal = ({ isOpen, onClose, onNewPost }) => {
  const [content, setContent] = useState('');
  const { user } = useUser();

  const handleSubmit = async () => {
    if (content.trim()) {
      try {
        const newPost = await api.createPost(content, user);
        setContent('');
        onClose();
        if (onNewPost) onNewPost(newPost);
      } catch (error) {
        console.error('Failed to create post:', error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compose new post</DialogTitle>
        </DialogHeader>
        <div className="flex items-start space-x-4">
          <UserAvatar user={user} />
          <Textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="flex-grow"
          />
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={handleSubmit} disabled={!content.trim()}>Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeModal;