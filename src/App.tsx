import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login, Signin, AddDetails } from "./features/auth/index";
import { PrivateRoute, Home, UserDetails, UpdateDetails } from './pages/index'
function App() {
  return (
    <div className="App">
      <Routes>
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/user-details" element={<UserDetails />} />
        <PrivateRoute path="/update-details" element={<UpdateDetails />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-details" element={<AddDetails />} />
      </Routes>
    </div>
  );
}

export default App;
