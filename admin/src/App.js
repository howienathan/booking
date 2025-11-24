import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from "./pages/Login/login"
import { Header } from './app/components/Header/header';
import Register from './pages/Register/register';
import Dashboard from './pages/Dashboard/dashboard';
import CreateProduct from './pages/createProduct';
import Product from './pages/Product/product';
import EditProduct from './pages/Product/editProduct';

const App = () => {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path='/' element={ <Dashboard/> } />
        <Route path='/product' element={ <Product/> } />
        <Route path='/products/create' element={ <CreateProduct/> } />
        <Route path="/products/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  )
}

export default App