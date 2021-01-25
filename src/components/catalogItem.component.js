import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Jumbotron, Image, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { BlockPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../actions";
import _ from "lodash";
import Loading from "./loading.component";

export default function CatalogItem(props) {
    const isLogged = useSelector((state) => state.isLogged);
    const [ID, setID] = useState(useParams().id);
    const [show, setShow] = useState(false);
    const [item, setItem] = useState({});
    const [form, setForm] = useState({
        id: ID,
        quantity: 1,
        size: '5" x 5"',
        colour: "#ffffff",
        name: "",
        unitPrice: 5,
        totalPrice: 5,
        type: "",
        imagePath: "",
    });
    const colors = [
        "#FFFFFF",
        "#BBBBBB",
        "#666666",
        "#000000",
        "#FF0000",
        "#F900E6",
        "#AA00F9",
        "#0000FF",
        "#0093FF",
        "#00FFEC",
        "#00FF00",
        "#008D09",
        "#FFFB00",
        "#FF8B00",
        "#8C4000",
    ];

    const dispatch = useDispatch();
    useEffect(() => {
        axios.get("http://localhost:5000/catalog/getCatalogItem", { params: { id: ID } }).then((response) => {
            setItem(response.data);
            setForm({
                ...form,
                name: response.data.name,
                type: response.data.type,
                imagePath: response.data.imagePath,
            });
        });
    }, [ID]);

    function loadQuantities() {
        let domElement = [];
        if (_.isEmpty(item) === false) {
            for (let i = 1; i <= 100; i++) {
                domElement.push(<option>{i}</option>);
            }
        }
        return domElement;
    }

    function loadSizes() {
        let domElement = [];
        if (_.isEmpty(item) === false) {
            item.variant.forEach((size) => {
                domElement.push(<option>{`${size.height}" x ${size.width}"`}</option>);
            });
        }
        return domElement;
    }

    function handleChange(e) {
        const target = e.target;
        const name = target.name;
        if (name === "size") {
            const newSize = target.value;
            item.variant.forEach((size) => {
                const itemSize = `${size.height}" x ${size.width}"`;
                if (itemSize === newSize) {
                    setForm({
                        ...form,
                        [name]: target.value,
                        unitPrice: size.price,
                        totalPrice: size.price * form.quantity,
                    });
                }
            });
        } else if (name === "quantity") {
            const newQuantity = target.value;
            setForm({
                ...form,
                [name]: target.value,
                totalPrice: form.unitPrice * newQuantity,
            });
        }
    }

    function handleChangeColor(color, e) {
        console.log(color.hex);
        setForm({
            ...form,
            colour: color.hex,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const newForm = {
            ...form,
            quantity: parseInt(form.quantity),
        };
        dispatch(addItem(newForm));
        handleShow();
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Item Added to Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your item(s) have successfully been added to the cart!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Continue Shopping
                    </Button>
                    <Button variant="primary" href="/cart">
                        Go to Cart
                    </Button>
                </Modal.Footer>
            </Modal>
            <Jumbotron className="mb-0">
                <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>{item.type + ": " + item.name}</h1>
            </Jumbotron>
            {_.isEmpty(item) ? (
                <Loading />
            ) : (
                <Jumbotron className="mb-0" style={{ backgroundColor: "#fbfbfb" }}>
                    <Container>
                        <Row className="align-items-center">
                            <Col xs={4}>
                                <Image src={item.imagePath} width="300px" rounded style={{ borderStyle: "solid" }} />
                            </Col>
                            <Col xs={4}>
                                <p>{item.description}</p>
                            </Col>
                            <Col xs={4} className="justify-content-center">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formQuantity">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control
                                            onChange={handleChange}
                                            name="quantity"
                                            value={form.quantity}
                                            as="select"
                                        >
                                            {loadQuantities()}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formSize">
                                        <Form.Label>Size</Form.Label>
                                        <Form.Control onChange={handleChange} name="size" value={form.size} as="select">
                                            {loadSizes()}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="justify-content-center" controlId="formColor">
                                        <div className="colourDiv" style={{ backgroundColor: "gray" }}>
                                            <Form.Label style={{ color: "white" }}>Colour</Form.Label>
                                            <BlockPicker
                                                color={form.colour}
                                                value={form.colour}
                                                name="colour"
                                                onChangeComplete={handleChangeColor}
                                                colors={colors}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId="formUnitPrice">
                                        <Form.Label>Unit Price</Form.Label>
                                        <Form.Control name="unitPrice" value={"$" + form.unitPrice} disabled />
                                    </Form.Group>
                                    <Form.Group controlId="formTotalPrice">
                                        <Form.Label>Total Price</Form.Label>
                                        <Form.Control name="totalPrice" value={"$" + form.totalPrice} disabled />
                                    </Form.Group>
                                    <br />
                                    <Form.Group>
                                        {isLogged.isLogged ? (
                                            <Button variant="dark" type="submit" block>
                                                Add to Cart
                                            </Button>
                                        ) : (
                                            <Button variant="dark" type="submit" block disabled>
                                                Sign in to add to cart
                                            </Button>
                                        )}
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row className="p-3">
                            <h3>Application Instructions:</h3>
                        </Row>
                        <Row className="pl-5">
                            <table className="instructionsTable">
                                <tr className="instructionsRow">
                                    <td className="instructionSteps">Step 1:</td>
                                    <td>Clean the application area with alcohol or soap & water.</td>
                                </tr>
                                <tr className="instructionsRow">
                                    <td className="instructionSteps">Step 2:</td>
                                    <td>
                                        Using a squeegee or credit card, press firmly on the decal to ensure that the
                                        decal sticks to the application transfer paper.
                                    </td>
                                </tr>
                                <tr className="instructionsRow">
                                    <td className="instructionSteps">Step 3:</td>
                                    <td>
                                        Using two smalls strips of masking/painters tape, tape the top corners of the
                                        decal to the surface and take the time to adjust the position until it is in the
                                        desired location.
                                    </td>
                                </tr>
                                <tr className="instructionsRow">
                                    <td className="instructionSteps">Step 4:</td>
                                    <td>
                                        Using a longer strip of masking/painters tape, place the tape vertically along
                                        the center of the decal and ensure that the ends of the tape are stuck onto the
                                        surface.
                                    </td>
                                </tr>
                                <tr className="instructionsRow">
                                    <td className="instructionSteps">Step 5:</td>
                                    <td>
                                        Removing one of the corner tapes, peel one side of the adhesive tape and decal
                                        away from the backing paper slowly at a 45 degree angle towards the decal until
                                        you reach the center tape.
                                    </td>
                                </tr>
                                <tr className="instructionsRow">
                                    <td className="instructionSteps">Step 6:</td>
                                    <td>
                                        While holding onto the adhesive tape, cut the backing paper that no longer has
                                        the decal.
                                    </td>
                                </tr>
                                <tr className="instructionsRow">
                                    <td className="instructionSteps">Step 7:</td>
                                    <td>
                                        Starting from center-out, slowly squeegee the adhesive tape onto the surface.
                                        Make sure to push firmly to ensure proper adhesion to the surface.
                                    </td>
                                </tr>
                                <tr className="instructionsRow">
                                    <td className="instructionSteps">Step 8:</td>
                                    <td>Remove the other corner and center strips of tape and repeat steps # to #.</td>
                                </tr>
                                <tr className="instructionsRow">
                                    <td className="instructionSteps">Step 9:</td>
                                    <td>
                                        Slowly peel the adhesive tape along the wall until the tape is removed. If the
                                        decal starts to lift as you are peeling, re-apply the tape and add more pressure
                                        with a squeegee.
                                    </td>
                                </tr>
                                <tr className="instructionsRow">
                                    <td className="instructionSteps">Step 10:</td>
                                    <td>Once the tape is removed, it is time to admire your new decal!</td>
                                </tr>
                            </table>
                        </Row>
                    </Container>
                </Jumbotron>
            )}
        </>
    );
}
