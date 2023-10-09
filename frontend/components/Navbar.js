'use client'
import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container d-flex flex-row justify-content-between align-items-center w-100">
        <div className="title col-md-6">
        <div className="logo"></div>
        <h1>
        <a className="navbar-brand" href="/">
        XClinics
        </a>
        </h1>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className={`links&buttons collapse navbar-collapse col-md-6 ${isMenuOpen ? 'show' : ''}`}
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#about">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/services">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/careers">Careers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/policy">
                Policy
              </a>
            </li>
            <li className="nav-item">
              <a className="btn btn-light text-primary ms-3 mx-1" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item rounded">
              <a className="btn btn-primary text-light mx-1" href="/signup">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
