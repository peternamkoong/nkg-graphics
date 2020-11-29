import React, { useState } from "react";
import { Container, Row, Col, Jumbotron, Form, Button, InputGroup, Alert } from "react-bootstrap";

export default function Contact(props) {
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        orderNumber: "",
        subject: "",
        message: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            setShow(true);
            setForm({
                name: "",
                email: "",
                orderNumber: "",
                subject: "",
                message: "",
            });
        }
    }

    function handleChange(e) {
        const target = e.target;
        const name = target.name;
        setForm({
            ...form,
            [name]: target.value,
        });
        console.log(name + ": " + target.value);
    }

    return (
        <>
            <Jumbotron className="m-0 p-0" fluid style={{ backgroundColor: "white" }}>
                <Container>
                    <Row>
                        <Col>
                            <h1 style={{ fontSize: "75px" }} className="roboto bold mb-3">
                                Contact Us
                            </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className="roboto">
                                For any inquiries related to an existing or new order, please fill out the form below.
                                We will try and respond back within 1 to 2 business days.
                            </p>
                        </Col>
                    </Row>
                    <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>Your message has been successfully sent!</Alert.Heading>
                        <p>Thank you for submitting your inquiry to us! We will respond back as soon as possible.</p>
                    </Alert>
                </Container>
            </Jumbotron>
            <Jumbotron>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs={6}>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group controlId="formName">
                                    <Form.Label>
                                        <b>Name</b> <i className="text-muted">required</i>
                                    </Form.Label>
                                    <Form.Control
                                        onChange={handleChange}
                                        name="name"
                                        value={form.name}
                                        placeholder="John Doe"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide your name
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>
                                        <b>Email address</b> <i className="text-muted">required</i>
                                    </Form.Label>
                                    <Form.Control
                                        onChange={handleChange}
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        placeholder="Enter email"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide your email address
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formOrderNumber">
                                    <Form.Label>
                                        <b>Order Number</b> <i className="text-muted">optional</i>
                                    </Form.Label>
                                    <InputGroup className="mb-2">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>#</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            onChange={handleChange}
                                            name="orderNumber"
                                            value={form.orderNumber}
                                            placeholder="000XX"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formSubject">
                                    <Form.Label>
                                        <b>Subject</b> <i className="text-muted">required</i>
                                    </Form.Label>
                                    <Form.Control
                                        onChange={handleChange}
                                        name="subject"
                                        value={form.subject}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a short reason for contacting us
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formSubject">
                                    <Form.Label>
                                        <b>Message</b> <i className="text-muted">required</i>
                                    </Form.Label>
                                    <Form.Control
                                        onChange={handleChange}
                                        name="message"
                                        value={form.message}
                                        as="textarea"
                                        rows={4}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please explain the reason for contacting us
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formAttachment">
                                    <Form.Label>
                                        <b>Form Attachment</b> <i className="text-muted">optional</i>
                                    </Form.Label>
                                    <Form.File name="exampleFormControlFile" />
                                </Form.Group>
                                <Button size="lg" block variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </>
    );
}
