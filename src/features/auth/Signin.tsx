import "./auth.css";
import front from "./Img/front.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
export const Signin = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState<number>();
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [passwordState, setPassState] = useState(false);
  const [confPasswordState, setConfPassState] = useState(false);
  const [phoneErrorState, setPhoneErrorState] = useState(false);
  const [passErrorState, setPassErrorState] = useState(false);
  const [conPassErrorState, setConPassErrorState] = useState(false);
  const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,15}$/;
  const phoneRegex = /^[2-9]{2}[0-9]{8}$/;
  useEffect(() => {
    if (confPassword === password) setConPassErrorState(false);
    else setConPassErrorState(true);
  }, [password, confPassword]);
  function signupHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate('/add-details')
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
        <form className="signup-form"
          onSubmit={(e) => signupHandler(e)}
        >
          <h1 className="heading-st">
            Sign <span>IN</span>
          </h1>
          <div>
            <input type="text" className="input" placeholder="First Name" value={firstName} required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input type="text" className="input" placeholder="Last Name" value={lastName} required
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
          <div>
            <input type="email" className="input" placeholder="Email" value={email} required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="number" className="input" placeholder="Phone Number" value={phone} required
              onChange={(e) => {
                setPhone(parseInt(e.target.value))
                if (phoneRegex.test(e.target.value)) setPhoneErrorState(false);
                else setPhoneErrorState(true);
              }}
            />
          </div>
          <p className="error"
            style={{
              display: phoneErrorState ? "block" : "none",
            }}
          >
            Enter a valid 10 digit Phone number
          </p>
          <div className="flex">
            <div className="password">
              <input
                type={passwordState ? "text" : "password"}
                className="pass-box"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (passregex.test(e.target.value)) setPassErrorState(false);
                  else setPassErrorState(true);
                }}
                required
              />
              <FontAwesomeIcon
                icon={passwordState ? faEye : faEyeSlash}
                onClick={() => setPassState(!passwordState)}
              />
            </div>
            <div className="password">
              <input
                type={confPasswordState ? "text" : "password"}
                className="pass-box"
                placeholder="Confirm Password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={confPasswordState ? faEye : faEyeSlash}
                onClick={() => setConfPassState(!confPasswordState)}
              />
            </div>
          </div>
          <p className="error"
            style={{
              display: passErrorState ? "block" : "none",
            }}
          >
            Password must be of 8-15 chararters and must contain at least an
            Uppercase letter, a lowercase letter and a number.
          </p>
          <p
            className="error"
            style={{
              display: conPassErrorState ? "block" : "none",
            }}
          >
            Password doesn't match
        </p>
          <button
            type="submit"
            className={
              conPassErrorState === false && passErrorState === false && phoneErrorState === false
                ? "submit"
                : "submit-disable "
            }
            disabled={conPassErrorState === true || passErrorState === true || phoneErrorState === true}
          >
            Continue
        </button>
          <p className="other-details">
            Already have an account?
            <Link to="/login" className="login-btn">
              <p className="login-btn">Login</p>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
