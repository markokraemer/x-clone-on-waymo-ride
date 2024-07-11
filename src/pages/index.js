import { useState } from 'react';
import Layout from '@/components/Layout';
import Feed from '@/components/Feed';
import ComposeButton from '@/components/ComposeButton';
import ComposeModal from '@/components/ComposeModal';
import { useUser } from '@/context/UserContext';

export default function Home() {
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const { user } = useUser();

  const handleNewPost = (newPost) => {
    // The Feed component now handles adding the new post to its state
    setIsComposeModalOpen(false);
  };

  return (
    <Layout>
      <Feed onNewPost={handleNewPost} />
      {user && (
        <>
          <ComposeButton onClick={() => setIsComposeModalOpen(true)} />
          <ComposeModal 
            isOpen={isComposeModalOpen} 
            onClose={() => setIsComposeModalOpen(false)}
            onNewPost={handleNewPost}
          />
        </>
      )}
    </Layout>
  );
}