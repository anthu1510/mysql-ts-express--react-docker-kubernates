
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/Login/Login"
import Dashboard from "./components/Dashboard/Dashboard"
import Home from "./components/Dashboard/Home/Home"


function App() {
  return (
  <Router>
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path="home" element={<Home/>} />
        </Route>
    </Routes>
   </Router>
  )
}

export default App
