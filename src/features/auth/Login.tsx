import "./auth.css";
import front from "./Img/front.jpg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux'
import { LoginUser } from './authSlice'
export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [passwordState, setPassState] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function LoginHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await dispatch(LoginUser({ email, password }))
    navigate("/");
  }
  return (
    <div className="signin">
      <div className="signin-box">
        <div className="img-box">
          <img src={front} className="image" alt="img" />
          <div className="text-overlay">
            <h1>Writter</h1>
            <p>A place where writters connect</p>
          </div>
        </div>
        <form onSubmit={(e) => LoginHandler(e)}>
          <h1 className="heading-st">
            Log <span>IN</span>
          </h1>
          <input type="email" className="input input-log" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password password-log">
            <input
              type={passwordState ? "text" : "password"}
              className="pass-box pass-box-log"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={passwordState ? faEye : faEyeSlash}
              onClick={() => setPassState(!passwordState)}
            />
          </div>
          <input type="submit" className="submit" value="Login" />
          <p className="other-details other-details-log">
            Don't have an account?
            <Link to="/signup" className="login-btn">
              <p className="login-btn">Sign Up</p>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
