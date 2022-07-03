import React from 'react';
import {Col, Container, Row} from "reactstrap";
import LeftColumn from "../left-col/LeftColumn";

function App() {
  return (
    <Container className="mt-5">
        <Row>
            <Col xs={12} lg={4}>
                <LeftColumn />
            </Col>
            <Col xs={12} lg={8} className="order-first order-lg-last">

            </Col>
        </Row>
    </Container>
  );
}

export default App;
