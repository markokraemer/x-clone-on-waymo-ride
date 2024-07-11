import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

export default function Custom404() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link href="/" passHref>
          <Button>Go back to home</Button>
        </Link>
      </div>
    </Layout>
  );
}