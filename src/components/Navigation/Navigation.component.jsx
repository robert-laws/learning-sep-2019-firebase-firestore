import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

import { auth } from '../../firebase/firebase-config';

const Navigation = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpenChange = () => {
    setIsOpen(!isOpen);
  }

  const logoutButton = <Button color='link' className='nav-link nav-button' onClick={() => auth.signOut()}>Logout</Button>;

  return (
    <Navbar color="light" light expand="md">
      <Link className='navbar-brand' to='/'>Firebase - Firestore</Link>
      <NavbarToggler onClick={handleIsOpenChange} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <span className="text-info nav-link">{ user ? `User ${user.displayName} is Logged In` : 'No User Logged In' }</span>
          </NavItem>
          <NavItem>
            <Link className='nav-link' to='/employees'>Employees</Link>
          </NavItem>
          <NavItem>
            {user ? logoutButton : <Link className='nav-link' to='/enter'>Sign Up or Login</Link>}
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Navigation;