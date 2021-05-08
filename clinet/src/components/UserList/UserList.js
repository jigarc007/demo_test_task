import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import "./userList.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUsers } from "../../API";
import Model from "../Model/Model";
import moment from "moment";
import Header from "../Header/Header";

const UserList = (props) => {
  const { history } = props;
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      history.push("/sign-in");
    }
    const getUser = async () => {
      debugger;
      const data = await getUsers(localStorage.getItem("id"));
      setUsers(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    getUser();
  }, []);

  const handleToggle = (e) => {
    setToggle((val) => !val);
  };
  if (isLoading) {
    return (
      <div>
        <Spinner animation="border" variant="secondary" />
      </div>
    );
  } else {
    return (
      <>
        <Header />
        <div className="add-btn-wrapper">
          <Button
            variant="secondary"
            onClick={() => {
              history.push("/add-User");
            }}
          >
            Add New User
          </Button>
        </div>
        <Model
          visible={toggle}
          setUsers={setUsers}
          deleteUserId={deleteUserId}
          setVisible={setToggle}
        />
        <div className='table-wrapper'>
          <h2>User Details</h2>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">phone</th>
              <th scope="col">gender</th>
              <th scope="col">Age</th>
              <th scope="col">DOB</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((d, i) => (
                <tr key={i}>
                  <td scope="row">{i + 1}</td>
                  <td>{d.name}</td>
                  <td>{d.phone}</td>
                  <td>{d.gender ? "Male" : "Female"}</td>
                  <td>{d.age}</td>
                  <td>{moment(d.dob).format("DD-MM-YYYY")}</td>
                  <td>
                    <div className="action-column">
                      <Button
                        variant="primary"
                        onClick={() =>
                          props.history.push({
                            pathname: "/add-User",
                            state: { id: d._id },
                          })
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setDeleteUserId(d._id);
                          handleToggle();
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr align="center">
                <td colSpan={8}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        <ToastContainer autoClose={2000} />
      </>
    );
  }
};

export default UserList;
