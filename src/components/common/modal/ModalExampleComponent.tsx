import { Button } from 'react-bootstrap';
import CustomModal from './CustomModal';
import React, { useState } from 'react';

function ModalExampleComponent() {
  const [shouldShow, setShouldShow] = useState(false);
  function handleShow() {
    setShouldShow(!shouldShow);
  }
  return (
    <>
      <Button onClick={handleShow}>open modal</Button>
      <CustomModal show={shouldShow}>
        <h1>modal</h1>
        <div className="modal__body">
          <p>this is a custom modal</p>
          <Button variant="danger" onClick={handleShow}>
            Close
          </Button>
          <Button onClick={handleShow}>Save</Button>
        </div>
      </CustomModal>
    </>
  );
}

export default ModalExampleComponent;
