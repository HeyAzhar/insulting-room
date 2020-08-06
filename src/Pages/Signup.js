import React, { useContext, useState } from "react";
import { Container, Row, Label, Col, Button, Form, Input } from "reactstrap";
import { UserContext } from "../Context/UserContext";
import firebase from "firebase/app";
import { toast } from "react-toastify";
import { Redirect, Link } from "react-router-dom";

const Signup = () => {
  const context = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSign = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        context.setUser({ email: res.user.email, uid: res.user.uid });
        toast("Get ready to be insulted", {
          type: "default",
        });
      })
      .catch((error) => {
        toast(error.message, {
          type: "error",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Disclaimer: We hope, you are adult and mature enough to understand sarcasm! 😉"
    );
    handleSign();
  };

  if (context.user?.uid) {
    return <Redirect to="/" />;
  }

  return (
    <Container fluid>
      <Row>
        <Col lg={4} className="m-auto">
          <div id="formCard">
            <h1 className="display-4 text-center pt-2 pb-4">Insulting Room</h1>
            <Form onSubmit={handleSubmit}>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Fake@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Random password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={handleSubmit}
                block
                className="mt-3"
                color="dark"
              >
                Sign Up
              </Button>
            </Form>
            <Button
              tag={Link}
              to="/signin"
              outline
              block
              className="mt-3"
              color="dark"
            >
              Already a member? Sign In
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
