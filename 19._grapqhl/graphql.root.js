let blogs = [
  {
    id: '1',
    title: 'First blog',
    description: 'Description of the first blog',
    completed: false,
    ownerId: '1',
  },
  {
    id: '2',
    title: 'Second blog',
    description: 'Description of the second blog',
    completed: true,
    ownerId: '2',
  },
];

export const root = {
  blogs: () => {
    return {
      errors: [],
      blogs: blogs,
    };
  },
  blog: ({ blogId }) => {
    return {
      errors: [],
      blog: blogs.find((blog) => blog.id === blogId),
    };
  },
  createblog: ({ title, description }) => {
    const newBlog = {
      id: Math.max(...blogs.map((blog) => blog.id)) + 1,
      title,
      description,
      completed: false,
      ownerId: '1',
    };

    blogs.push(newBlog);
    return {
      errors: [],
      id: Math.max(...blogs.map((blog) => blog.id)) + 1,
      title: title,
      description,
    };
  },
  createUser: ({ email, password }) => {
    const newUserId = '1';
    return { errors: [], id: newUserId };
  },
  createToken: ({ email, password }) => {
    const token = 'example-token';
    return { errors: [], token };
  },
  reviewblog: ({ token }) => {
    return { errors: [], id: '1' };
  },
};
