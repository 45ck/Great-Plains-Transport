import Image from 'next/image'
import styles from '../styles/Services.module.css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useContext, useEffect, useRef, useState } from 'react'
import * as Icons from 'react-bootstrap-icons';
import { useRouter } from 'next/router'
import { EndColumnsLinker } from '../components/EndColumnsLinker';
import heroImage from '../public/services-header.webp';
import ServicesApp from '../components/ServicesApp';
import { NextSeo } from 'next-seo';
import { IsVerticalContext } from './_app';

export default function Services() {

   const router = useRouter();

   const verticalScreenContext = useContext(IsVerticalContext);

   // get a quote app - most of it is handled in it's own component.

   const [servicesAppFullScreen, setServicesAppFullScreen] = useState(false)

   const quoteApp = useRef();

   // press ESC button to exit full screen

   const [keyDown, setKeyDown] = useState("");

   useEffect(() => {
      if (keyDown.code == "Escape" && servicesAppFullScreen)
         setServicesAppFullScreen(false);
   }, [keyDown]);

   const keyHandler = (key) => setKeyDown(key)

   useEffect(() => {

      document.addEventListener("keydown", keyHandler);

      return () => {
         document.removeEventListener("keydown", keyHandler);
      }
   }, [])

   return (
      <>
         <NextSeo
            title="Services"
            canonical="https://www.greatplainstransport.com.au/services"
            openGraph={{
               url: 'https://www.greatplainstransport.com.au/services',
               title: 'About Great Plains Transport',
               description: `Great Plains Transport is a leading trucking company in Australia that can handle any job. Our experienced team of truckers is dedicated to providing
                top-quality transportation services to our clients. Whether you need to transport a small load or a large one, we have the skills and expertise to get the job done
                 right. Contact us today to learn more about how we can help with your transportation needs.`,
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
                  <Image priority={true} alt="Background picture of trucks at our Perth depot" className={styles.mainImage} src={heroImage} />
               </div>
               <svg viewBox="0 0 1440 320">
                  <path fill="#ffffff" fillOpacity="1" d="M0,32L1440,96L1440,320L0,320Z"></path>
               </svg>
               <div className={styles.headerText}>
                  <h1> Services </h1>
                  <p> Here are some of the services we offer. </p>
               </div>
            </div>
         </section>

         <section style={{width: "auto", marginBottom: "5rem", backgroundSize: "cover", backgroundPosition: "center", position: "relative", zIndex: "2"}}>
            <Container className='py-5 d-flex align-content-center align-items-start justify-content-center flex-column text-start'>
               <Row>
               <Col lg={6} className="d-flex justify-content-center flex-column">
                  <h2 > Every job, we cover!</h2>
                  <p className='fs-5'>
                     Our experienced team of truckers has the skills and expertise to handle any job, big or small. 
                     Whether you need to transport a single pallet of goods or an entire truckload, we have the resources and equipment to get the job done right. 
                     We pride ourselves on our reliability and excellence, and we are confident that we can meet your transportation needs. Contact us today to learn
                     more about how we can help with your next project.
                  </p>
               </Col>
               <Col>
               </Col>
               <Col lg={5} className="d-flex justify-content-center align-items-center align-content-center">
                  <Image alt="Picture of a truck with lots of cargo" style={{width: "100%", height: "auto", borderRadius: "5%"}} src={require("../public/truck-freight.webp")}/>
               </Col>
               </Row>
            </Container>
         </section>

         <section style={{padding: "6rem", marginBottom: "5rem"}} className="bg-green">
            <Container className='d-flex justify-content-center align-content-center align-items-center h-100 w-100 text-light flex-column'>
               <h3> Get a estimated quote now! </h3>
               <p> Go through our quiz which will give you a estimated quote based on your needs! </p>
               <button aria-label='Scroll to quote app' onClick={() => {
                  quoteApp.current.scrollIntoView({
                     smooth: true,
                     block: "center"
                  });
               }} className={styles.arrowDownButton}> <Icons.ArrowDownCircleFill size={35}/> </button>
            </Container>
         </section>


         <section>
            <Container className={servicesAppFullScreen ? styles.fullscreenApp : '' }>
               <div style={{position: "relative"}} ref={quoteApp}>
                  <Button aria-label='Toggle fullscreen in quote app' className={styles.fullScreenButton} onClick={() => setServicesAppFullScreen(value => !value) }> 
                  {!servicesAppFullScreen ? <Icons.ArrowsFullscreen size={15}/> : <Icons.XLg size={17}/> } </Button> 
                  <ServicesApp/>
               </div>
            </Container>
         </section>

         <section style={{width: "auto", marginTop: "5rem", backgroundSize: "cover", backgroundPosition: "center"}}>
            <Container className='py-5 d-flex align-content-center align-items-start justify-content-center flex-column text-start'>
               <Row>
               <Col lg={5} className="d-flex justify-content-center align-items-center align-content-center">
                  <Image alt="Picture of a truck with lots of cargo" style={{width: "100%", height: "auto", borderRadius: "5%"}} src={require("../public/truck-sunset-2.webp")}/>
               </Col>
               <Col>
               </Col>
               <Col lg={6} className="d-flex justify-content-center flex-column">
                  <h2 > Affordable Prices </h2>
                  <p className='fs-5'>
                     At Great Plains Transport, we have a wide range of vehicles available to transport any size of cargo for any business or individual. 
                     Our fleet includes trucks, utes, and vans, all of which are well-maintained and equipped to handle a variety of cargo. Whether you need to transport a 
                     small load of goods or a large one, we have the right vehicle for the job. Our team is dedicated to providing reliable and efficient transportation services,
                     and we are confident that we can meet your needs. Contact us today to learn more about our vehicles and services.
                  </p>
                  <Button className={styles.button} style={{width: "fit-content"}} onClick={() => router.push("/contact")}> Contact Us </Button>
               </Col>
               </Row>
            </Container>
         </section>

         <section style={{marginBottom: verticalScreenContext.isVerticalScreen ? "4rem" : "15rem", marginTop: "8rem"}}>
            <Container>
               <EndColumnsLinker 
                        title="Related Pages"
                        data={
                           [{
                              route: "/contact",
                              image: require('../public/people2.webp'),
                              text: "Contact",
                              alt: "Contact us button background picture"
                           },
                           {
                              route: "/about",
                              image: require('../public/old-truck.webp'),
                              text: "About Us",
                              alt: "About us button background picture"
                           },
                           {
                              route: "/",
                              image: require('../public/main-bg.webp'),
                              text: "Home",
                              alt: "Home page button background picture"
                           },
                           ]
                        }/>
               </Container>
            </section>
      </>
   )
}
