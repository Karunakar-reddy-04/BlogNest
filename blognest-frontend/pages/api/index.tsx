// pages/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Home = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-3xl font-semibold mb-4">Welcome to BlogNest</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
            <Link href={`/blog/${blog.id}`}>
              <a className="text-blue-500 mt-2 block">Read more</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;