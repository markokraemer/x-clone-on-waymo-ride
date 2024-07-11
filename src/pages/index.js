import { useState, useRef } from 'react';
import Layout from '@/components/Layout';
import Feed from '@/components/Feed';
import ComposeButton from '@/components/ComposeButton';
import ComposeModal from '@/components/ComposeModal';
import { useUser } from '@/context/UserContext';

export default function Home() {
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const { user } = useUser();
  const feedRef = useRef();

  const handleNewPost = (newPost) => {
    setIsComposeModalOpen(false);
    if (feedRef.current && feedRef.current.handleRefresh) {
      feedRef.current.handleRefresh();
    }
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