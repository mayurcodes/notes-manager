import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Link, useHistory } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { isPending, error, userInfo } = userLogin;
  const history = useHistory();

  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history, userInfo]);

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div>
      <MainScreen title="Login">
        <div>
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
          {error && (
            <div>
              <AlertMessage variant="danger">{error}</AlertMessage>
            </div>
          )}
          <Form onSubmit={loginHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <div className="py-3">
            New user?{" "}
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "grey" }}
            >
              Register here
            </Link>
          </div>
        </div>
      </MainScreen>
    </div>
  );
};

export default LoginScreen;
