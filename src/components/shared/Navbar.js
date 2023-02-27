import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";

export function Navbar() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const debounce = (searchString) => {
    let id;
    clearTimeout(id);
    id = setTimeout(
      () =>
        dispatch({
          type: "SEARCH",
          payload: { value: searchString },
        }),
      300
    );
  };

  return (
    <nav className="mantra-nav head-nav nav-main">
      <div className="mantra-nav-title">
        <Link className="mantra-title" to="/">
          BookShop
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="mantra-nav-search">
          <input
            className="mantra-search-box mantra-textbox-classic mantra-highlight-box"
            placeholder="  Search"
            type="text "
            onChange={(event) => debounce(event.target.value)}
          />
        </div>
      ) : (
        <h2 className="login-title">Login Page</h2>
      )}
      {isLoggedIn && (
        <div className="mantra-nav-footer">
          <Link to="/login">
            <button
              className="mantra-button mantra-primary-btn mantra-login-btn"
              onClick={logOut}
            >
              Logout
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
