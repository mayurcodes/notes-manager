import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import Loading from "../../components/Loading/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useHistory } from "react-router";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = { name, email, password, profilePic };
    const config = { headers: { "Content-Type": "application/json" } };

    setIsPending(true);

    if (password !== confirmPassword) {
      setMessage("passwords do not match");
      setIsPending(false);
    } else {
      setMessage(null);
      try {
        const userRegister = await axios.post("/api/users", userInfo, config);
        //save data into local storage
        localStorage.setItem("userInfo", JSON.stringify(userRegister.data));
        setIsPending(false);
        history.push("/login");
      } catch (error) {
        setError(error.response.data.message);
        setIsPending(false);
      }
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
