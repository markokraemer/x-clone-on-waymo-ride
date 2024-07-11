import { useState } from 'react';
import Layout from '@/components/Layout';
import Feed from '@/components/Feed';
import ComposeButton from '@/components/ComposeButton';
import ComposeModal from '@/components/ComposeModal';

export default function Home() {
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setIsComposeModalOpen(false);
  };

  return (
    <Layout>
      <Feed onNewPost={handleNewPost} />
      <ComposeButton onClick={() => setIsComposeModalOpen(true)} />
      <ComposeModal 
        isOpen={isComposeModalOpen} 
        onClose={() => setIsComposeModalOpen(false)}
        onNewPost={handleNewPost}
      />
    </Layout>
  );
}