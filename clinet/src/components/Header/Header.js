import React, { useEffect, useState } from "react";
import "./Header.scss";

const Header = (props) => {
  const { history } = props;
  const handleLogout = () => {
    localStorage.removeItem("id");
    history.push("/sign-in");
  };
  useEffect(() => {});
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand header-link" href="/users-list">
          User Dashboard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline">
            <button
              className="btn btn-primary my-2 my-sm-0"
              onClick={handleLogout}
            >
              Logout
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Header;
