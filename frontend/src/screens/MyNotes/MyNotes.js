import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import MainScreen from "../../components/MainScreen/MainScreen";

import Loading from "../../components/Loading/Loading";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";

function MyNotes({ search }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { isPending, error, notes } = noteList;

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    isPending: isPendingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <div>
      {/* anything inside mainscreen tag will be treated as a children prop */}
      <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
        <Link to="/createnote">
          <Button>Add note</Button>
        </Link>
        {error && (
          <div>
            <AlertMessage variant="danger">{error}</AlertMessage>
          </div>
        )}
        {errorDelete && (
          <div>
            <AlertMessage variant="danger">{errorDelete}</AlertMessage>
          </div>
        )}
        {isPending && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </div>
        )}
        {isPendingDelete && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </div>
        )}
        {notes &&
          notes
            .filter((filteredNote) =>
              filteredNote.title.toLowerCase().includes(search.toLowerCase())
            )
            .reverse()
            .map((val) => {
              return (
                <Accordion key={val._id}>
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
                        <Button as={Link} to={`/note/${val._id}`}>
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          className="mx-2"
                          onClick={() => deleteHandler(val._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <h6>
                          <Badge variant="info">
                            Category - {val.category}
                          </Badge>
                        </h6>
                        <blockquote className="blockquote mb-0">
                          <ReactMarkdown>{val.content}</ReactMarkdown>
                          <footer className="blockquote-footer">
                            Created on{" "}
                            <cite title="Source Title">
                              {val.createdAt.substring(0, 10)}
                            </cite>
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
}

export default MyNotes;
