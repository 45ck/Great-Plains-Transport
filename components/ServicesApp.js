import Image from 'next/image'
import styles from '../styles/Services.module.css'

import { Button, Col, Form, FormControl, InputGroup, Modal, Row, Spinner } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'
import * as Icons from 'react-bootstrap-icons';
import Link from 'next/link'
import axios from 'axios';

function ServicesChoice(props) {
   const [serviceIndex, setServiceIndex] = useState(1);

   useEffect(() => {
      props.onChange(serviceIndex);
   }, [serviceIndex]);

   return (
      <>
         <h2 className='text-center'> Choose Service </h2>
         <div className={`d-flex justify-content-center align-items-center align-content-center ${styles.servicesContainer}`}>
            {props.services.map((serviceOption, index) =>
            (
               // go through each service given to us and build it as a viable option 
               
               <div key={index} onClick={() => setServiceIndex(index)} className={`${styles.service} ${(serviceIndex == index) ? styles.active : ''}`}>
                  <Image loading="lazy" src={serviceOption.image} alt={serviceOption.alt} />
                  <p className='mt-2'> {serviceOption.name} </p>
               </div>
            )
            )}
         </div>
      </>
   );

}

const ServicesApp = () => {

   // potential services 
   const services = [
      {
         name: "Ute",
         image: require("../public/ute-main.webp"),
         costPerKm: 8.5,
         alt: "Picture of a ute"
      },
      {
         name: "Truck",
         image: require("../public/truck-main.webp"),
         costPerKm: 20,
         alt: "Picture of a truck"
      },
      {
         name: "Van",
         image: require("../public/van.webp"),
         costPerKm: 10,
         alt: "Picture of a van"
      }
   ];

   const [serviceIndex, setServiceIndex] = useState(0);

   // slide manager

   const maximumSlideIndex = 3;
   const [slideIndex, setSlideIndex] = useState(0);

   const nextSlide = () => {
      if (slideCanMove(slideIndex + 1))
         setSlideIndex(slideIndex => slideIndex + 1);
   }

   const previousSlide = () => {
      if (slideCanMove(slideIndex - 1))
         setSlideIndex(slideIndex => slideIndex - 1);
   }

   const slideCanMove = (potentialSlideIndex) => {
      // make sure you cant go outside of the slide

      if (potentialSlideIndex > maximumSlideIndex)
         return false;

      if (potentialSlideIndex < 0)
         return false;

      return true;
   }

   const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

   const checkAddressAreValid = () => {
      // check if we are on the set address slide.
      if (slideIndex == 2) {
         if (address1.current.value.trim().length === 0 || address2.current.value.trim().length === 0)
            setNextButtonDisabled(true);
         else
            setNextButtonDisabled(false);
      } else {
         setNextButtonDisabled(false);
      }
   }

   useEffect(() => {
      checkAddressAreValid();
   }, [slideIndex]);

   // prediction slide

   const [predictionData, setPredictionData] = useState({
      showUI: false,
      totalDistance: 0,
      capitalCityName: ""
   });

   const address1 = useRef();
   const address2 = useRef();

   const findDistance = () => {
      setIsLoading(true);

      console.log(`/api/geo?location1=${address1.current.value}&location2=${address2.current.value}`);
      axios.get(`/api/geo?location1=${address1.current.value}&location2=${address2.current.value}`).then((res) => {

         setPredictionData({
            showUI: true,
            totalDistance: res.data.totalDistance,
            capitalCityName: res.data.closestCapital.name
         });

         setIsLoading(false);
      }).catch(error => {

         setIsLoading(false);

         let errorDetails = error.response.data;

         if (errorDetails.success === "false") {
            if (errorDetails.details.where === ("location1" || "location2")) {
               alertCustom("Please go to the previous slide and enter valid street locations.", "Street doesn't exist.");
               return;
            }
         }

         alertCustom("Please excuse us, an unknown server error occurred when trying to fetch your estimated quote.", "Whoops :(");
      });
   };

   // autocomplete address

   const [autoCompleteData, setAutoCompleteData] = useState([]);
   const [autoCompleteSelected, setAutoCompleteSelected] = useState("none");

   // this will make sure that there is only a necessary amount of API calls
   // when this is 0 it will take the latestInput and call the API
   // 0 means it can complete
   const [canQueryAutoComplete, setCanQueryAutoComplete] = useState({ count: 0, latestInput: "" });

   useEffect(() => {

      // if we are on the latest user input
      if (canQueryAutoComplete.count == 0)
         updateSuggestionsFromInput(canQueryAutoComplete.latestInput);

   }, [canQueryAutoComplete])


   const updateAutoCompleteData = (data) => {
      let input = data.currentTarget.value;

      checkAddressAreValid();

      // set a 500ms delay on when we should query the API, if new input is enters 
      // than we can add another promise to cancel the previous one and thus reset
      // the API delay to another 500ms

      setCanQueryAutoComplete(value => value = { count: value.count + 1, latestInput: input });

      setTimeout(() => {
         setCanQueryAutoComplete(value => value = { count: value.count - 1, latestInput: input });
      }, 500);

      // make sure that we are not entering input that is not worth our time 

      if (input.split('').length > 3) {
         setAutoCompleteSelected(data.currentTarget.id);
      } else {
         setAutoCompleteSelected("none");
         return;
      }

      if (canQueryAutoComplete == 0)
         updateSuggestionsFromInput(input);

   };

   const updateSuggestionsFromInput = (input) => {

      // map the suggestions from the API into clickable suggestions 
      // inside of the suggestions dropdown 

      if (input.trim().length === 0)
         return;

      axios.get(`/api/suggestion?address=${input}`).then((res) => {
         var newData = [];

         res.data.result.data.map((item, index) => {
            newData.push(item.label);
         });

         setAutoCompleteData(newData);
      });

      setPredictionData({
         showUI: false,
         totalDistance: 0,
         capitalCityName: ""
      });
   }

   const address1AutoCompleteClick = (addressLabel) => {
      address1.current.value = addressLabel;
      setAutoCompleteSelected("none");
      setAutoCompleteData([]);
   };

   const address2AutoCompleteClick = (addressLabel) => {
      address2.current.value = addressLabel;
      setAutoCompleteSelected("none");
      setAutoCompleteData([]);
   };

   // when the user clicks outside of auto complete it should hide.

   const onDocumentClick = (e) => {
      if (!e.target.classList.contains('auto-complete-clickable')) {
         setAutoCompleteSelected("none");
      }

   }

   useEffect(() => {
      document.addEventListener("click", onDocumentClick);
   }, []);

   // loading UI

   const [isLoading, setIsLoading] = useState(false);

   // modal system 

   const [modalData, setModalData] = useState({ body: "", title: "" });
   const [modalOpen, setModalOpen] = useState(false);

   const alertCustom = (bodyData, titleData) => {
      setModalData({ body: bodyData, title: titleData });
      setModalOpen(true);
   };

   return (
      <>
         <div className='border p-3' style={{ height: " 40rem" }}>
            <div className={`${styles.loadingContainer} ${isLoading ? styles.active : ''}`}>
               {isLoading ? <Spinner animation="grow" variant="success" /> : null}
            </div>

            <div style={{ display: (slideIndex == 0) ? "flex" : "none" }} className="justify-content-center align-items-center align-content-center flex-column h-100">
               <h2> Get an estimated quote </h2>
               <p> Get an estimation <u>RIGHT NOW</u> using our interactive online app. </p>
               <Button className={styles.button} style={{ backgroundColor: "var(--green)" }} size="lg" onClick={() => nextSlide()}> Start </Button>
            </div>

            <div style={{ display: (slideIndex == 1) ? "block" : "none" }}>
               <ServicesChoice services={services} onChange={setServiceIndex} />
            </div>

            <div style={{ display: slideIndex == 2 ? "block" : "none" }}>
               <div className='d-flex flex-column justify-content-center align-items-center'>
                  <div className={`${styles.servicesSelectorContainer}`}>
                     <Image alt={services[serviceIndex].alt} src={services[serviceIndex].image} />
                  </div>
               </div>
               <div className='d-flex justify-content-center'>
                  <div className='w-75 d-flex justify-content-center'>
                     <InputGroup style={{ width: "fit-content" }}>
                        <InputGroup.Text> Service </InputGroup.Text>
                        <FormControl disabled={true} value={services[serviceIndex].name} />
                     </InputGroup>
                  </div>
               </div>

               <hr />

               <Row className='mt-5' xs={1}>
                  <Col className='d-flex justify-content-center flex-column align-items-center'>
                     <div className='w-75'> <Form.Label> Enter the address that you would like to give us the items. </Form.Label></div>
                     <div style={{ height: "fit-content", position: "relative" }} className={`d-flex w-75 ${styles.inputAddressContainer}`} >
                        <InputGroup.Text
                           className={styles.inputAddressText}>
                           <Icons.HouseFill className='me-1' /> Pickup Address
                        </InputGroup.Text>
                        <FormControl
                           id="pickupAddress"
                           autoComplete='on'
                           onChange={updateAutoCompleteData}
                           ref={address1}
                           className={`auto-complete-clickable ${styles.inputAddressInput}`}
                        />
                        <div className={`${styles.suggestionContainer} auto-complete-clickable`} style={{ display: autoCompleteSelected == "pickupAddress" ? "block" : "none" }} >
                           {autoCompleteData.length > 0 ? autoCompleteData.map((value) => {
                              return <span
                                 className={`${styles.suggestionLabel} auto-complete-clickable`}
                                 onClick={() => address1AutoCompleteClick(value)}> {value} <br /></span>
                           }) : <Spinner size='sm' className='mx-2' />}
                        </div>
                     </div>
                  </Col>
                  <Col className='d-flex justify-content-center  flex-column align-items-center'>
                     <div className='w-75'> <Form.Label> Enter the address that we deliver the items to. </Form.Label></div>
                     <div style={{ height: "fit-content", position: "relative" }} className={`d-flex w-75 ${styles.inputAddressContainer}`} >
                        <InputGroup.Text
                           className={styles.inputAddressText}>
                           <Icons.Bullseye className='me-1' /> Delivery Address
                        </InputGroup.Text>
                        <FormControl
                           id="deliverAddress"
                           autoComplete='on'
                           onChange={updateAutoCompleteData}
                           ref={address2}
                           className={`auto-complete-clickable ${styles.inputAddressInput}`}
                        />
                        <div className={`${styles.suggestionContainer} auto-complete-clickable`} style={{ display: autoCompleteSelected == "deliverAddress" ? "block" : "none" }} >
                           {autoCompleteData.length > 0 ? autoCompleteData.map((value) => {
                              return <span
                                 className={`${styles.suggestionLabel} auto-complete-clickable`}
                                 onClick={() => address2AutoCompleteClick(value)}> {value} <br /></span>
                           }) : <Spinner size='sm' className='mx-2' />}
                        </div>
                     </div>
                  </Col>
               </Row>
            </div>

            <div style={{ display: (slideIndex == 3) ? "flex" : "none" }}
               className="justify-content-center align-items-center align-content-center h-100 flex-column">
               <h1 style={{ display: !predictionData.showUI ? "block" : "none" }}> Get estimated quote <b>NOW</b> </h1>

               <Button size="lg" onClick={() => findDistance()} className={`mt-2 ${styles.button}`} style={{ display: !predictionData.showUI ? "block" : "none", backgroundColor: "var(--green)" }}>
                  Get Quote
               </Button>

               <div style={{ display: predictionData.showUI ? "block" : "none" }} className="mt-5 text-center">
                  <div className='border p-5'>
                     <h3 className='fs-1'><u>${Math.round(services[serviceIndex].costPerKm * predictionData.totalDistance)}</u></h3>
                     <p> {Math.round(predictionData.totalDistance)} km </p>
                     <p> {services[serviceIndex].name} coming from {predictionData.capitalCityName} depot </p>
                  </div>
                  <div className='p-3 mt-4'>
                     <p> Please contact us for a full quote. </p>
                     <Link href="/contact" passHref><Button className={`mt-2 ${styles.button}`} > Contact us </Button></Link>
                  </div>
               </div>
            </div>
         </div>
         <div className={`border p-3 d-flex 
                  ${(slideIndex != 0 && slideIndex != maximumSlideIndex) ? 'justify-content-between' : ((slideIndex != 0) ?
               'justify-content-start' : 'justify-content-end')}`}>
            <Button className={`mx-1 ${styles.button}`}
               style={{ display: (slideIndex == 0) ? "none" : "block" }}
               onClick={() => previousSlide()}> Back </Button>
            <Button
               className={styles.button}
               style={{ display: (slideIndex == maximumSlideIndex) ? "none" : "block" }}
               onClick={() => nextSlide()} disabled={nextButtonDisabled}> Next </Button>
         </div>

         <Modal show={modalOpen} onHide={() => setModalOpen(false)} >
            <Modal.Header closeButton>
               <Modal.Title>{modalData.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalData.body}</Modal.Body>
         </Modal>
      </>
   )
}

export default ServicesApp;
