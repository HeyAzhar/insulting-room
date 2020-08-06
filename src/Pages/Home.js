import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Container, Row, Col, Button } from "reactstrap";
import { UserContext } from "../Context/UserContext";
import { Redirect } from "react-router-dom";

const Home = () => {
  const context = useContext(UserContext);
  const [ins, setIns] = useState("Thinking...🤔");

  const fetchInsult = async () => {
    const { data } = await Axios.get(
      "https://cors-anywhere.herokuapp.com/https://evilinsult.com/generate_insult.php?lang=en&type=json"
    );
    setIns(data.insult);
  };

  useEffect(() => {
    fetchInsult();
  }, []);

  const oneMore = () => {
    setIns("Thinking...🤔");
    fetchInsult();
  };

  const logout = () => {
    context.setUser(null);
  };

  if (!context.user?.uid) {
    return <Redirect to="signin" />;
  }

  return (
    <Container fluid>
      <Row>
        <Col md={6} className="offset-md-3">
          <div id="insultCard">
            <h1 className="display-4 text-center pt-2 pb-4">
              Don't mind but..
            </h1>
            <h3 className="text-center">{ins}</h3>
            <Button onClick={oneMore} className="mb-3" block color="dark">
              One More
            </Button>
            <Button
              onClick={logout}
              outline
              className="mb-3"
              block
              color="dark"
            >
              Logout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
