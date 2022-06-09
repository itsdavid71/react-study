import React from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

class AddBookForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
    };
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
    event.preventDefault();
    const { title, author } = this.state;
    const data = { title, author };
    this.props.onSubmit(data);
    this.setState({
      title: "",
      author: "",
    });
  };

  render() {
    const { title, author } = this.state;
    return (
      <div>
        <h2>Добавление книги</h2>
        <Form className="mb-5 mt-5" onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              onChange={this.handleTitleChange}
              placeholder="Название книги"
              name="title"
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
            />
            {!author && (
              <Form.Text className="text-danger">Введи автора.</Form.Text>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Добавить
          </Button>
        </Form>
      </div>
    );
  }
}

AddBookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default AddBookForm;
