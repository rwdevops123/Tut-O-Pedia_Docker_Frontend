import React from "react";

import { Container } from "react-bootstrap";

import TitleBar from "../Components/TitleBar";

const Header = () => {
  return (
    // <Container fluid style={{ borderBottom: "solid #777" }}>
    <Container fluid style={{ borderBottom: "solid #777" }}>
      <TitleBar />
    </Container>
  );
};

export default Header;
