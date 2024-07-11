import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import UserAvatar from '@/components/UserAvatar';
import { useUser } from '@/context/UserContext';
import useToast from '@/hooks/useToast';
import api from '@/lib/api';

const MAX_CHARACTERS = 280;

const ComposeModal = ({ isOpen, onClose, onNewPost, refreshFeed }) => {
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const { user } = useUser();
  const { showToast } = useToast();
  const [charactersLeft, setCharactersLeft] = useState(MAX_CHARACTERS);

  useEffect(() => {
    setCharactersLeft(MAX_CHARACTERS - content.length);
  }, [content]);

  const handleSubmit = async () => {
    if (content.trim() && content.length <= MAX_CHARACTERS) {
      setIsPosting(true);
      try {
        const response = await api.createPost(content, user);
        if (response.error) {
          throw new Error(response.message);
        }
        setContent('');
        onClose();
        if (onNewPost) onNewPost(response.data);
        if (refreshFeed) refreshFeed();
        showToast("Success", "Your post has been successfully created!", "default");
      } catch (error) {
        console.error('Failed to create post:', error);
        showToast("Error", "Failed to create post. Please try again.", "destructive");
      } finally {
        setIsPosting(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Compose new post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-start space-x-4">
            <UserAvatar user={user} />
            <Textarea
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="flex-grow resize-none"
              maxLength={MAX_CHARACTERS}
            />
          </div>
          <div className="flex justify-between items-center">
            <Progress value={(charactersLeft / MAX_CHARACTERS) * 100} className="w-1/2" />
            <span className={`text-sm ${charactersLeft < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
              {charactersLeft} characters left
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!content.trim() || content.length > MAX_CHARACTERS || isPosting}
          >
            {isPosting ? 'Posting...' : 'Post'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeModal;