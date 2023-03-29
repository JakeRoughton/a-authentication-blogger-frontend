import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const urlEndpoint = 'http://localhost:5001/blogs';

export default function BlogPost() {
  const [blog, setBlog] = useState({
    _id: '',
    createdAt: '',
    title: '',
    text: '',
    author: '',
    lastModified: '',
    categories: [],
  });
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
    axios.get(`${urlEndpoint}/get-one/${id}`).then((response) => {
      setBlog(response.data.post);
    });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    const updatedBlog = {
      title: formData.get('title'),
      text: formData.get('text'),
      author: formData.get('author'),
      categories: [],
    };
    
    await axios.put(`${urlEndpoint}/update-one/${id}`, updatedBlog);
    
    navigate(`/blogs/${id}`);
  };

  const handleDelete = async () => {
    await axios.delete(`${urlEndpoint}/delete-one/${id}`);
    navigate('/blogs');
  };

  return (
    <div className='blog-post'>
      {editMode ? (
        <form onSubmit={handleSubmit} className="edit-form">

          <label htmlFor='title'>Title:</label>
          <input 
          type='text' 
          id='title' 
          name='title' 
          defaultValue={blog.title} />

          <label htmlFor='text'>Text:</label>
          <textarea 
          id='text' 
          name='text' 
          defaultValue={blog.text}></textarea>

          <label htmlFor='author'>Author:</label>
          <input 
          type='text' 
          id='author' 
          name='author' 
          defaultValue={blog.author} />

          <button type='submit'>Save</button>
        </form>
      ) : (
        <>
          <h1>{blog.title}</h1>
          <h2>author: {blog.author}</h2>
          <p>{blog.text}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}