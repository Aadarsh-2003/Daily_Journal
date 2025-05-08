import { useEffect, useState } from 'react';
import { getEntries } from '../api';
import EntryItem from './EntryItem';
import { useNavigate } from 'react-router-dom';

export default function EntryList() {
const [entries, setEntries] = useState([]);
const navigate = useNavigate();

useEffect(() => {
    getEntries().then((res) => setEntries(res.data));
}, []);

const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry._id !== id));
};

return (
    <div>
    <h2>My Journal</h2>
    <button onClick={() => navigate('/new')}>New Entry</button>
    {entries.map(entry => (
        <EntryItem key={entry._id} entry={entry} onDelete={handleDelete} />
    ))}
    </div>
);
}
