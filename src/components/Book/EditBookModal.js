import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import bookType from "../types/book.js";
import BookForm from "./BookForm";

class EditBookModal extends React.Component {
  handleSubmit = (data) => {
    this.props.onSubmit(data);
  };
  render() {
    const { show, onHide, book, onSubmit } = this.props;

    return (
      <Modal show={show}>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>Редактирование</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <BookForm
            book={book}
            onSubmit={this.handleSubmit}
            submitButtonText={"Редактировать"}
          />

          <Button variant="secondary" onClick={onHide}>
            Отмена
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

EditBookModal.propTypes = {
  book: bookType.isRequired,
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditBookModal;
