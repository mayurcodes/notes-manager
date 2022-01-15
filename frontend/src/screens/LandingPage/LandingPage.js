import React, { useEffect } from "react";
import "./LandingPage.css";
import { Button, Container, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history, userInfo]);

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
