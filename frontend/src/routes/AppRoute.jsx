import { Route, Routes } from "react-router-dom"

import Register from "../pages/Register"
import Login from "../pages/Login"
import HomePage from "../pages/HomePage"
import Guide from "../pages/Guide"
import About from "../pages/About"
import Scanner from "../pages/Scanner"
import Contact from "../pages/Contact"

const AppRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/Guide" element={<Guide/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/scanner" element={<Scanner/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/register" element={<Register/>} /> 
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default AppRoute
