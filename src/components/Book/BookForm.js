import React from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import book from "../types/book";

class BookForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      title: props.book ? props.book.title : "",
      author: props.book ? props.book.author : "",
    };
    this.fileInputRef = React.createRef();
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
    // this.setState({ title: this.event.value });
  };

  handleAuthorChange = (event) => {
    this.setState({
      author: event.target.value,
    });
  };

  handleFieldChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.setState({
      [fieldName]: fieldValue,
    });
  };

  handleSubmit = (event) => {
    console.log(this.fileInputRef);
    event.preventDefault();
    const { title, author } = this.state;
    const data = { title, author, file: this.fileInputRef.current.files[0] };
    this.props.onSubmit(data);
    this.setState({
      title: "",
      author: "",
    });
  };

  render() {
    const { book, submitButtonText } = this.props;
    const { title, author } = this.state;
    return (
      <div>
        <Form className="mb-5 mt-5" onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              onChange={this.handleTitleChange}
              placeholder="Название книги"
              name="title"
              value={title}
            />
            {!title && (
              <Form.Text className="text-danger">Введи название.</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Автор книги</Form.Label>
            <Form.Control
              type="text"
              name="author"
              onChange={this.handleAuthorChange}
              placeholder="Автор книги"
              value={author}
            />

            {!author && (
              <Form.Text className="text-danger">Введи автора.</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Обложка</Form.Label>
            <Form.Control type="file" name="image" ref={this.fileInputRef} />
            {book && (
              <div>
                <img src={book.imageUrl} style={{ maxWidth: 200 }} alt="" />
              </div>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            {submitButtonText}
          </Button>
        </Form>
      </div>
    );
  }
}

BookForm.propTypes = {
  submitButtonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

BookForm.defaultProps = {
  submitButtonText: "Сохранить",
};

export default BookForm;
