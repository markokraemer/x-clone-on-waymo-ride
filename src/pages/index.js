import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Feed from '@/components/Feed';
import ComposeButton from '@/components/ComposeButton';
import ComposeModal from '@/components/ComposeModal';
import TrendingTopics from '@/components/TrendingTopics';
import WhoToFollow from '@/components/WhoToFollow';
import { useUser } from '@/context/UserContext';
import useToast from '@/hooks/useToast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home() {
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const feedRef = useRef();
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNewPost = (newPost) => {
    setIsComposeModalOpen(false);
    if (feedRef.current && feedRef.current.handleRefresh) {
      feedRef.current.handleRefresh();
    }
    showToast("Success", "Your post has been created successfully!", "default");
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ErrorBoundary>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Feed ref={feedRef} onNewPost={handleNewPost} />
          </div>
          <div className="space-y-6">
            <TrendingTopics />
            <WhoToFollow />
            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">Upgrade to X49 Pro</h2>
                <p className="mb-4">Get all premium features for just $49/year!</p>
                <ul className="list-disc list-inside mb-4">
                  <li>Ad-free experience</li>
                  <li>Priority support</li>
                  <li>Exclusive content</li>
                </ul>
                <Button onClick={() => router.push('/checkout')} className="w-full">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
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