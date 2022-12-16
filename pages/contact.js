import Image from 'next/image'
import styles from '../styles/Services.module.css'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { useState } from 'react'
import * as Icons from 'react-bootstrap-icons';
import { NextSeo } from 'next-seo';

export default function Contact() {

   // form validation 

   const [formValidated, setFormValidated] = useState(false);

   const handleSubmitForm = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
         event.preventDefault();
         event.stopPropagation();
      }
   
      setFormValidated(true);
   };

   return (
      <>
         <NextSeo
            title="Contact"
            canonical="https://www.greatplainstransport.com.au/contact"
            openGraph={{
               url: 'https://www.greatplainstransport.com.au/contact',
               title: 'Contact Great Plains Transport',
               description: `Contact Great Plains Transport at anytime mobile phone: 0456 329 042 and email: somethinghere@email.com and address 145 fake street, Maitland NSW`,
               siteName: 'Great Plains Transport',
            }}
            twitter={{
               handle: '@handle',
               site: '@site',
               cardType: 'summary_large_image',
            }}
         />
         <section className={styles.headerHeight}>
            <div className={`${styles.mainSection} mb-5`} >
               <div>
                  <Image 
                     alt="Background image of our headquarters."
                     priority={true} 
                     className={styles.mainImage} 
                     src={require("../public/contact-header.webp")} />
               </div>
               <svg viewBox="0 0 1440 320">
                  <path fill="#ffffff" fillOpacity="1" d="M0,32L1440,96L1440,320L0,320Z"></path>
               </svg>
               <div className={styles.headerText}>
                  <h1> Contact Us </h1>
                  <p> Contact us in-person, online or over the phone! </p>
               </div>
            </div>
         </section>

         <section style={{ width: "auto", marginBottom: "5rem", backgroundSize: "cover", backgroundPosition: "center", position: "relative", zIndex: "2" }}>
            <Container className='py-5 d-flex align-content-center align-items-start justify-content-center flex-column text-start'>
               <Row className={styles.contactDetails}>
                  <Col lg={5} className="d-flex justify-content-center flex-column">
                     <h2 className='display-4'> Contact us! </h2>
                     <a className='fs-3 mt-2' style={{ color: "var(--green)", textDecoration: "none !important" }}> <Icons.Telephone size={40} className="mx-2" /> 0456 329 042  </a>
                     <a className='fs-3 mt-3' style={{ color: "var(--green)", textDecoration: "none !important" }}> <Icons.Envelope size={40} className="mx-2" /> somethinghere@email.com  </a>
                     <a className='fs-3 mt-3' style={{ color: "var(--green)", textDecoration: "none !important" }}> <Icons.GeoAlt size={40} className="mx-2" /> 145 fake street, Maitland NSW  </a>
                  </Col>
                  <Col>
                  </Col>
                  <Col lg={6} className="d-flex justify-content-center align-items-center align-content-center">
                     <Image 
                        alt="Truck driver at Great Plains Transport."
                        style={{ width: "100%", height: "auto", borderRadius: "5%" }} 
                        src={require("../public/people2.webp")} />
                  </Col>
               </Row>
            </Container>
         </section>

         <Container>
            <hr />
         </Container>

         <section style={{ width: "auto", marginBottom: "5rem", backgroundSize: "cover", backgroundPosition: "center", position: "relative", zIndex: "2" }}>
            <Container>
               <h2 className='display-4'> Contact Form </h2>
               <h3> Fill out our contact form and we will contact you as soon as we can! </h3>
               <div className='border py-4'>
                  <div style={{ maxWidth: "40rem" }} className="px-4 py-2">
                     <Form validated={formValidated} onSubmit={handleSubmitForm} >
                        <Form.Group className="mb-3" controlId="email">
                           <Form.Label> Your email address </Form.Label>
                           <Form.Control type="email" placeholder='Enter email' required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="name">
                           <Form.Label> Your name </Form.Label>
                           <Form.Control placeholder='Enter name' required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="comments">
                           <Form.Label> Comments </Form.Label>
                           <Form.Control as="textarea" rows={4}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" className={`bg-green ${styles.button}`}>
                           Submit
                        </Button>
                     </Form>
                  </div>
               </div>
            </Container>
         </section>

         <Modal show={formValidated}>
            <Modal.Header>
               <Modal.Title> This doesn't work. </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               There is currently no email service for this website so unfortunately you cannot test this feature at the current time. 
               No Email will be sent to your inbox from us, nor any of the entered details will be stored by us. 
            </Modal.Body>
         </Modal>
      </>
   )
}
