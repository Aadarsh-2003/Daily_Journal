import { Routes, Route } from 'react-router-dom'
import EntryList from './components/EntryList'
import EntryForm from './components/EntryForm'
import UpdateForm from './components/UpdateForm'
import './App.css'


function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<EntryList/>} />
        {/* <Route path="/" element={<Dashboard/>} /> */}
        <Route path="/new" element={<EntryForm/>} />
        <Route path="/update/:id" element={<UpdateForm/>} />
      </Routes>
    </>
  )
}

export default App
