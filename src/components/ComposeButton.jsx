import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ComposeButton = ({ onClick }) => {
  return (
    <Button
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
      onClick={onClick}
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};

export default ComposeButton;