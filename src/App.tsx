import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login, Signin, AddDetails } from "./features/auth/index";
import { Home, UserDetails, UpdateDetails } from './pages/index'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/update-details" element={<UpdateDetails />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-details" element={<AddDetails />} />
      </Routes>
    </div>
  );
}

export default App;
