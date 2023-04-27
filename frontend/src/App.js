import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Today from './pages/Today'
import ListPage from "./pages/ListPage"; 
import CalendarPage from "./pages/CalendarPage";
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Router>
        <div className=''>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/today" element={<Today />} />
            <Route path="/:listId" element={<ListPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </Layout>
  )
}

export default App