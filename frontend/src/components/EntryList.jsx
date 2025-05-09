import { useEffect, useState } from 'react';
import { getEntries, deleteEntry } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


export default function EntryList() {


const [entries, setEntries] = useState([]); //for all journal entries
const [searchTerm, setSearchTerm] = useState(''); //for filtering using title
const [selectedDate, setSelectedDate] = useState(null); // for filtering using dates
const [selectedEntry, setSelectedEntry] = useState(null); //for popup display
const [currentPage, setCurrentPage] = useState(1); //for pagination logic
const [sortOption, setSortOption] = useState(''); // for sorting logic
const entriesPerPage = 5;
const navigate = useNavigate();

// fetches all entries from db
useEffect(() => {
    getEntries().then((res) => setEntries(res.data));
}, []);

// deletion logic
const handleDelete = async (id) => {
    try {
      await deleteEntry(id);
      setEntries(entries.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Failed to delete entry:', error);
      alert('Could not delete the entry. Try again.');
    }
    
};


// filtering entries by title and date logic
const filteredEntries = entries.filter(entry => {
  const matchesTitle = entry.title.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesDate = selectedDate
    ? new Date(entry.createdAt).toDateString() === selectedDate.toDateString()
    : true;
  return matchesTitle && matchesDate;
}).sort((a, b) => {
  switch (sortOption) {
    case 'az':
      return a.title.localeCompare(b.title);
    case 'za':
      return b.title.localeCompare(a.title);
    case 'newest':
      return new Date(b.createdAt) - new Date(a.createdAt);
    case 'oldest':
      return new Date(a.createdAt) - new Date(b.createdAt);
    default:
      return 0;
  }
});

// fetching current entries out of filtered entries for pagination
const indexOfLastEntry = currentPage * entriesPerPage;
const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);

return (
    <div>
    <h2>My Journal</h2>

    {/* for sorting options */}
    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} style={{ marginRight: '10px' }}>
      <option value="">Sort By</option>
      <option value="az">Title A-Z</option>
      <option value="za">Title Z-A</option>
      <option value="newest">Newest to Oldest</option>
      <option value="oldest">Oldest to Newest</option>
    </select>
    
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
          {currentEntries.length === 0 ? (
            <p>No entries found.</p>
          ) : (
            currentEntries.map(entry => (

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


      {/* Pagination Controls */}
      <div style={{ marginTop: '20px' }}>
        {Array.from({ length: Math.ceil(filteredEntries.length / entriesPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              background: currentPage === index + 1 ? '#007bff' : '#eee',
              color: currentPage === index + 1 ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

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
