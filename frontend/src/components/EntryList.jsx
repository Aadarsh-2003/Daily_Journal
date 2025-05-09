import { useEffect, useState } from 'react';
import { getEntries } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


export default function EntryList() {


const [entries, setEntries] = useState([]); //for all journal entries
const [searchTerm, setSearchTerm] = useState(''); //for filtering using title
const [selectedDate, setSelectedDate] = useState(null); // for filtering using dates
const [selectedEntry, setSelectedEntry] = useState(null); //for popup display
const navigate = useNavigate();

// fetches all entries from db
useEffect(() => {
    getEntries().then((res) => setEntries(res.data));
}, []);

// deletion logic
const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry._id !== id));
};


// filtering entries by title and date logic
const filteredEntries = entries.filter(entry => {
  const matchesTitle = entry.title.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesDate = selectedDate
    ? new Date(entry.createdAt).toDateString() === selectedDate.toDateString()
    : true;
  return matchesTitle && matchesDate;
});

return (
    <div>
    <h2>My Journal</h2>
    
    {/* search bar code */}
    <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
    />

    {/* date picker code */}
    <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Filter by date"
          maxDate={new Date()}
          isClearable
    />

    {/* new entry navigation here */}
    <button onClick={() => navigate('/new')}>New Entry</button>

    {/* list of entries from db */}
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

              // we placed onclick function on table row so selected entry can be set and shown in popup
              <tr key={entry._id} onClick={() => setSelectedEntry(entry)} style={{ cursor: 'pointer' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{entry.title}</td>
                <td style={{
                        padding: '10px',
                        border: '1px solid #ddd',
                        maxWidth: '300px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>{entry.content}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {new Date(entry.createdAt).toLocaleString()}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <Link to={`/update/${entry._id}`}>
                    <button>Update</button>
                  </Link>
                  <button onClick={(e) =>{ 
                    e.stopPropagation(); // prevents row click
                    handleDelete(entry._id); //handleDelete function called 
                    }} style={{ padding: '5px 10px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
          
        </tbody>
      </table>

       {/* Modal Popup logic */}
       {selectedEntry && (
          <div style={{
            position: 'fixed', top: 0, left: 0,
            width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: '#fff',
              color: '#000', // Set text color to black
              padding: '20px',
              borderRadius: '8px',
              minWidth: '300px',
              maxWidth: '1000px',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
            }}>
              <h3>{selectedEntry.title}</h3>
              <div style={{ margin: '15px 0' }}>
                <strong>Content:</strong>
                <div style={{
                  marginTop: '5px',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word'
                }}>
                  {selectedEntry.content}
                </div>
              </div>
              <p><strong>Created At:</strong> {new Date(selectedEntry.createdAt).toLocaleString()}</p>
              <button onClick={() => setSelectedEntry(null)} style={{ marginTop: '10px' }}>Close</button>
            </div>
          </div>
)}
    </div>
);
}
