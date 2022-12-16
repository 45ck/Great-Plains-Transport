import { React, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from '../styles/Footer.module.css'
import Link from 'next/link';
import Image from 'next/image'
import Button from 'react-bootstrap/Button';
import { Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';

export default function OurFooter() {

  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleClose = () => setShowSignupModal(false);
  const handleShow = () => setShowSignupModal(true);

  return (
    <>
      <svg style={{ fill: "var(--bs-light)", marginTop: "-10%" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fillOpacity="1" d="M0,288L720,288L1440,0L1440,320L720,320L0,320Z"></path>
      </svg>

      <footer className='bg-light'>
        <div className={`${styles.footer}`}>
          <Image className={styles.truck} alt="Picture of a truck to the right side of the footer." src={require("../public/footer-truck.webp")} />
          <Container style={{ zIndex: "1", position: "relative" }} className='p-5'>
            <Row xs={1} lg={2} className={`gx-5`}>
              <Col>
                <h2 className='display-4'> Sign up for our newsletter </h2>
                <InputGroup className='mt-4'>
                  <Form.Control
                    placeholder="Email"
                    aria-label="Recipient's email address"
                  />
                </InputGroup>
                <Button onClick={handleShow} variant="dark" className={`custom-button-green w-100 mt-2`}> Sign Up </Button>
              </Col>
              <Col style={{ width: "35%" }} className='mt-3'>
                <h2 > Great Plains Transport </h2>
                <ul className={`list-unstyled ${styles.listPages}`}>
                  <li><Link className={styles.link} href="/">Home</Link></li>
                  <li><Link className={styles.link} href="/about">About</Link></li>
                  <li><Link className={styles.link} href="/contact">Contact</Link></li>
                  <li><Link className={styles.link} href="/services">Services</Link></li>
                  <li><Link className={styles.link} href="/privacy">Privacy Policy</Link></li>
                  <li><Link className={styles.link} href="/terms">Terms and Conditions</Link></li>
                </ul>
              </Col>
            </Row>
            <Row xs={1} lg={2} className={`gx-5`}>
              <Col>
                <h3> Location</h3>
                <p> <b>New South Wales</b> 145 Fake Street, Maitland </p>
                <p> <b>Queensland</b> 8 Woodmans Den, New Land </p>
              </Col>
              <Col>
                <h4> Opening Times </h4>
                <p> <b>Week Days</b> 5AM - 3PM  <br />
                  <b>Weekends</b> 10AM - 7PM </p>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>

      <Modal show={showSignupModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>This doesn't work.</Modal.Title>
        </Modal.Header>
        <Modal.Body>Unfortunately, this demo website doesn't have an email server, so we are unable to send test newsletters. 
          However, if you'd like to preview this feature, please contact us and we'll be happy to customize it to your liking.
          </Modal.Body>
        <Modal.Footer>
          <Button className="bg-green" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}