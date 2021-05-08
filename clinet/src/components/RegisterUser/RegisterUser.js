import React, { useState, useEffect } from "react";
import "./RegisterUser.scss";
import moment from "moment";
import { addUser, getSpecificUser, updateUser } from "../../API";
import Header from "../Header/Header";
const RegisterUser = (props) => {
  const { history } = props;
  const [userData, setUserData] = useState({
    name: undefined,
    phone: undefined,
    gender: true,
    age: undefined,
    dob: undefined,
  });
  const [errorObj, setErrorObj] = useState({
    name: undefined,
    age: undefined,
    phone: undefined,
    dob: undefined,
  });
  const [editId, setEditId] = useState(null);

  const handleAddNewUser = async (e) => {
    e.preventDefault();
    let status;
    if (await checkValidation()) {
      if (editId) {
        status = await updateUser(editId, userData);
      } else {
        status = await addUser(userData);
      }
      if (status === 201 || status === 200) {
        history.push("/users-list");
      }
    }
  };
  const checkValidation = () => {
    let errorobj = {};
    if (!userData.name || userData.name === "") {
      errorobj["name"] = "please enter the name.";
    }
    if (!userData.phone || userData.phone === "") {
      errorobj["phone"] = "please enter the phone number.";
    }
    if (userData.phone && userData.phone.toString().split("").length !== 10) {
      errorobj["phone"] = "please enter the 10 digit phone nuber.";
    }
    if (!userData.age && userData.age !== 0) {
      errorobj["age"] = "please enter the age.";
    }
    if (userData.age <= 0 && userData.age >= 101) {
      errorobj["age"] = "please enter the age between 1 to 100.";
    }
    if (!userData.dob || userData.dob === "") {
      errorobj["dob"] = "please enter the dob.";
    }
    if (Object.keys(errorobj).length > 0) {
      setErrorObj(errorobj);
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      history.push("/sign-in");
    }
    if (history.location.state) {
      const getSpecific = async () => {
        const data = await getSpecificUser(history.location.state.id);
        const { _id, name, gender, age, dob, phone } = data[0];
        setUserData({
          name: name,
          gender: gender ? 1 : 0,
          age: age,
          dob: moment(dob).format("YYYY-MM-DD"),
          phone: phone,
        });
        setEditId(_id);
      };
      getSpecific();
    }
  }, []);

  return (
    <>
      <Header />
      <div className="user-wrapper">
        <h2>{editId ? "Edit" : "Add"} User</h2>
        <form>
          <div className="form-group mt-3">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              className={`form-control ${errorObj.name ? "is-invalid" : ""}`}
              id="exampleInput"
              aria-describedby="nameHelp"
              placeholder="Enter name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
            {errorObj.name && (
              <div className="invalid-feedback">{errorObj.name}</div>
            )}
          </div>
          <div className="form-group mt-3">
            <label for="exampleInputEmail1">Phone</label>
            <input
              type="number"
              className={`form-control ${errorObj.phone ? "is-invalid" : ""}`}
              id="exampleInput"
              aria-describedby="nameHelp"
              placeholder="Enter phone number"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
            {errorObj.phone && (
              <div className="invalid-feedback">{errorObj.phone}</div>
            )}
          </div>
          <div className="form-group mt-3">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="1"
                checked={userData.gender === 1 ? true : false}
                onChange={() => setUserData({ ...userData, gender: 1 })}
              />
              <label className="form-check-label" for="exampleRadios1">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value="0"
                checked={userData.gender === 0 ? true : false}
                onChange={() => setUserData({ ...userData, gender: 0 })}
              />
              <label className="form-check-label" for="exampleRadios2">
                Female
              </label>
            </div>
          </div>
          <div className="form-group mt-3">
            <label for="exampleInputEmail1">Age</label>
            <input
              type="number"
              className={`form-control ${errorObj.age ? "is-invalid" : ""}`}
              id="exampleAge"
              aria-describedby="age"
              placeholder="Enter Age"
              value={userData.age}
              onChange={(e) =>
                setUserData({ ...userData, age: +e.target.value })
              }
            />
            {errorObj.age && (
              <div className="invalid-feedback">{errorObj.age}</div>
            )}
          </div>
          <div className="form-group mt-3">
            <label for="exampleInputEmail1">Dob</label>
            <input
              type="date"
              className={`form-control ${errorObj.dob ? "is-invalid" : ""}`}
              id="exampleDob"
              aria-describedby="dob"
              value={userData.dob}
              onChange={(e) =>
                setUserData({ ...userData, dob: e.target.value })
              }
            />
            {errorObj.dob && (
              <div className="invalid-feedback">{errorObj.dob}</div>
            )}
          </div>
          <button
            className="btn btn-lg btn-primary mt-3 btn-margin"
            onClick={handleAddNewUser}
          >
            {editId ? "Edit" : "Add"}
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterUser;
