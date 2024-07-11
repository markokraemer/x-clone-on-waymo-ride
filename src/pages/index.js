import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Feed from '@/components/Feed';
import ComposeButton from '@/components/ComposeButton';
import ComposeModal from '@/components/ComposeModal';
import { useUser } from '@/context/UserContext';
import useToast from '@/hooks/useToast';
import { motion } from 'framer-motion';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home() {
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const { user } = useUser();
  const feedRef = useRef();
  const { showToast } = useToast();
  const router = useRouter();

  const handleNewPost = (newPost) => {
    setIsComposeModalOpen(false);
    if (feedRef.current && feedRef.current.handleRefresh) {
      feedRef.current.handleRefresh();
    }
    showToast("Success", "Your post has been created successfully!", "default");
  };

  return (
    <Layout>
      <ErrorBoundary>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Feed ref={feedRef} onNewPost={handleNewPost} />
        </motion.div>
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
      </ErrorBoundary>
    </Layout>
  );
}