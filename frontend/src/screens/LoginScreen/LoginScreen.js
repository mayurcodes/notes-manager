import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import AlertMessage from "../../components/AlertMessage/AlertMessage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userLogin");

  //   if (userInfo) {
  //     history.push("/mynotes");
  //   }
  // }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();
    const userCred = { email, password };
    const config = { headers: { "Content-Type": "application/json" } };

    setIsPending(true);

    try {
      const userLogin = await axios.post("/api/users/login", userCred, config);
      //saving data in local storage
      console.log(userLogin);
      localStorage.setItem("userInfo", JSON.stringify(userLogin.data));
      setIsPending(false);
      history.push("/mynotes");
    } catch (error) {
      setError(error.response.data.message);
      setIsPending(false);
    }
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
              style={{ textDecoration: "none", color: "inherit" }}
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
