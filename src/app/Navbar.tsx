import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const Navbar = () => {
  return (
    <Nav fill variant="tabs" activeKey={'/home'} as="ul">
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
    </Nav>
  );
};

export default Navbar;
