import { React, setState, useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

export default function DemonstrationWarning() {

    // handle initial warning modal 

    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

    // make sure that the modal only appears when the user first uses the website using cookies

    const [cookies, setCookie] = useCookies(['hasSeenModal']);

    const clickContinueButton = () => {
        setIsWarningModalOpen(false);
        setCookie("hasSeenModal", true);
    }

    useEffect(() => {
        if (cookies.hasSeenModal !== "true") {
            setIsWarningModalOpen(true);
        }
    }, []);

    return (
        <Modal show={isWarningModalOpen} size="lg">
            <Modal.Header>
                <Modal.Title> Attention </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Great Plains Transport is a fictitious company and is not real. Any information or quotes provided on this website are not
                real and should not be relied upon. This website is solely for demonstration purposes and does not reflect any real-world
                information or policies. By continuing to use this website, you acknowledge and understand this disclaimer.
            </Modal.Body>
            <Modal.Footer>
                <Button className='custom-button-green' onClick={() => clickContinueButton()}> Continue </Button>
            </Modal.Footer>
        </Modal>
    );
}