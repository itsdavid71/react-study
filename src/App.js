import React from "react";
import Axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import Book from "./components/Book/Book";
import AddBookForm from "./components/Book/AddBookForm";
// import Loader from "./components/Loader";
import axios from "axios";

const apiUrl = "https://nordic-books-api.herokuapp.com/books";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      isLoading: true,
      isDeleteModalShown: false,
      isEditModalShown: false,
      bookId: "",
    };
  }

  componentDidMount() {
    this.getBooks();
    // fetch("https://nordic-books-api.herokuapp.com/books?page=1")
    //   .then((res) => res.json())
    //   .then((data) => {});
  }

  getBooks = () => {
    this.setState({
      isLoading: true,
    });
    axios
      .get(apiUrl)
      // .get("./books.json")
      .then((res) => {
        this.setState({
          books: res.data.data,
          isLoading: false,
          pages: res.totalPages,
        });
      });
  };

  handleBookDelete = (bookId) => {
    console.log(bookId);
    this.setState({ isDeleteModalShown: true, bookId });
  };

  handleBookEdit = (bookId) => {
    console.log("edit");
    this.setState({ isEditModalShown: true, bookId });
  };

  handleDeleteModalHide = () => {
    console.log("hide");
    this.setState({
      isDeleteModalShown: false,
    });
  };

  handleEditModalHide = () => {
    this.setState({
      isEditModalShown: false,
    });
  };

  handleDeteleConfirm = () => {
    const { bookId } = this.state;
    fetch(`${apiUrl}/${bookId}`, {
      method: "DELETE",
    }).then(() => {
      this.handleDeleteModalHide();
      this.getBooks();
    });
  };

  handleBookSubmit = (data) => {
    const { title, author } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);

    fetch(apiUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("eshkereeee");
        this.setState({
          title: "",
          author: "",
        });
        this.getBooks();
      });
  };
  render() {
    const { isLoading, isDeleteModalShown, isEditModalShown } = this.state;
    const booksList = this.state.books.map((book) => (
      <Book
        key={book._id}
        id={book._id}
        author={book.author}
        title={book.title}
        userId={book.userId}
        imageUrl={book.imageUrl}
        books={this.state.books}
        onDelete={() => this.handleBookDelete(book._id)}
        onEdit={() => this.handleBookEdit(book._id)}
      />
    ));

    return (
      <div className="library-field container">
        <div className="library-head">
          <h1>Электронная библиотека</h1>
        </div>

        {/* <Pagination pages={this.state.pages} /> */}
        <AddBookForm onSubmit={this.handleBookSubmit} />
        <div className="books-list">
          {isLoading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}

          {!isLoading && booksList}
        </div>
        <Modal show={isDeleteModalShown}>
          <Modal.Header closeButton onHide={this.handleDeleteModalHide}>
            <Modal.Title>Вы уверены?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Подумайте семь раз.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleDeleteModalHide}>
              Отмена
            </Button>
            <Button variant="danger" onClick={this.handleDeteleConfirm}>
              Удалить
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit */}
        <Modal show={isEditModalShown}>
          <Modal.Header closeButton onHide={this.handleEditModalHide}>
            <Modal.Title>Редактирование</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Название книги</Form.Label>
                <Form.Control type="text" placeholder="Введите название" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Автор книги</Form.Label>
                <Form.Control type="text" placeholder="Введите автора" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>ID пользователя</Form.Label>
                <Form.Control type="text" placeholder="Введите ID" />
              </Form.Group>

              <Button variant="primary" type="submit" className="me-2">
                Submit
              </Button>
              <Button variant="secondary" onClick={this.handleEditModalHide}>
                Отмена
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default App;
