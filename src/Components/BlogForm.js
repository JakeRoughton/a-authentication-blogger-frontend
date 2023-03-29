import { useState } from 'react';
import axios from 'axios';

const urlEndpoint = 'http://localhost:5001/blogs';

export default function BlogForm() {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    author: '',
    year: '',
    categories: [],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`${urlEndpoint}/create-one`, formData);

  };

  return (
    <div>
    <h1>Create Blog</h1>
    <form onSubmit={handleSubmit} className="new-form">
      <label htmlFor='title'>Title:</label>
      <input 
      type='text' 
      id='title' 
      name='title' 
      value={formData.title} 
      onChange={(event) => 
      setFormData({ ...formData, title: event.target.value })} />
      
      <label htmlFor='text'>Text:</label>
      <textarea 
      id='text' 
      name='text' 
      value={formData.text} 
      onChange={(event) => 
      setFormData({ ...formData, text: event.target.value })}></textarea>

      <label htmlFor='author'>Author:</label>
      <input 
      type='text' 
      id='author' 
      name='author' 
      value={formData.author} 
      onChange={(event) => 
      setFormData({ ...formData, author: event.target.value })} />

      <label htmlFor='categories'>Categories:</label>
      <input 
      type='text' 
      id='categories' 
      name='categories' 
      value={formData.categories} 
      onChange={(event) => 
      setFormData({ ...formData, categories: event.target.value })} />  

      <button type='submit'>Create Blog</button>
    </form>
    </div>
  );
}