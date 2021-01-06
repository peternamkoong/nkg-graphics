import { Jumbotron, Container, Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import React from "react";

import Invoice from "./invoice.component";

export default function OrderConfirmation() {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);

    return (
        <>
            <Jumbotron className="mb-0" fluid>
                <Container>
                    <Row>
                        <Col>
                            <h1 style={{ fontSize: "75px", fontWeight: "bold" }}>Order Confirmation</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>You have successfully submitted your order!</p>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Jumbotron className="mb-0" style={{ backgroundColor: "white" }}>
                <Container style={{ textAlign: "center" }}>
                    <Row className="justify-content-center">
                        <Col xs={6}>
                            <Card>
                                <Card.Img variant="top" />
                                <Card.Body>
                                    <Card.Title>Order Confirmation</Card.Title>
                                    <Card.Text>
                                        Thank you for placing your order with NKG Graphics. Please look out for an email
                                        from our team for further details regarding your order.
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>
                                        Order Number: <b>#{id}</b>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Invoice id={id} />
        </>
    );
}
