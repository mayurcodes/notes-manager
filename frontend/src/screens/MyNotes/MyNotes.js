import React, { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen/MainScreen";

const MyNotes = () => {
  const [allNotes, setAllNotes] = useState([]);

  const fetchNotes = async () => {
    const allNotesObj = await axios.get("/api/notes");
    const data = allNotesObj.data;
    setAllNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      {/* anything inside mainscreen tag will be treated as a children prop */}
      <MainScreen title="welcome mayur">
        <Link to="/createnote">
          <Button>Add note</Button>
        </Link>
        {allNotes.map((val) => {
          return (
            <Accordion key={val.id}>
              <Card style={{ marginTop: "0.5rem" }}>
                <Card.Header style={{ display: "flex" }}>
                  <span style={{ flex: 1, cursor: "pointer" }}>
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                      style={{ fontSize: "medium" }}
                    >
                      {val.title}
                    </Accordion.Toggle>
                  </span>
                  <div>
                    <Button as={Link} to={`/note/${val.id}`}>
                      Edit
                    </Button>
                    <Button variant="danger" className="mx-2">
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h6>
                      <Badge variant="info">Category - {val.category}</Badge>
                    </h6>
                    <blockquote className="blockquote mb-0">
                      <p>{val.content}</p>
                      <footer className="blockquote-footer">
                        {"24 July 2121"}
                        {/* <cite title="Source Title">Source Title</cite> */}
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          );
        })}
      </MainScreen>
    </div>
  );
};

export default MyNotes;
