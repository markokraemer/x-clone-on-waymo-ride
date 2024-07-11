import { useState } from 'react';
import Layout from '@/components/Layout';
import Feed from '@/components/Feed';
import ComposeButton from '@/components/ComposeButton';
import ComposeModal from '@/components/ComposeModal';
import { useUser } from '@/context/UserContext';

export default function Home() {
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const { user } = useUser();

  const handlePostCreated = (newPost) => {
    // You might want to update the feed here, or let the Feed component handle it
    console.log('New post created:', newPost);
  };

  return (
    <Layout>
      <Feed />
      {user && (
        <>
          <ComposeButton onClick={() => setIsComposeModalOpen(true)} />
          <ComposeModal
            isOpen={isComposeModalOpen}
            onClose={() => setIsComposeModalOpen(false)}
            onPostCreated={handlePostCreated}
          />
        </>
      )}
    </Layout>
  );
}