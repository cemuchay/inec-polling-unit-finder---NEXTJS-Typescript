import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import img from "public/correct-way-to-vote.jpg";
import Image from "next/image";

const ModalComp = () => {
   const [show, setShow] = useState(true);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <>
         <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
         >
            <Modal.Header closeButton>
               <Modal.Title>
                  {" "}
                  <span
                     className="text-center"
                     style={{ marginRight: "auto", marginLeft: "auto" }}
                  >
                     CORRECT WAY TO VOTE !{" "}
                  </span>
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Image
                  src={img}
                  alt="Correct Way To Vote"
                  width={500}
                  height={500}
               />
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ModalComp;
