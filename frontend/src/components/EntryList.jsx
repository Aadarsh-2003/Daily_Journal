import { useEffect, useState } from 'react';
import { getEntries } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function EntryList() {
const [entries, setEntries] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const navigate = useNavigate();

useEffect(() => {
    getEntries().then((res) => setEntries(res.data));
}, []);

const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry._id !== id));
};

const filteredEntries = entries.filter(entry =>
  entry.title.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
    <div>
    <h2>My Journal</h2>
    <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button onClick={() => navigate('/new')}>New Entry</button>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Title</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Content</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Created At</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.length === 0 ? (
            <p>No entries found.</p>
          ) : (
            filteredEntries.map(entry => (
              <tr key={entry._id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{entry.title}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{entry.content}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {new Date(entry.createdAt).toLocaleString()}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <Link to={`/update/${entry._id}`}>
                    <button>Update</button>
                  </Link>
                  <button onClick={() => handleDelete(entry._id)} style={{ padding: '5px 10px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
          
        </tbody>
      </table>
    </div>
);
}
