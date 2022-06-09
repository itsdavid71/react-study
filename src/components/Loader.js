import React from "react";
import { Spinner } from "react-bootstrap";

class Loader extends React.Component {
  render() {
    const { isLoading } = this.props;
    if (isLoading == true) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    } else {
      return false;
    }
  }
}

export default Loader;
