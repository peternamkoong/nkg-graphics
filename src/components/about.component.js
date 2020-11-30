import React from "react";
import { Container, Jumbotron, Row, Col } from "react-bootstrap";

export default function About(props) {
    return (
        <Jumbotron className="m-0 p-0" fluid style={{ backgroundColor: "white" }}>
            <Container><Row>
                        <Col>
                            <h1 style={{ fontSize: "75px" }} className="roboto bold mb-3">
                                Contact Us
                            </h1>
                        </Col>
                    </Row>
                    </Container>
        </Jumbotron>
    );
}