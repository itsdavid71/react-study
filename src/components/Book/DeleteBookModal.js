import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

class BookDeleteModal extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { show, onHide, onConfirm } = this.props;

    return (
      <Modal show={show}>
        <Modal.Header closeButton onClick={onHide}>
          <Modal.Title>Вы уверены?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Подумайте семь раз.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Отмена
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

BookDeleteModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default BookDeleteModal;
