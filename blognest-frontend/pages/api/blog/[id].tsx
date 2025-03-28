import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/blogs/${id}`)
        .then((response) => setBlog(response.data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-3xl font-semibold">{blog.title}</h1>
      <p className="text-gray-600 mt-4">{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
