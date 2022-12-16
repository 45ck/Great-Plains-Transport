import { React, setState, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from '../styles/Navbar.module.css'
import Link from 'next/link';
import { useRouter } from "next/router";
import Image from 'next/image'
import Button from 'react-bootstrap/Button';
import CircleMenu from './CricleMenu';
import * as Icons from 'react-bootstrap-icons';
import { Form } from 'react-bootstrap';

export default function OurNav() {

  const [menuOpen, setMenuOpen] = useState(false)

  const router = useRouter();

  // have a state which always has the current path of the user

  const [path, setPath] = useState(router.asPath);

  useEffect(() => {
    setPath(router.asPath);
  });

  // if the menu is open, disable scrolling

  useEffect(() => {
    document.querySelector("body").style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  // hide UI using ESC key

  const onKeyDownESC = (keyDownEvent) => {
    if (keyDownEvent.code == "Escape") {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDownESC);
  }, []);

  return (
    <>
      <div className={`${styles.navigationContainer} ${menuOpen ? styles.navDark : styles.navLight}`}>
        <Container className="d-flex align-items-center">
          <Button role="button" aria-label="Main Menu Button" variant='dark' onClick={() => setMenuOpen(menuOpen => !menuOpen)} style={{ backgroundColor: "transparent" }}> <Icons.List fill="var(--bs-dark)" size={30} /> </Button>
          <p className='mb-0' style={{ fontFamily: "Secular One Regular", fontSize: "1.3rem" }}> Great Plains Transport </p>
        </Container>
      </div>

      <div className={`${menuOpen ? styles.menuOpen : null} ${styles.menuDefault} ${styles.menuNormal}`} onClick={() => setMenuOpen(false)}>
        <div className={`${styles.navCircleContainer}`} >
          <div style={{ top: "50%", transform: "scale(2.7) translateY(-50%)" }}>
            <CircleMenu />
          </div>
        </div>
      </div>

    </>
  );
}