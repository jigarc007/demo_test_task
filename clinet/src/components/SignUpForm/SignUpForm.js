import React, { useState, useEffect } from "react";
import "./SignUpForm.scss";
import { signin, signup } from "../../API/index";
const SignUpForm = (props) => {
  const { history } = props;
  const [signupObj, setSignupObj] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
  });
  const [errorObj, setErrorObj] = useState({
    password: undefined,
    email: undefined,
    name: undefined,
  });
  const handleSignUP = async (e) => {
    e.preventDefault();
    if (await checkValidation()) {
      const status = await signup(signupObj);
      if (status === 201) {
        history.push("/users-list");
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("id")) {
      history.goBack();
    }
  }, []);
  const checkValidation = () => {
    let errorobj = {};
    if (!signupObj.name || signupObj.name === "") {
      errorobj["name"] = "please enter the name number.";
    }
    if (!signupObj.email || signupObj.email === "") {
      errorobj["email"] = "please enter the name.";
    } else if (
      !/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(
        signupObj.email
      )
    ) {
      errorobj["email"] = "please enter a valid email address.";
    }
    if (!signupObj.password || signupObj.password === "") {
      errorobj["password"] = "please enter the password number.";
    } else if (signupObj.password.trim().split("").length < 8) {
      errorobj["password"] = "please enter 8 characterin the password.";
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
      <h2>SignUp</h2>
      <form>
        <div className="form-group mt-3">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            className={`form-control ${errorObj.name ? "is-invalid" : ""}`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={(e) =>
              setSignupObj({ ...signupObj, name: e.target.value })
            }
          />
          {errorObj.name && (
            <div className="invalid-feedback">{errorObj.name}</div>
          )}
        </div>
        <div className="form-group mt-3">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            className={`form-control ${errorObj.email ? "is-invalid" : ""}`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) =>
              setSignupObj({ ...signupObj, email: e.target.value })
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
              setSignupObj({ ...signupObj, password: e.target.value })
            }
          />
          {errorObj.password && (
            <div className="invalid-feedback">{errorObj.password}</div>
          )}
        </div>
        <button className="btn btn-info btn-margin mt-3" onClick={handleSignUP}>
          SignUp
        </button>
      </form>
    </div>
  );
};
export default SignUpForm;
