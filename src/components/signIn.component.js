import { Jumbotron, Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { signIn } from "../actions";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

export default function SignIn(props) {
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [redirect, setRedirect] = useState(false);

    function handleChange(e) {
        const target = e.target;
        const name = target.name;
        setForm({
            ...form,
            [name]: target.value,
        });
        console.log(target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const form2 = e.currentTarget;
        if (form2.checkValidity() === false) {
            setValidated(true);
        } else {
            axios
                .get("http://localhost:5000/users/getLoggedInUser", {
                    params: { email: form.email, password: form.password },
                })
                .then((response) => {
                    if (response.data.length > 0) {
                        dispatch(signIn(form.email));
                        setRedirect(true);
                    } else {
                        setShow(true);
                    }
                });
        }
    }
    return (
        <>
            {redirect ? (
                <Redirect to="/" />
            ) : (
                <>
                    <Jumbotron fluid>
                        <Container>
                            <Row>
                                <Col>
                                    <h1 style={{ fontSize: "75px", fontWeight: "bold" }}>Sign In</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>
                                        Sign into your account to be able to place orders and update your existing
                                        account information.
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>
                    <Container>
                        <Row>
                            <Col xs={4} />
                            <Col>
                                <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                                    Incorrect Email or Password. Please try again.
                                </Alert>
                                <Card>
                                    <Card.Header style={{ textAlign: "center" }}>Sign In</Card.Header>
                                    <Card.Body>
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                            <Form.Group controlId="formEmail">
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    type="email"
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a correct email address
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group controlId="formPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    name="password"
                                                    value={form.password}
                                                    onChange={handleChange}
                                                    type="password"
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter your password
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Button type="submit" block>
                                                Sign In
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                    <Card.Footer>
                                        Don't have an account? <Card.Link href="/sign-up">Sign up here.</Card.Link>
                                    </Card.Footer>
                                </Card>
                            </Col>

                            <Col xs={4} />
                        </Row>
                    </Container>
                </>
            )}
        </>
    );
}
