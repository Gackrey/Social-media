import "./index.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { getStatus, LoginUser } from "@writter/redux/actions";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const [passwordState, setPassState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (status === "error") {
      setEmail("");
      setPassword("");
    }
    if (status === "done") navigate("/");
  }, [navigate, status]);
  function autoFill() {
    setEmail("test@gmail.com");
    setPassword("Qwerty123");
  }
  async function LoginHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await dispatch(LoginUser({ email, password }));
  }
  return (
    <div className="signin">
      <div className="signin-box">
        <div className="img-box">
          <img src="/img/front.jpg" className="image" alt="img" />
          <div className="text-overlay">
            <h1 className="heading-st mb-0">
              Writter <span>Club</span>
            </h1>
            <p>A place where writters connect</p>
          </div>
        </div>
        <form onSubmit={(e) => LoginHandler(e)}>
          <h1 className="heading-st">
            Log <span>IN</span>
          </h1>
          <input
            type="email"
            className="input input-log"
            placeholder="Email"
            value={email}
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
              icon={
                passwordState ? (faEye as IconProp) : (faEyeSlash as IconProp)
              }
              onClick={() => setPassState(!passwordState)}
            />
          </div>
          {status === "error" ? (
            <p className="error">No User found with this data</p>
          ) : (
            ""
          )}
          <input type="submit" className="submit" value="Login" />
          <button onClick={autoFill} className="guest-login">
            Guest Login
          </button>
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
