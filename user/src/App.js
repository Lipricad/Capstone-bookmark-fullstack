import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./page/Home";
import Register from "./page/Register";
import Login from "./page/Login";


function App() {

  return (
    <div className="App">
      <Router>
        <Link to="/"> Home </Link>
        <Link to="/register"> Register </Link>
        <Link to="/login"> Login </Link>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;