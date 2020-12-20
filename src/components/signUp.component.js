import { Jumbotron, Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signIn } from "../actions";
import { Redirect } from "react-router-dom";

export default function SignUp(props) {
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirm: "",
        billingAddress: {
            billingName: "",
            address: "",
            city: "",
            province: "",
            postalCode: "",
            phone: "",
        },
        paymentMethod: {
            paymentName: "",
            cardNumber: "",
            month: "",
            year: "",
            code: "",
        },
        orders: [],
    });

    function handleChange(e) {
        const target = e.target;
        const name = target.name;
        setForm({
            ...form,
            [name]: target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const form2 = e.currentTarget;
        if (form2.checkValidity() === false) {
            setValidated(true);
        } else if (form.password !== form.confirm) {
            setShow(true);
        } else {
            axios.post("http://localhost:5000/users/add", { form: form }).then((response) => {
                dispatch(signIn(form.email));
                setRedirect(true);
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
                                    <h1 style={{ fontSize: "75px", fontWeight: "bold" }}>Sign Up</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>
                                        Creating an account allows you place orders, keeps track of all your past
                                        orders, and simplifies completing help/order requests!
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>
                    <Container>
                        <Row>
                            <Col xs={3} />
                            <Col>
                                <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                                    Passwords do not match. please try again.
                                </Alert>
                                <Card>
                                    <Card.Header style={{ textAlign: "center" }}>Sign Up</Card.Header>
                                    <Card.Body>
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formFirstName">
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control
                                                        value={form.firstName}
                                                        name="firstName"
                                                        onChange={handleChange}
                                                        placeholder="Joe"
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide your last name
                                                </Form.Control.Feedback>
                                                <Form.Group as={Col} controlId="formLastName">
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control
                                                        value={form.lastName}
                                                        name="lastName"
                                                        onChange={handleChange}
                                                        placeholder="Adams"
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide your last name
                                                </Form.Control.Feedback>
                                            </Form.Row>
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
                                            <Form.Group controlId="formPhoneNumber">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control
                                                    name="phoneNumber"
                                                    value={form.phoneNumber}
                                                    onChange={handleChange}
                                                    type="phone"
                                                    placeholder="(403) 000 - 0000"
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide your phone number
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
                                            <Form.Group controlId="formConfirm">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control
                                                    name="confirm"
                                                    value={form.confirm}
                                                    onChange={handleChange}
                                                    type="password"
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please confirm your password
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Button type="submit" block>
                                                Sign Up
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                    <Card.Footer>
                                        Already have an account? <Card.Link href="/sign-in">Sign in here.</Card.Link>
                                    </Card.Footer>
                                </Card>
                            </Col>

                            <Col xs={3} />
                        </Row>
                    </Container>
                </>
            )}
        </>
    );
}
