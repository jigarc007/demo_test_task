import React, { useState, useEffect } from "react";
import "./SignInForm.scss";
import { signin, signup } from "../../API/index";
import { Link } from "react-router-dom";
const SignInForm = (props) => {
  let id = localStorage.getItem("id");
  const { history } = props;
  const [loginObj, setLoginObj] = useState({
    email: undefined,
    password: undefined,
  });
  const [errorObj, setErrorObj] = useState({
    password: undefined,
    email: undefined,
  });
  const handleSignUP = async (e) => {
    e.preventDefault();
    if (await checkValidation()) {
      const status = await signin(loginObj);
      if (status === 200) {
        history.push("/users-list");
      }
    }
  };
  useEffect(() => {
    if (id) {
      history.goBack();
    }
  }, []);
  const checkValidation = () => {
    let errorobj = {};
    if (!loginObj.email || loginObj.email === "") {
      errorobj["email"] = "please enter the name.";
    }
    else if (!/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(loginObj.email)) {
        errorobj['email'] = 'please enter a valid email address';
      }
    if (!loginObj.password || loginObj.password === "") {
      errorobj["password"] = "please enter the password number.";
    }
    else if(loginObj.password.trim().split('').length!==10) {
      errorobj['password'] = 'please enter 8 characterin the password.'
    }

    if (Object.keys(errorobj).length > 0) {
      setErrorObj(errorobj);
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="signup-wrapper">
      <h2>SignIn</h2>
      <form>
        <div className="form-group mt-3">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            className={`form-control ${errorObj.email ? "is-invalid" : ""}`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) =>
              setLoginObj({ ...loginObj, email: e.target.value })
            }
          />
          {errorObj.email && (
            <div className="invalid-feedback">{errorObj.email}</div>
          )}
        </div>
        <div className="form-group mt-3">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className={`form-control ${errorObj.password ? "is-invalid" : ""}`}
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) =>
              setLoginObj({ ...loginObj, password: e.target.value })
            }
          />
          {errorObj.password && (
            <div className="invalid-feedback">{errorObj.password}</div>
          )}
        </div>
        <button className="btn btn-info btn-margin mt-3" onClick={handleSignUP}>
          SignIn
        </button>
        <div className="form-group mt-3 signup-link">
          <Link to="/sign-up">Don't have an account? or SignUp</Link>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
