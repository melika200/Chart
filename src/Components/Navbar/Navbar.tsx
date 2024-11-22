import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Auth/Store';
import Swal from 'sweetalert2';
import { logout } from '../../Auth/Logout';
import Navbarstyle from './Navbarstyle';


export default function NavbarItem() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navbarstyle = Navbarstyle();
    const handleLogout = () => {
    Swal.fire({
      text: 'مطمئن هستید که میخواید از سامانه خارج شوید؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'بله ،خروج',
      cancelButtonText: 'خیر'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
      }
    });
  };

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="#home" className={navbarstyle.title}>بانک پارسیان</Navbar.Brand>
        <Nav className="ms-auto">
          <NavLink className={navbarstyle.navlink} to="/jadval">جدول</NavLink>
          <NavLink className={navbarstyle.navlink} to="/">چارت</NavLink>
        </Nav>
        <Nav>
          {isAuthenticated ? (
            <Nav.Link className={navbarstyle.navlink} onClick={handleLogout}>خروج</Nav.Link>
          ) : (
            <NavLink className={navbarstyle.navlink} to="/login">ورود</NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
