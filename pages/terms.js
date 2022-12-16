import Image from 'next/image'
import styles from '../styles/Services.module.css'
import { Container } from 'react-bootstrap'

export default function Privacy() {
   return (
      <>
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
                  <h1>Terms and Conditions</h1>

               </div>
            </div>
         </section>

         <section style={{ width: "auto", marginBottom: "45rem", backgroundSize: "cover", backgroundPosition: "center", position: "relative", zIndex: "2" }}>
            <Container>
            <h1>Terms and Conditions</h1>
                  <p>Terms and conditions are generated individually for each website. This business is not a real business so no terms and conditions are here as a result. </p>
            </Container>
         </section>
      </>
   )
}
