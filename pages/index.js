import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { useContext, useEffect, useRef, useState } from 'react'
import * as Icons from 'react-bootstrap-icons';
import FadeInSection from '../components/FadeInSection.js'
import AnimateInSection from '../components/AnimateSection'
import Reviews from '../components/Reviews'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { EndColumnsLinker } from '../components/EndColumnsLinker'
import { NextSeo } from 'next-seo';
import { IsVerticalContext } from '../pages/_app';

export default function Home() {

   const router = useRouter();

   const verticalScreenContext = useContext(IsVerticalContext);

   // change the video from a static image into a video.
   // this should occur after the page is loaded, so the video loads after.

   const mainVideo = useRef();

   useEffect(() => {
      mainVideo.current.src = "./main-video.mp4";
   }, []);

   // handle when you hover the main button / button under the hero video

   const [mainButtonHovered, setMainButtonHovered] = useState(false);

   const onMainButtonHoverEnter = () => {
      setMainButtonHovered(true);
   };

   const onMainButtonHoverLeave = () => {
      setMainButtonHovered(false)
   };

   // handle when you press the main button / button under the hero video

   const mainBtnScrollToElement = useRef(null);

   const pressMainBtn = () => {
      const yOffset = -200;
      const y = mainBtnScrollToElement.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
   };

   // change the shape of the main button under the hero video based on the size of the screen.

   const LearnMore = () => {
      if (!verticalScreenContext.isVerticalScreen)
         return (
            <>
               <h1 className="display-3"> Learn More </h1>
               <p className={`text-center ${styles.mainLowerTextNormal} ${mainButtonHovered ? styles.mainLowerTextHover : ""}`}> click me! </p>
               <Icons.Truck className={`${styles.truckIdle} ${mainButtonHovered ? styles.truck : ""}`} size={75} />
            </>
         )
      else
         return (
            <h1 className="display-3" style={{ margin: "0" }}> Learn More </h1>
         )
   }

   // handle the moving text from right to left that says "why choose us"

   const [scrollPos, setScrollPos] = useState(0);
   const [scrollTop, setScrollTop] = useState(0);
   const [scrollLast, setScrollLast] = useState(0);

   useEffect(() => {

      const handleScroll = (e) => {

         setScrollTop(e.target.documentElement.scrollTop);
         var st = window.pageYOffset || e.target.documentElement.scrollTop;

         if (st > scrollLast)
            setScrollPos(scrollPos - 3)
         else
            setScrollPos(scrollPos + 3)

         setScrollLast((st <= 0) ? 0 : st);
      }

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);

   }, [scrollPos]);

   return (
      <>
         <NextSeo
            title="Australian Interstate Cargo Transport"
            canonical="https://www.greatplainstransport.com.au/"
            openGraph={{
               url: 'https://www.greatplainstransport.com.au/',
               title: 'About Great Plains Transport',
               description: `Great Plains Transport is a full-service transportation company that provides high-quality, affordable transportation 
               services to businesses in Australia. Our team of experienced professionals is dedicated to providing reliable, efficient transportation for any type of 
               cargo.`,
               siteName: 'Great Plains Transport',
            }}
            twitter={{
               handle: '@handle',
               site: '@site',
               cardType: 'summary_large_image',
            }}
         />

         <section className={styles.overflowHiddenMobile}>
            <video ref={mainVideo} className={styles.mainVideo} preload="none" poster="../main-bg.webp"
               autoPlay={true} muted={true} loop="loop" playsInline="playsinline" id="mainVideo"
               style={{ width: "100%" }}>
               <source data-src="main-video.mp4" type="video/mp4" />
            </video>
            <Container className='text-center'>
               <div className={` ${styles.mainDisplayText}`}>
                  <h1 className={`display-1`} > Great Plains Transport  </h1>
                  <p><i>Since 1983</i></p>
               </div>
            </Container>
            <Container className={`${styles.truckBackground}`} style={{ zIndex: "1" }}>
               <div
                  onMouseEnter={onMainButtonHoverEnter}
                  onMouseLeave={onMainButtonHoverLeave}
                  onClick={pressMainBtn}
               >
                  {LearnMore()}
               </div>
            </Container>
            <ProgressBar role="banner" animated={mainButtonHovered} now={100} className={styles.mainProgressBar} style={{ borderRadius: "0" }} />
         </section>

         <section>
            <Container className={`${styles.margin10}`}>
               <Row sm={1} xs={1} md={1} lg={2}>
                  <Col ref={mainBtnScrollToElement} className="d-flex align-items-center" >
                     <FadeInSection threshold={0.1}>
                        <h2 className='display-4' > Anywhere, anytime </h2>
                        <p className='fs-5'> At Great Plains Transport, we understand that our customers are looking for high-quality transportation services at affordable prices.
                           That's why we strive to provide competitive prices for our services, without sacrificing the quality of our work. We believe that our customers should be
                           able to count on us for reliable, efficient transportation at a price that fits within their budget.
                        </p>
                     </FadeInSection>
                  </Col>
                  <Col className={verticalScreenContext.isVerticalScreen ? "mt-5" : ""}>
                     <FadeInSection threshold={0} delay="200ms">
                        <div>
                           <Image src={require("../public/truck-main.webp")
                           } alt="picture of truck" loading='lazy'
                              style={{ width: "100%", height: "auto", minWidth: !verticalScreenContext.isVerticalScreen ? "20rem" : "0rem" }} />
                           <div className={styles.aussieImageMainTruck}>
                              <Image loading='lazy' src={require("../public/small.webp")} width={!verticalScreenContext.isVerticalScreen ? 200 : 100} height={!verticalScreenContext.isVerticalScreen ? 200 : 100}
                                 alt="small pcityre of truck" />
                           </div>
                        </div>
                        <ul className={`d-flex direction-row  justify-content-between ${styles.sideListRight}`}>
                           <li> Victoria </li>
                           <li> New South Wales </li>
                           <li> Queensland </li>
                        </ul>
                     </FadeInSection>
                  </Col>
               </Row>
            </Container>
         </section>

         <section style={{ overflow: "hidden" }}>
            <Container className={`${styles.margin10}`}>
               <Row sm={1} xs={1} md={1} lg={2} >
                  <Col>
                     <FadeInSection threshold={0.5} delay="200ms">
                        <div>
                           <Image src={require("../public/ute-main.webp")} loading='lazy'
                              alt="Picture of Ute"
                              style={{ width: "100%", height: "auto", minWidth: !verticalScreenContext.isVerticalScreen ? "20rem" : "0rem" }} />
                        </div>
                     </FadeInSection>
                  </Col>
                  <Col className="d-flex align-items-center">
                     <FadeInSection threshold={0.5}>
                        <h2 className='display-4'> No job too small </h2>
                        <p className='fs-5'>At Great Plains Transport, we are proud to be a full-service transportation company that can handle any job for any business.
                           We have a fleet of advanced trucks that are capable of transporting a wide range of goods, and our team of experienced professionals is ready to
                           handle any challenge that comes our way. Whether you need to transport heavy machinery, delicate electronics, or any other type of cargo, we are here to help.
                        </p>
                        <Link href="/services" passHref><Button variant="dark" className={`custom-button-green`} style={{ float: "right" }}> View Services </Button></Link>
                     </FadeInSection>
                  </Col>

               </Row>
            </Container>
         </section>

         <section className={`${styles.whyChooseUsTextContainer}`}>
            {!verticalScreenContext.isVerticalScreen ?
               <div className={`${styles.scrollText}`} style={{ transform: `translateX(calc(135rem - ${scrollTop}px))` }}>
                  <h2 style={{ whiteSpace: "nowrap" }}> WHY CHOOSE US? </h2>
               </div>
               :
               <h2 className={`${styles.scrollText}`} style={{ textAlign: "center" }}> WHY CHOOSE US? </h2>
            }
         </section>


         <section style={{ overflow: "hidden" }}>
            <AnimateInSection hideOverflow={true} threshold="0.55" classesToAdd={styles.truckIn} >
               <div className={`${styles.bigColorSections}`} >
                  <div className={styles.truckSvgContainerParent}>
                     <div className={styles.truckSvgContainer}>
                        <Icons.Truck size={!verticalScreenContext.isVerticalScreen ? 400 : 200} color="#000000" />
                     </div>
                  </div>
                  <div className='m-5'>
                     <Row>
                        <Col className={`${verticalScreenContext.isVerticalScreen ? 'text-start' : `text-end`} d-flex flex-column justify-content-center`}>
                           <h2 className='display-1'> We consistently deliver on time </h2>
                           <p className='fs-2'> No matter rain, hail, or shine all cargo will be delivered on time with no delays. </p>
                        </Col>
                        <Col md="auto">
                           {!verticalScreenContext.isVerticalScreen && <Icons.ClockFill size={300} />}
                        </Col>
                     </Row>
                  </div>
               </div>
            </AnimateInSection>
         </section>

         <section style={{ overflow: "hidden" }}>
            <div className='bg-green' style={{ overflow: "hidden" }}>
               <AnimateInSection hideOverflow={true} threshold={!verticalScreenContext.isVerticalScreen ? "0.55" : "0"} classesToAdd={styles.truckInFromRight} >
                  <div className={`${styles.bigColorSections}`} >
                     <div className='m-5'>
                        <Row>
                           {!verticalScreenContext.isVerticalScreen ? (<>
                              <Col md="auto">
                                 {!verticalScreenContext.isVerticalScreen && <Icons.BuildingCheck size={300} />}
                              </Col>
                              <Col className="text-start d-flex flex-column justify-content-center">
                                 <h2 className='display-1'>We have a long and rich history. </h2>
                                 <p className='fs-2'> We have a long history of a being a reliable and effective transportation service across the country. </p>
                                 <Button onClick={() => router.push("/about")} variant="dark" size='lg' className={`custom-button-green`} style={{ float: "right", width: "fit-content" }}> More Information </Button>
                              </Col>
                           </>) : (<>
                              <Col className="text-start d-flex flex-column justify-content-center">
                                 <h2 className='display-1'> We have ba long and rich history. </h2>
                                 <p className='fs-2'> We have a long history of a being a reliable and effective transportation service across the country. </p>
                                 <Button onClick={() => router.push("/about")} variant="dark" size='lg' className={`custom-button-green`} style={{ float: "right", width: "fit-content" }}> More Information </Button>
                              </Col>
                              <Col md="auto">
                                 <div className='mt-3'>
                                    {!verticalScreenContext.isVerticalScreen && <Icons.BuildingCheck size={300} />}
                                 </div>
                              </Col>
                           </>)}
                        </Row>
                     </div>
                     <div className={styles.truckSvgContainerParentRight}>
                        <div className={styles.truckSvgContainerRight} >
                           <Icons.Truck style={{ transform: "scaleY(-1) rotate(180deg) translateX(50px)" }} size={!verticalScreenContext.isVerticalScreen ? 400 : 200} color="#FFFFFF" />
                        </div>
                     </div>
                  </div>
               </AnimateInSection>
            </div>
         </section>

         <section style={{ overflow: "hidden" }}>
            <AnimateInSection hideOverflow={true} threshold="0.55" classesToAdd={styles.truckIn} >
               <div className={`${styles.bigColorSections}`} >
                  <div className={styles.truckSvgContainerParent}>
                     <div className={styles.truckSvgContainer}>
                        <Icons.Truck size={!verticalScreenContext.isVerticalScreen ? 400 : 200} color="#000000" />
                     </div>
                  </div>
                  <div className='m-5'>
                     <Row>
                        <Col className={`${verticalScreenContext.isVerticalScreen ? 'text-start' : `text-end`} d-flex flex-column justify-content-center align-items-end`}>
                           <h2 className='display-1'> We can do any job </h2>
                           <p className='fs-2'> Whether it be a small local job or a inter-state large cargo shipment </p>
                           <Button onClick={() => router.push("/services")} variant="light" size='lg' className={`custom-button-white`} style={{ float: "left", width: "fit-content" }}> View Services </Button>
                        </Col>
                        <Col md="auto">
                           {!verticalScreenContext.isVerticalScreen && <Icons.Check2Circle size={300} />}
                        </Col>
                     </Row>
                  </div>
               </div>
            </AnimateInSection>
         </section>

         <section className='mt-5 mb-5' >
            <Container>
               <h2 className='display-2 text-center'> Testimonials </h2>
               <Reviews />
            </Container>
         </section>

         <section className='mt-5' style={{ marginBottom: verticalScreenContext.isVerticalScreen ? "5rem" : "20rem" }}>
            <Container>
               <EndColumnsLinker
                  title="More Information"
                  data={
                     [{
                        route: "/about",
                        image: require('../public/old-truck.webp'),
                        text: "About Us",
                        alt: "about us background picture of a 1900's truck"
                     },
                     {
                        route: "/services",
                        image: require('../public/ute-cargo.webp'),
                        text: "Services",
                        alt: "services background picture of the back of a Ute"
                     },
                     {
                        route: "/contact",
                        image: require('../public/people2.webp'),
                        text: "Contact",
                        alt: "contact background picture of the owner of Great Plains Transport"
                     }]
                  } />
            </Container>
         </section>
      </>
   )
}
