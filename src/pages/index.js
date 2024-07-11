import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <h1 className="text-5xl font-bold mb-6">Welcome to X49</h1>
        <p className="text-2xl mb-8">The everything app for just $49</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Social</CardTitle>
              <CardDescription>Connect with friends and share your thoughts</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Explore Feed</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Messaging</CardTitle>
              <CardDescription>Instant messaging with anyone, anywhere</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Start Chatting</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payments</CardTitle>
              <CardDescription>Send and receive money effortlessly</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Manage Finances</Button>
            </CardContent>
          </Card>
        </div>
        <Button size="lg" className="text-xl px-8 py-6">
          Get Started for $49
        </Button>
      </div>
    </Layout>
  );
}