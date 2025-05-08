import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEntry, updateEntry } from '../api';

export default function UpdateForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();  // Get the entry ID from the URL params
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing entry to edit
    getEntry(id).then(res => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the updated entry data to the backend
    await updateEntry(id, { title, content });
    navigate('/');
  };

  return (
    <div>
      <h2>Update Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
