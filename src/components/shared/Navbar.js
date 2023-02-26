import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

export function Navbar() {
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const [searchString, setSearch] = useState("");

  return (
    <nav className="mantra-nav head-nav nav-main">
      <div className="mantra-nav-title">
        <Link className="mantra-title" to="/">
          BookShop
        </Link>
      </div>
      <div className="mantra-nav-search">
        <input
          className="mantra-search-box mantra-textbox-classic mantra-highlight-box"
          placeholder="  Search"
          type="text "
          value={searchString === "" ? undefined : searchString}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button
          className="mantra-button mantra-primary-btn"
          onClick={() => {
            dispatch({
              type: "SEARCH",
              payload: { value: searchString },
            });
          }}
        >
          <i className="fa fa-search"></i> Search
        </button>
      </div>
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
    </nav>
  );
}
