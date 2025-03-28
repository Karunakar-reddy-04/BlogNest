// pages/index.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl">Blog Nest</h1>
      <div>
        {blogs.map((blog: any) => (
          <div key={blog.id} className="border p-4 mb-4">
            <h2 className="text-xl">{blog.title}</h2>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
