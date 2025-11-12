import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from "./pages/Home/home";
import Login from "./pages/Login/login"
import { Header } from './app/components/Header/header';
import Register from './pages/Register/register';
import Dashboard from './pages/Dashboard/dashboard';
import CreateProduct from './pages/createProduct';

const App = () => {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path='/dashboard' element={ <Dashboard/> } />
        <Route path='/products/create' element={ <CreateProduct/> } />
      </Routes>
    </Router>
  )
}

export default App