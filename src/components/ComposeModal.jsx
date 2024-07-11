import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import UserAvatar from '@/components/UserAvatar';

const ComposeModal = ({ isOpen, onClose }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    // Here you would typically send the post to your backend
    console.log('New post:', content);
    setContent('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compose new post</DialogTitle>
        </DialogHeader>
        <div className="flex items-start space-x-4">
          <UserAvatar user={{ name: 'Current User' }} />
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