import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserAvatar = ({ user, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;