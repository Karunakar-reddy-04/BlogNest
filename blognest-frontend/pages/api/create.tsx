import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CreateBlog = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login first.');

    try {
      await axios.post('http://localhost:5000/api/blogs', { title, content }, {
        headers: { 'x-auth-token': token },
      });
      router.push('/');
    } catch (error) {
      console.error('Error creating blog', error);
    }
};


  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-3xl font-semibold mb-4">Create a New Blog Post</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full p-2 border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Blog Content"
          className="w-full p-2 border rounded-md"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleCreate}
        >
          Create Blog
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
