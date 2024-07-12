import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { faker } from '@faker-js/faker';

const generateMockData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    posts: faker.number.int({ min: 1, max: 20 }),
    likes: faker.number.int({ min: 10, max: 100 }),
    followers: faker.number.int({ min: 1, max: 50 }),
  }));
};

const AnalyticsDashboard = () => {
  const data = generateMockData();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="posts" fill="#8884d8" name="Posts" />
                <Bar dataKey="likes" fill="#82ca9d" name="Likes" />
                <Bar dataKey="followers" fill="#ffc658" name="New Followers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{faker.number.int({ min: 100, max: 1000 })}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{faker.number.int({ min: 1000, max: 10000 })}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Followers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{faker.number.int({ min: 500, max: 5000 })}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;