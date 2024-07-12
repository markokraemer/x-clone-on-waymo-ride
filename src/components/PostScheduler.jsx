import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import useToast from '@/hooks/useToast';

const PostScheduler = ({ onSchedule }) => {
  const [content, setContent] = useState('');
  const [date, setDate] = useState();
  const { showToast } = useToast();

  const handleSchedule = () => {
    if (content && date) {
      onSchedule({ content, date });
      showToast('Success', 'Post scheduled successfully!', 'default');
      setContent('');
      setDate(undefined);
    } else {
      showToast('Error', 'Please fill in all fields', 'destructive');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule a Post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSchedule} className="w-full">Schedule Post</Button>
      </CardFooter>
    </Card>
  );
};

export default PostScheduler;