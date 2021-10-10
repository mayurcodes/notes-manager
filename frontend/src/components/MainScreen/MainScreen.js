import React from "react";
import { Container, Row } from "react-bootstrap";
import "./MainScreen.css";

const MainScreen = ({ title, children }) => {
  return (
    <div className="mainback">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <div>
                <h4 className="heading">{title}</h4>
                <hr />
              </div>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
