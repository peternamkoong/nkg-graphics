import { Jumbotron, Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function CustomOrder(props) {
    const [validated, setValidated] = useState(false);
    const isLogged = useSelector((state) => state.isLogged);
    const [redirect, setRedirect] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");
    const [form, setForm] = useState({
        sections: [
            {
                lengths: 0,
                width: 0,
                size: "",
                colour: "",
                quantity: 0,
                name: "",
                description: "",
            },
        ],
    });
    const colourArray = [
        {
            value: "#ffffff",
            display: "White (#FFFFFF)",
        },
        {
            value: "#bbbbbb",
            display: "Light Gray (#BBBBBB)",
        },
        {
            value: "#666666",
            display: "Dark Gray (#666666)",
        },
        {
            value: "#000000",
            display: "Black (#000000)",
        },
        {
            value: "#ff0000",
            display: "Red (#FF0000)",
        },
        {
            value: "#f900e6",
            display: "Pink (#F900E6)",
        },
        {
            value: "#aa00f9",
            display: "Purple (#AA00F9)",
        },
        {
            value: "#0000ff",
            display: "Blue (#0000FF)",
        },
        {
            value: "#0093ff",
            display: "Light Blue (#0093FF)",
        },
        {
            value: "#00ffec",
            display: "Sky Blue (#00FFEC)",
        },
        {
            value: "#00ff00",
            display: "Green (#00FF00)",
        },
        {
            value: "#008d09",
            display: "Dark Green (#008D09)",
        },
        {
            value: "#fffb00",
            display: "Yellow (#FFFB00)",
        },
        {
            value: "#ff8b00",
            display: "Orange (#FF8B00)",
        },
        {
            value: "#8c4000",
            display: "Brown (#8C4000)",
        },
    ];

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const form2 = e.currentTarget;
        if (form2.checkValidity() === false) {
            setValidated(true);
        } else {
            axios
                .put("http://localhost:5000/users/updateCustomOrders", { email: isLogged.email, order: form.sections })
                .then((response) => {
                    setOrderNumber(response.data);
                    setForm({
                        sections: [
                            {
                                lengths: 0,
                                width: 0,
                                colour: "",
                                quantity: 0,
                                name: "",
                                description: "",
                            },
                        ],
                    });
                    setRedirect(true);
                });
        }
    }

    function removeSection(i) {
        const newArray = [...form.sections.slice(0, i), ...form.sections.slice(i + 1)];
        setForm({
            sections: newArray,
        });
        console.log(newArray);
    }

    function handleChange(e, i) {
        const target = e.target;
        const name = target.name;
        const current = form.sections[i];
        const newIndex = {
            ...current,
            [name]: target.value,
        };
        let newArray = [];
        newArray = [...form.sections.slice(0, i), newIndex, ...form.sections.slice(i + 1)];
        setForm({
            sections: newArray,
        });
    }

    function addSection() {
        let newObject = {
            lengths: 0,
            width: 0,
            colour: "",
            quantity: 0,
            shortDescription: "",
            description: "",
        };
        let newArray = [...form.sections.slice(0, form.sections.length), newObject];
        setForm({
            sections: newArray,
        });
    }

    function loadWidth() {
        let domElement = [];
        domElement.push(<option></option>);
        for (let i = 1; i < 25; i++) {
            domElement.push(<option>{i}</option>);
        }
        return domElement;
    }

    function loadLength() {
        let domElement = [];
        domElement.push(<option></option>);
        for (let i = 1; i < 301; i++) {
            domElement.push(<option>{i}</option>);
        }
        return domElement;
    }

    function loadColour() {
        let domElement = [];
        domElement.push(<option></option>);
        colourArray.forEach((colour) => {
            domElement.push(<option>{colour.display}</option>);
        });
        return domElement;
    }

    function loadQuantities() {
        let domElement = [];
        domElement.push(<option></option>);
        for (let i = 1; i <= 100; i++) {
            domElement.push(<option>{i}</option>);
        }

        return domElement;
    }

    function LoadSections() {
        let domElement = [];
        for (let i = 0; i < form.sections.length; i++) {
            domElement.push(
                <Card className="m-3">
                    <Card.Header style={{ justifyContent: "flex-end" }}>
                        <Container>
                            <Row>
                                <Col xs={11}>Section {i + 1} </Col>
                                <Col>
                                    {form.sections.length > 1 ? (
                                        <Button onClick={() => removeSection(i)} variant="danger">
                                            x
                                        </Button>
                                    ) : (
                                        <></>
                                    )}
                                </Col>
                            </Row>
                        </Container>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group as={Row} controlId={`formSize${i}`}>
                            <Form.Label className="pr-0" column sm="3">
                                Length (Inches)
                            </Form.Label>
                            <Col sm="3">
                                <Form.Control
                                    as="select"
                                    onChange={(e) => handleChange(e, i)}
                                    name="lengths"
                                    value={form.sections[i].lengths}
                                    required
                                >
                                    {loadLength()}
                                </Form.Control>

                                <Form.Control.Feedback type="invalid">Provide a desired length</Form.Control.Feedback>
                            </Col>
                            <Form.Label className="pr-0" column sm="3">
                                Width (Inches)
                            </Form.Label>
                            <Col sm="3">
                                <Form.Control
                                    as="select"
                                    onChange={(e) => handleChange(e, i)}
                                    name="width"
                                    value={form.sections[i].width}
                                    required
                                >
                                    {loadWidth()}
                                </Form.Control>

                                <Form.Control.Feedback type="invalid">Provide a desired width</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId={`formColourFinish${i}`}>
                            <Form.Label className="pr-0" column sm="3">
                                Colour
                            </Form.Label>
                            <Col sm="3">
                                <Form.Control
                                    as="select"
                                    onChange={(e) => handleChange(e, i)}
                                    name="colour"
                                    value={form.sections[i].colour}
                                    required
                                >
                                    {loadColour()}
                                </Form.Control>

                                <Form.Control.Feedback type="invalid">
                                    Specify the colour for the decal
                                </Form.Control.Feedback>
                            </Col>
                            <Form.Label className="pr-0" column sm="3">
                                Quantity
                            </Form.Label>
                            <Col sm="3">
                                <Form.Control
                                    as="select"
                                    onChange={(e) => handleChange(e, i)}
                                    name="quantity"
                                    value={form.sections[i].quantity}
                                    required
                                >
                                    {loadQuantities()}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Specify the quantity of decals
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId={`formShortDescription${i}`}>
                            <Form.Label className="pr-0" column sm="3">
                                Short Description
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    rows={4}
                                    onChange={(e) => handleChange(e, i)}
                                    name="name"
                                    value={form.sections[i].name}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Provide details for the decal
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId={`formDescription${i}`}>
                            <Form.Label className="pr-0" column sm="3">
                                Description
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    onChange={(e) => handleChange(e, i)}
                                    name="description"
                                    value={form.sections[i].description}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Provide details for the decal
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                    </Card.Body>
                </Card>
            );
        }
        return domElement;
    }

    return (
        <>
            {redirect ? (
                <Redirect to={`/order-confirmation/${orderNumber}`} />
            ) : (
                <>
                    <Jumbotron className="mb-0" fluid>
                        <Container>
                            <Row>
                                <Col>
                                    <h1 style={{ fontSize: "75px", fontWeight: "bold" }}>Custom Order</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>
                                        The custom decal order form is used to place a decal order that is not available
                                        on the catalog. If you are looking to get custom decals made up for your
                                        business, with your own logos, fill out the form below. In order to place your
                                        order, we ask that you fill out the form below to as much detail as you can,
                                        which will help us ensure that we meet your specifications as accurately as
                                        possible. Once you have filled out the form, one of our designers will reach out
                                        to you to clarify/confirm your order before we proceed. <br />
                                        <br />
                                        If you have any questions regarding how to fill out the form or want to specify
                                        more details, please feel free to contact us at{" "}
                                        <a href="mailto:peter@nkggraphics.com">peter@nkggraphics.com. </a>
                                        <br />
                                        We will respond as soon as possible.
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>
                    <Jumbotron className="mb-0" style={{ backgroundColor: "white" }}>
                        <Container>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row className="justify-content-md-center">
                                    <Col xs={10} className="justify-content-md-center">
                                        <Button variant="outline-dark" size="lg" onClick={() => addSection()}>
                                            New Section
                                        </Button>
                                        {LoadSections()}{" "}
                                        {isLogged.isLogged ? (
                                            <Button variant="dark" type="submit" size="lg" block>
                                                Submit for Review
                                            </Button>
                                        ) : (
                                            <Button disabled variant="dark" type="submit" size="lg" block>
                                                Sign in to submit form
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Jumbotron>
                </>
            )}
        </>
    );
}
