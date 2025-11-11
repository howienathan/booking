import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from "./pages/Home/home";
import Login from "./pages/Login/login"
import { Header } from './app/components/Header/header';
import Register from './pages/Register/register';
import Dashboard from './pages/Dashboard/dashboard';

const App = () => {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path='/dashboard' element={ <Dashboard/> } />
      </Routes>
    </Router>
  )
}

export default App