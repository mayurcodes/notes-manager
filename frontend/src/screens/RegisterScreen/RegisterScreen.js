import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import Loading from "../../components/Loading/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import { useEffect } from "react";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { isPending, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password do not match!");
    } else {
      dispatch(register(name, email, password, profilePic));
    }
  };

  const uploadFile = async (photo) => {
    if (!photo) {
      setPicMessage("Please select an image");
    }
    setPicMessage(null);

    try {
      if (photo.type === "image/jpeg" || photo.type === "image/png") {
        const data = new FormData();
        data.append("file", photo);
        data.append("upload_preset", "notes-user-pic");
        data.append("cloud_name", "djkqnztll");

        await axios
          .post("https://api.cloudinary.com/v1_1/djkqnztll/image/upload", data)
          .then((data) => setProfilePic(data.data.url))
          .catch((error) => console.log(error));
      } else {
        return setPicMessage("Please select an image of jpeg, png format");
      }
    } catch (error) {
      console.log(error.message);
      setProfilePic(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      );
    }
  };

  return (
    <div>
      <MainScreen title="Register">
        <div>
          {isPending && <Loading />}
          {error && <AlertMessage variant="danger">{error}</AlertMessage>}
          {message && <AlertMessage variant="danger">{message}</AlertMessage>}
          {picMessage && (
            <AlertMessage variant="danger">{picMessage}</AlertMessage>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>Profile Picture</Form.Label>
              <Form.File
                type="image/png"
                onChange={(e) => uploadFile(e.target.files[0])}
                placeholder="Upload your profile pic"
                id="externalFile"
                custom
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </MainScreen>
    </div>
  );
};

export default RegisterScreen;
