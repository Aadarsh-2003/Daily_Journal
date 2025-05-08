import { Routes, Route } from 'react-router-dom'
import EntryList from './components/EntryList'
import EntryForm from './components/EntryForm'
import './App.css'

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<EntryList/>} />
        <Route path="/new" element={<EntryForm/>} />
        
      </Routes>
    </>
  )
}

export default App
