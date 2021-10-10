import React from "react";
import "./LandingPage.css";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="container-text">
            <h1>Welcome to Notes Manager</h1>
            <p>Safe place to keep your notes</p>
          </div>
          <div className="container-button">
            <Link to="/login">
              <Button className="resize-button">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="resize-button" variant="outline-primary">
                Signup
              </Button>
            </Link>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
