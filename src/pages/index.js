import Layout from '@/components/Layout';
import Feed from '@/components/Feed';
import TrendingTopics from '@/components/TrendingTopics';
import WhoToFollow from '@/components/WhoToFollow';

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Feed />
        </div>
        <div className="space-y-6">
          <TrendingTopics />
          <WhoToFollow />
        </div>
      </div>
    </Layout>
  );
}