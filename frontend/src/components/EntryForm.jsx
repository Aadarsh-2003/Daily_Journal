import { useState } from 'react';
import { createEntry } from '../api';
import { useNavigate } from 'react-router-dom';

export default function EntryForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await createEntry({ title, content });
      navigate('/');
    };
  
    return (
      <div>
        <h2>New Journal Entry</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          /><br />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          /><br />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }