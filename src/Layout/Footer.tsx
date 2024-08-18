import React, { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  const [timeStr, setTimeStr] = useState<string>(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let now = new Date();
      setTimeStr(now.toLocaleTimeString());
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line
  });

  return (
    <Container fluid>
      <Row>
        <Col md={11}>
          <footer>&copy;2024 Rudi Welter (Powered by ReactTS)&nbsp;</footer>
        </Col>
        <Col md={1}>
          <footer>{timeStr}</footer>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
