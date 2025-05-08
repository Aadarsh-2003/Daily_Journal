import { deleteEntry } from '../api';

export default function EntryItem({ entry, onDelete }) {
    const handleDelete = async () => {
    await deleteEntry(entry._id);
    onDelete(entry._id);
};

return (
    <div style={{ border: '1px solid #ccc', margin: '8px', padding: '10px' }}>
        <h3>{entry.title}</h3>
        <p>{entry.content}</p>
        <small>{new Date(entry.createdAt).toLocaleString()}</small><br />
        <button onClick={handleDelete}>Delete</button>
    </div>
);
}