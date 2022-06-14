import React from "react";
import Axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { Spinner } from "react-bootstrap";
import Book from "./components/Book/Book";
import BookForm from "./components/Book/BookForm";
import EditBookModal from "./components/Book/EditBookModal";
import DeleteBookModal from "./components/Book/DeleteBookModal";
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
      editBook: null,
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
    this.setState({ isDeleteModalShown: true, bookId });
  };

  handleBookEdit = (book) => {
    this.setState({ isEditModalShown: true, editBook: book });
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
    const { title, author, file } = data;
    console.log(file);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("cover", file);

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

  handleEditBookSubmit = (data) => {
    const { title, author, file } = data;
    const { editBook } = this.state;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("cover", file);

    fetch(`${apiUrl}/${editBook._id}`, {
      method: "PUT",
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
        this.handleEditModalHide();
      });
  };

  render() {
    const { editBook, isLoading, isDeleteModalShown, isEditModalShown } =
      this.state;
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
        onEdit={() => this.handleBookEdit(book)}
      />
    ));

    return (
      <div className="library-field container">
        <div className="library-head">
          <h1>Электронная библиотека</h1>
        </div>

        {/* <Pagination pages={this.state.pages} /> */}
        <h2>Добавление книги</h2>
        <BookForm
          onSubmit={this.handleBookSubmit}
          submitButtonText={"Добавить"}
        />
        <div className="books-list">
          {isLoading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}

          {!isLoading && booksList}
        </div>

        <DeleteBookModal
          show={isDeleteModalShown}
          onHide={this.handleDeleteModalHide}
          onConfirm={this.handleDeteleConfirm}
        />

        {editBook && (
          <EditBookModal
            book={editBook}
            show={isEditModalShown}
            onHide={this.handleEditModalHide}
            onSubmit={this.handleEditBookSubmit}
          />
        )}
      </div>
    );
  }
}

export default App;
