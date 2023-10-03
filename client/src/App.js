import './App.css';
import {Routes, Route, useLocation} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {allRecipes} from "./redux/Actions"
import Nav from "./components/Nav/Nav.jsx"
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home.jsx'
import Detail from './components/Detail/Detail.jsx'
import Form from './components/Form/Form';
import Footer from './components/Footer/Footer'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(allRecipes())
  }, [dispatch])
const location = useLocation()
  return (
    <div className="App">
      {location.pathname === "/" ? null : <Nav/>}
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/form" element={<Form/>}/>
      </Routes>
      {location.pathname === "/" ? null : <Footer/>}
    </div>
  );
}

export default App;
