import react, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Jumbotron, Image, Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { CirclePicker, BlockPicker, GithubPicker } from "react-color";

export default function CatalogItem(props) {
    const [ID, setID] = useState(useParams().id);
    const [quantities, setQuantities] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [item, setItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState({
        quantity: 1,
        size: "5 x 5",
        colour: "#FFFFFF",
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

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:5000/catalog/getCatalogItem", { params: { id: ID } }).then((response) => {
            setItem(response.data);
            console.log(response.data);
            setIsLoading(false);
        });
    }, []);

    function loadQuantities() {
        let domElement = [];
        if (isLoading === false) {
            for (let i = 1; i <= 100; i++) {
                domElement.push(<option>{i}</option>);
            }
        }

        return domElement;
    }
    function loadSizes() {
        let domElement = [];
        if (isLoading === false) {
            item.variant.forEach((size) => {
                domElement.push(<option>{size.height + `" x ` + size.width + `"`}</option>);
            });
        }
        return domElement;
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
        console.log(form);
    }
    return (
        <>
            <Jumbotron className="mb-0">
                <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>{item.type + ": " + item.name}</h1>
            </Jumbotron>
            {isLoading ? (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
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
                                    <Form.Group controlId="formColor">
                                        <Form.Label>Colour</Form.Label>
                                        <BlockPicker
                                            color={form.colour}
                                            value={form.colour}
                                            name="colour"
                                            onChangeComplete={handleChangeColor}
                                            colors={colors}
                                        />
                                    </Form.Group>
                                    <br />
                                    <Form.Group>
                                        <Button type="submit" block>
                                            Add to Cart
                                        </Button>
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
