import { useState } from 'react';
import Layout from '@/components/Layout';
import Feed from '@/components/Feed';
import ComposeButton from '@/components/ComposeButton';
import ComposeModal from '@/components/ComposeModal';

export default function Home() {
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);

  return (
    <Layout>
      <Feed />
      <ComposeButton onClick={() => setIsComposeModalOpen(true)} />
      <ComposeModal isOpen={isComposeModalOpen} onClose={() => setIsComposeModalOpen(false)} />
    </Layout>
  );
}