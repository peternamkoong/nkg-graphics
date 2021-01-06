import { Jumbotron, Container, Row, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PastOrders(props) {
    const [orders, setOrders] = useState([]);
    const isLogged = useSelector((state) => state.isLogged);

    useEffect(() => {
        axios.get("http://localhost:5000/users/getUser", { params: { email: isLogged.email } }).then((response) => {
            setOrders(response.data[0].orders);
        });
    }, []);

    function LoadOrders() {
        let domElement = [];
        orders.forEach((order) => {
            domElement.push(
                <tr>
                    <td>{order.orderNumber}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.totalQuantity}</td>
                    <td>{order.orderTotal}</td>
                    <td>
                        <a href={`/order-confirmation/${order.orderNumber}`}>View</a>
                    </td>
                </tr>
            );
        });
        return domElement;
    }

    return (
        <>
            <Jumbotron className="mb-0" fluid>
                <Container>
                    <Row>
                        <Col>
                            <h1 style={{ fontSize: "75px", fontWeight: "bold" }}>Past Orders</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Keep track of all your past orders here.</p>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Jumbotron className="mb-0" style={{ backgroundColor: "white" }}>
                <Container>
                    <Row>
                        <Col>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date Ordered</th>
                                        <th>Total Quantity</th>
                                        <th>Order Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>{LoadOrders()}</tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </>
    );
}
