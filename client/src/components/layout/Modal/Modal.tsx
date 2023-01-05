import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalLayout: React.FC<{ComponentToPassDown: React.FC}> = (props) => {
    const [show, setShow] = React.useState<boolean>(false);
    const {ComponentToPassDown} = props
    const handleShow = () => {
        setShow(true)
    };
    const handleClose = () => {
        setShow(false)
    };

    const handleSubmit = () => {
      setShow(false)
    }
    
    return (
      <>
      <Button variant='success' onClick={handleShow}>
        <FontAwesomeIcon icon={faPencil}/>
      </Button>

      <Modal show={show} onHide={handleClose} style={{zIndex: 9999}}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin dự án</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ComponentToPassDown/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalLayout