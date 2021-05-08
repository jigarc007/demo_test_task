import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteUser } from "../../API";
const Model = (props) => {
  const { visible, setUsers, setVisible, deleteUserId } = props;
  const handleVisible = (e) => {
    setVisible((val) => !val);
  };

  const handleDelete = async () => {
    const data = await deleteUser(deleteUserId);
    setUsers(data);
    handleVisible();
  };
  return (
    <>
      {visible && (
        <Modal show={visible} onHide={handleVisible}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Box!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do You Want To Delete the Record?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleDelete}>
              Yes
            </Button>
            <Button variant="danger" onClick={handleVisible}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Model;
