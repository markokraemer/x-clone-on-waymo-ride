// This is a mock API service to simulate backend calls

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let posts = [
  { id: '1', user: { name: 'John Doe', handle: '@johndoe' }, content: 'Just signed up for X49! Amazing features for just $49!', likes: 15, comments: 3, reposts: 2, timestamp: new Date().toISOString() },
  { id: '2', user: { name: 'Jane Smith', handle: '@janesmith' }, content: 'X49 is revolutionizing the way we connect and transact online. Goodbye expensive alternatives!', likes: 24, comments: 5, reposts: 7, timestamp: new Date().toISOString() },
];

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const api = {
  getPosts: async (page = 1, limit = 10) => {
    await delay(500); // Simulate network delay
    const start = (page - 1) * limit;
    const end = start + limit;
    return posts.slice(start, end);
  },

  createPost: async (content, user) => {
    await delay(500);
    const newPost = {
      id: generateUniqueId(),
      user,
      content,
      likes: 0,
      comments: 0,
      reposts: 0,
      timestamp: new Date().toISOString(),
    };
    posts.unshift(newPost);
    return newPost;
  },

  likePost: async (postId) => {
    await delay(200);
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.likes += 1;
      return post;
    }
    throw new Error('Post not found');
  },

  commentOnPost: async (postId, comment) => {
    await delay(300);
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.comments += 1;
      // In a real app, you'd store the comment content as well
      return post;
    }
    throw new Error('Post not found');
  },

  repostPost: async (postId) => {
    await delay(200);
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.reposts += 1;
      return post;
    }
    throw new Error('Post not found');
  },

  searchPosts: async (query) => {
    await delay(300);
    return posts.filter(post => 
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.user.name.toLowerCase().includes(query.toLowerCase()) ||
      post.user.handle.toLowerCase().includes(query.toLowerCase())
    );
  },
};

export default api;