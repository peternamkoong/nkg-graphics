import { Jumbotron, Container, Row, Col, Button, Image, Form, Table, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateQuantity } from "../actions/index";
import { useEffect, useState } from "react";

export default function Cart(props) {
    const [message, setMessage] = useState("");
    const [removed, setRemoved] = useState({});
    const [showUpdate, setShowUpdate] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart);

    function handleChange(item, e) {
        const target = e.target;
        dispatch(updateQuantity(item, target.value));
        setShowUpdate(true);
        setMessage(`You have successfully updated the quantity to ${target.value}.`);
    }
    function removeCatalogItem(item) {
        setShowRemove(true);
        setRemoved(item);
        dispatch(removeItem(item));
    }

    function reAddItem() {
        dispatch(addItem(removed));
        setShowRemove(false);
    }

    function removedMessage() {
        let domElement = [];
        domElement.push(
            <p>
                If you did not mean to remove the item, click{" "}
                <Alert.Link href="#" onClick={reAddItem}>
                    here
                </Alert.Link>{" "}
                to bring it back.
            </p>
        );
        return domElement;
    }

    function loadQuantities() {
        let domElement = [];
        for (let i = 1; i <= 100; i++) {
            domElement.push(<option>{i}</option>);
        }
        return domElement;
    }
    useEffect(() => {}, [cartState]);

    function colourFormat(colour) {
        console.log(colour);
        switch (colour) {
            case "#ffffff":
                return "White (#FFFFFF)";
            case "#bbbbbb":
                return "Light Gray (#BBBBBB)";
            case "#666666":
                return "Dark Gray (#666666)";
            case "#000000":
                return "Black (#000000)";
            case "#ff0000":
                return "Red (#FF0000)";
            case "#f900e6":
                return "Pink (#F900E6)";
            case "#aa00f9":
                return "Purple (#AA00F9)";
            case "#0000ff":
                return "Blue (#0000FF)";
            case "#0093ff":
                return "Light Blue (#0093FF)";
            case "#00ffec":
                return "Sky Blue (#00FFEC)";
            case "#00ff00":
                return "Green (#00FF00)";
            case "#008d09":
                return "Dark Green (#008D09)";
            case "#fffb00":
                return "Yellow (#FFFB00)";
            case "#ff8b00":
                return "Orange (#FF8B00)";
            case "#8c4000":
                return "Brown (#8C4000)";
            default:
                return;
        }
    }

    function LoadCart() {
        let domElement = [];
        let i = 1;
        cartState.forEach((item) => {
            console.log("inside");
            domElement.push(
                <tr>
                    <td className="cartTableColumns">{i}</td>
                    <td className="cartTableColumns">
                        <Image src={item.imagePath} width="50px" rounded style={{ borderStyle: "solid" }} />
                    </td>
                    <td className="cartTableColumns">{item.name}</td>
                    <td className="cartTableColumns">
                        <Form>
                            <Form.Group controlId="formQuantity">
                                <Form.Control
                                    onChange={(e) => handleChange(item, e)}
                                    name="quantity"
                                    value={item.quantity}
                                    as="select"
                                >
                                    {loadQuantities()}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </td>
                    <td className="cartTableColumns">{colourFormat(item.colour)}</td>
                    <td className="cartTableColumns">{item.size}</td>
                    <td className="cartTableColumns">${item.unitPrice}</td>
                    <td className="cartTableColumns">${item.totalPrice}</td>
                    <td className="cartTableColumns">
                        <Button variant="warning" onClick={() => removeCatalogItem(item)}>
                            REMOVE
                        </Button>
                    </td>
                </tr>
            );
            i++;
        });

        return domElement;
    }
    return (
        <>
            <Jumbotron className="mb-0" fluid>
                <Container>
                    <Row>
                        <Col>
                            <h1 style={{ fontSize: "75px", fontWeight: "bold" }}>Shopping Cart</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>
                                For any inquiries related to an existing or new order, please fill out the form below.
                                We will try and respond back within 1 to 2 business days.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Container>
                <Alert
                    show={showUpdate}
                    style={{ textAlign: "center" }}
                    onClose={() => setShowUpdate(false)}
                    variant="success"
                    dismissible
                >
                    <Alert.Heading>Update Successful!</Alert.Heading>
                    <p>{message}</p>
                </Alert>
                <Alert
                    show={showRemove}
                    style={{ textAlign: "center" }}
                    onClose={() => setShowRemove(false)}
                    variant="warning"
                    dismissible
                >
                    <Alert.Heading>Item has been removed from the cart.</Alert.Heading>
                    <p>{removedMessage()}</p>
                </Alert>
                <Row>
                    <Col>
                        <Table style={{ width: "100%" }}>
                            <tr>
                                <th width="5%" className="cartTableColumns">
                                    #
                                </th>
                                <th width="5%" className="cartTableColumns">
                                    Image
                                </th>
                                <th width="15%" className="cartTableColumns">
                                    Product Name
                                </th>
                                <th width="10%" className="cartTableColumns">
                                    Quantity
                                </th>
                                <th width="20%" className="cartTableColumns">
                                    Colour
                                </th>
                                <th width="10%" className="cartTableColumns">
                                    Size
                                </th>
                                <th width="5%" className="cartTableColumns">
                                    Unit Price
                                </th>
                                <th width="10%" className="cartTableColumns">
                                    Total
                                </th>
                                <th width="10%" className="cartTableColumns">
                                    Action(s)
                                </th>
                            </tr>
                            {LoadCart()}
                        </Table>
                        <br />
                        <Button variant="dark" href="/checkout" size="lg" block>
                            Proceed to Checkout
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
