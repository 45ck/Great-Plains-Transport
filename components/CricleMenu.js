import { React } from 'react';
import Image from 'next/image';
import circleMenuStyles from '../styles/CircleMenu.module.css'
import Router from 'next/router';

// import media for circle as require
import homeGif from "../public/main-video.gif";
import homeImage from "../public/main-bg.webp";
import aboutImage from "../public/people.webp";
import contactImage from "../public/people2.webp";
import servicesImage from "../public/ute-cargo.webp";

// Each segment of the menu uses a SVG to mask a image.
// The menu is really 4 square divs.
// However, it appears as a circle due to the SVG masking the divs. 

const CircleMenu = () => {
    return (
        <>
        <div onClick={() => Router.push('/')} className={`${circleMenuStyles.topLeft} ${circleMenuStyles.segment}`} role="button" aria-label='Home Button'>
           <div style={{ width: "100%", height: "100%", transform: "rotate(90deg)" }}>
              <Image alt="Top left background image of website main menu" style={{left: "-23%"}}className={circleMenuStyles.image} id={circleMenuStyles.thumbnail} src={homeImage} />
              <Image loading="lazy" alt="Top left background image of website main menu as a animated image" className={circleMenuStyles.image} id={circleMenuStyles.video} src={homeGif} />
              <p id={circleMenuStyles.topLeft} className={circleMenuStyles.title}> Home </p>
           </div>
        </div>
        <div onClick={() => Router.push('/about')} className={`${circleMenuStyles.topRight} ${circleMenuStyles.segment}`} role="button" aria-label='Home Button'>
           <div style={{ width: "100%", height: "100%" }}>
              <Image alt="Top right background image of website main menu" style={{left: "-20%"}}className={circleMenuStyles.image} src={aboutImage} />
              <p id={circleMenuStyles.topRight} className={circleMenuStyles.title}> About Us </p>
           </div>
        </div>
        <div onClick={() => Router.push('/contact')} className={`${circleMenuStyles.bottomRight} ${circleMenuStyles.segment}`} role="button" aria-label='Contact Button'>
           <div style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }} >
              <Image alt="Bottom right background image of website main menu" className={circleMenuStyles.image} src={contactImage} style={{left: "-50%", transform: "scale(1) !important"}} />
              <p id={circleMenuStyles.bottomRight} className={circleMenuStyles.title}> Contact </p>
           </div>
        </div>
        <div onClick={() => Router.push('/services')} className={`${circleMenuStyles.bottomLeft} ${circleMenuStyles.segment}`} role="button" aria-label='Services Button'>
           <div style={{ width: "100%", height: "100%", transform: "rotate(180deg)" }}>
              <Image alt="Bottom left background image of website main menu" style={{left: "-30%"}}className={circleMenuStyles.image} src={servicesImage} />
              <p id={circleMenuStyles.bottomLeft} className={circleMenuStyles.title}> Services </p>
           </div>
        </div>
     </>
    );
};

export default CircleMenu;