import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Auth/Store';
import Swal from 'sweetalert2';
import { logout } from '../../Auth/Logout';
import "./Navbar.css";

export default function NavbarItem() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'No, stay logged in'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
      }
    });
  };

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="#home" className="me-auto">بانک پارسیان</Navbar.Brand>
        <Nav className="ms-auto">
          <NavLink className="nav-link" to="/">جدول</NavLink>
          <NavLink className="nav-link" to="/chart">چارت</NavLink>
        </Nav>
        <Nav>
          {isAuthenticated ? (
            <Nav.Link className="nav-link" onClick={handleLogout}>خروج</Nav.Link>
          ) : (
            <NavLink className="nav-link" to="/login">ورود</NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
