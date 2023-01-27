import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { Sun, Moon } from 'react-bootstrap-icons';
import './navbar.scss';

const Navbar = () => {
  const [theme, setTheme] = useState('light');

  function toggleThemeHandler() {
    document.documentElement.setAttribute(
      'data-theme',
      theme === 'light' ? 'dark' : 'light'
    );
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <Nav fill variant="tabs" activeKey={'/home'} as="ul" className="Navbar">
      <Nav.Item>
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/rtk">
          RTK
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/graphql">
          Graphql
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/utils">
          Utils
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <div className="Navbar--icon" onClick={toggleThemeHandler}>
          {theme === 'light' ? <Sun /> : <Moon />}
        </div>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
