import { useState, useRef } from 'react';
import Layout from '@/components/Layout';
import Feed from '@/components/Feed';
import ComposeButton from '@/components/ComposeButton';
import ComposeModal from '@/components/ComposeModal';
import { useUser } from '@/context/UserContext';
import useToast from '@/hooks/useToast';

export default function Home() {
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const { user } = useUser();
  const feedRef = useRef();
  const { showToast } = useToast();

  const handleNewPost = (newPost) => {
    setIsComposeModalOpen(false);
    if (feedRef.current && feedRef.current.handleRefresh) {
      feedRef.current.handleRefresh();
    }
    showToast("Success", "Your post has been created successfully!", "default");
  };

  return (
    <Layout>
      <Feed ref={feedRef} onNewPost={handleNewPost} />
      {user && (
        <>
          <ComposeButton onClick={() => setIsComposeModalOpen(true)} />
          <ComposeModal 
            isOpen={isComposeModalOpen} 
            onClose={() => setIsComposeModalOpen(false)}
            onNewPost={handleNewPost}
            refreshFeed={() => feedRef.current && feedRef.current.handleRefresh()}
          />
        </>
      )}
    </Layout>
  );
}