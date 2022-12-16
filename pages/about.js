import Image from 'next/image'
import React, { useContext } from 'react';
import styles from '../styles/About.module.css'
import timelineStyles from '../styles/Timeline.module.css'
import { Col, Container, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Timeline, TimelinePart } from '../components/AboutTimeline';
import { EndColumnsLinker } from '../components/EndColumnsLinker';
import { NextSeo } from 'next-seo';
import { IsVerticalContext } from './_app';


export default function About() {

   const verticalScreenContext = useContext(IsVerticalContext);

   // get the current date 

   const [currentDate, setCurrentDate] = useState("");

   useEffect(() => {
      var objToday = new Date();
      var weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
      var dayOfWeek = weekday[objToday.getDay()];
      var domEnder = function () {
         var a = objToday;
         if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
         a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th"
      }();
      var dayOfMonth = (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder;
      var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
      var curMonth = months[objToday.getMonth()];
      var curYear = objToday.getFullYear();

      setCurrentDate(dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear);
   }, []);


   return (
      <>
         <NextSeo
            title="About"
            description="The about page for Great Plains Transport"
            canonical="https://www.greatplainstransport.com.au/about"
            openGraph={{
               url: 'https://www.greatplainstransport.com.au/about',
               title: 'About Great Plains Transport',
               description: 'The about page for Great Plains Transport',
               siteName: 'Great Plains Transport',
            }}
            twitter={{
               handle: '@handle',
               site: '@site',
               cardType: 'summary_large_image',
            }}
         />

         <section className={`${styles.mainSection} mb-5`}>
            <div>
               <Image priority alt="Picture of Great Plains Transport darwin depot as a background image." className={styles.mainImage} src={require("../public/about-header.webp")} />
            </div>
            <svg viewBox="0 0 1440 320">
               <path fill="#ffffff" fillOpacity="1" d="M0,32L1440,256L1440,320L0,320Z"></path>
            </svg>
            <div className={styles.headerText}>
               <h1> About Us </h1>
               <p> We focus on being a reliable and time-efficient transport service across Australia</p>
            </div>
         </section>

         <section className={styles.mainContainer}>
            <Container>
               <h2 className={styles.title}> Our Story </h2>
               <Row xs={1} lg={2}>
                  <Col>
                     <div style={{ display: "flex", flexFlow: "column", height: "100%" }}>
                        <p className={`fs-5`} style={{ flex: "0 1 auto" }}>
                        In 1987, a group of friends in Australia decided to pool their resources and start their own trucking company. They wanted to provide high-quality 
                        transportation services to businesses in their local area. After much discussion, they settled on the name "Great Plains Transport" for their new 
                        company. The founders of Great Plains Transport were all experienced truckers who knew the ins and outs of the industry. They worked tirelessly to 
                        acquire the necessary licenses and permits, as well as to purchase their first fleet of trucks. It wasn't always easy, but they were determined to
                         make their dream a reality.As they began to take on more and more clients, Great Plains Transport quickly gained a reputation for reliability and 
                         excellence. Their hard work paid off, and the company grew rapidly. Within just a few years, Great Plains Transport had become one of the leading trucking companies in Australia.
                        Today, Great Plains Transport continues to thrive, thanks to the dedication of its founders and the hard work of its employees. The company remains 
                        committed to providing top-quality transportation services to its customers, and it looks forward to continued growth and success in the future.
                        </p>
                        <h2 className='display-2 text-center d-flex align-items-center justify-content-center align-content-center' style={{ flex: "1 1 auto" }}> Established 1987 </h2>
                     </div>
                  </Col>
                  <Col>
                     <Image alt="Picture of the two owners of Great Plains Transport"
                        style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%", height: "auto", borderRadius: "5%" }}
                        loading="lazy" src={require("../public/about-us-side-image.webp")} />
                  </Col>
               </Row>
            </Container>
         </section>

         <Container className='mt-5 pt-5'>
            <hr />
         </Container>

         <section className='mb-5'>
            <Container>
               <h2 className={`text-center display-2 mb-5 pb-5`}> Our History </h2>
               <Timeline>
                  <TimelinePart direction="left" isFirst={true}>
                     <h3> 1987 </h3>
                     <p> 3 brothers founded the Australian transport company Great Plains Transport. </p>
                     <Image alt="A 1900's truck that was used to transport cargo."
                        className={timelineStyles.timelineImage} src={require("../public/old-truck.webp")} />
                  </TimelinePart>
                  <TimelinePart direction="right" closer={true}>
                     <h3> 1990 </h3>
                     <p> Expanded services to all of Queensland </p>
                     <Image alt="A picture of the state of Queensland" className={timelineStyles.timelineImage} src={require("../public/QLD.webp")} />
                  </TimelinePart>
                  <TimelinePart direction="left" closer={true}>
                     <h3> 1998 </h3>
                     <p> Expanded services to New South Wales and Northern Territory </p>
                     <Row>
                        <Col>
                           <Image alt="A picture of the state of New South Wales" className={timelineStyles.timelineImage} src={require("../public/NSW.webp")} />
                        </Col>
                        <Col>
                           <Image alt="A picture of the northern territory in Australia" className={timelineStyles.timelineImage} src={require("../public/NORTH.webp")} />
                        </Col>
                     </Row>
                  </TimelinePart>
                  <TimelinePart direction="right" closer={true}>
                     <h3> 2006 </h3>
                     <p> Expanded services to Australia-wide </p>
                     <Image alt="A picture of the of all of the Australian states and territories" className={timelineStyles.timelineImage} src={require("../public/aussie-full.webp")} />
                  </TimelinePart>
                  <TimelinePart direction="left">
                     <h3> 2011 </h3>
                     <p> Officially have a depot in all Australian major cities.  </p>
                  </TimelinePart>
                  <TimelinePart direction="right">
                     <h3> 2018 </h3>
                     <p> Won the National truck association award for most reliable interstate transport service. </p>
                  </TimelinePart>
                  <div className='bg-dark text-center text-light' style={{ position: "relative", left: "50%", transform: "translateX(-50%) translateY(100%)", width: "fit-content", borderRadius: "5%" }}>
                     <h3 className='p-3'> {currentDate}  </h3>
                  </div>
               </Timeline>
            </Container>
         </section>

         <section style={{ backgroundImage: `url(/road-train.webp)`, width: "auto", marginTop: "20vh", backgroundSize: "cover", backgroundPosition: "center" }}>
            <Container className={`text-light py-5 d-flex align-content-center align-items-end justify-content-center flex-column text-end ${styles.sectionBackgroundImage}`}>
               <Row>
                  <Col lg={5}>
                  </Col>
                  <Col>
                     <div style={{ minHeight: "fit-content" }}>
                        <h2 className='display-1'> Family Driven </h2>
                        <p className='fs-4'>
                        One of the key factors in Great Plains Transport's success is the strong sense of family that runs throughout the company. From the founders to the employees, 
                        everyone at Great Plains Transport is dedicated to working together as a team to provide the best possible service to their customers. 
                        This family-oriented approach is evident in the way that the company operates, with a focus on collaboration and mutual support.
                        </p>
                     </div>
                  </Col>
               </Row>
            </Container>
         </section>
         <section style={{ width: "auto", minHeight: "30rem", marginTop: "5rem", backgroundSize: "cover", backgroundPosition: "center" }}>
            <Container className='py-5 d-flex align-content-center align-items-start justify-content-center flex-column text-start'>
               <Row>
                  <Col lg={6} className="d-flex justify-content-center flex-column">
                     <h2 > Quality over quantity</h2>
                     <p className='fs-5'>
                     At Great Plains Transport, we believe that quality is more important than quantity. We are dedicated to providing high-quality 
                     transportation services to our customers, and we take great care to ensure that every job is completed to the highest possible standards. 
                     We are not a company that focuses on simply completing as many jobs as possible - we are focused on providing the best possible service to each and every 
                     one of our clients.
                     </p>
                  </Col>
                  <Col>
                  </Col>
                  <Col lg={5} className="d-flex justify-content-center align-items-center align-content-center">
                     <Image alt="Picture of a truck with lots of cargo." style={{ width: "100%", height: "auto", borderRadius: "5%" }} src={require("../public/road-train-2.webp")} />
                  </Col>
               </Row>
            </Container>
         </section>

         <section style={{ width: "auto", backgroundSize: "cover", backgroundPosition: "center" }}>
            <Container className='py-5 d-flex align-content-center align-items-start justify-content-center flex-column text-start'>
               <Row>
                  <Col xs={{ order: 3, span: 12 }} lg={{ order: 1, span: 5 }} className="d-flex justify-content-center align-items-center align-content-center">
                     <Image alt="Picture of a truck with no attached cargo." style={{ width: "100%", height: "auto", borderRadius: "5%" }} src={require("../public/truck-sunset-1.webp")} />
                  </Col>
                  <Col lg={{ order: 2, span: 1 }}>
                  </Col>
                  <Col xs={{ order: 2, span: 12 }} lg={{ order: 3, span: 6 }} className="d-flex justify-content-center flex-column">
                     <h2 > Affordable Prices </h2>
                     <p className='fs-5'>
                     At Great Plains Transport, we understand that cost is an important factor when it comes to choosing a transportation provider. 
                     That's why we strive to offer our customers affordable prices for our services. We believe that high-quality transportation should be 
                     accessible and affordable for businesses of all sizes.
                     </p>
                  </Col>
               </Row>
            </Container>
         </section>

         <section style={{ marginBottom: verticalScreenContext.isVerticalScreen ? "5rem" : "15rem", marginTop: "5rem" }}>
            <Container>
               <EndColumnsLinker
                  title="Related"
                  data={
                     [{
                        route: "/",
                        image: require('../public/main-bg.webp'),
                        text: "Home",
                        alt: "Background image of the button that takes you to the home page"
                     },
                     {
                        route: "/services",
                        image: require('../public/ute-cargo.webp'),
                        text: "Services",
                        alt: "Background image of the button that takes you to the services page"
                     },
                     {
                        route: "/contact",
                        image: require('../public/people2.webp'),
                        text: "Contact",
                        alt: "Background image of the button that takes you to the contact page"
                     }]
                  } />
            </Container>
         </section>

      </>
   )
}
