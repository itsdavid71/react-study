import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import bookType from "../types/book.js";

function Book({ author, title, imageUrl, onDelete, onEdit }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={
          imageUrl == undefined
            ? "http://scholamundi.org/images/placeholder.png"
            : imageUrl
        }
      />

      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{author}</Card.Text>
        <Button className="me-2" variant="danger" onClick={onDelete}>
          Удалить
        </Button>
        <Button className="me-2" variant="info" onClick={onEdit}>
          Редактировать
        </Button>
        <Button className="me-2" variant="light">
          Открыть комментарии
        </Button>
      </Card.Body>
    </Card>
  );
}

Book.propTypes = {
  book: bookType.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Book;
