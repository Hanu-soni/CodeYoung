import React from "react";
import { NavLink } from "react-router-dom";

// this component returns our navbar ultimately //

export const Navbar = () => {
  return (
    <div className="navbar">

      <div className="nav-links">
        <ul>
          <li>
            <a
              href="#register"
              
            >
              Register
            </a>
          </li>
          <li>
            <a
              href="#login"
              className={({ isActive }) => (isActive ? "activenav" : "")}
            >
              Log-out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};