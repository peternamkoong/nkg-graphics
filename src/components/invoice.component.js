import { Jumbotron, Container, Row, Col, Card, Table, Image, Spinner } from "react-bootstrap";
import NKG from "../images/NKG Icon.png";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Invoice(props) {
    const [custom, setCustom] = useState(false);
    const [order, setOrder] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const isLogged = useSelector((state) => state.isLogged);
    useEffect(() => {
        axios
            .get("http://localhost:5000/users/getOrder", { params: { email: isLogged.email, orderNumber: props.id } })
            .then((response) => {
                if (response.data[0].orderTotal === "CUSTOM") {
                    setCustom(true);
                }
                setOrder(response.data[0]);
                setIsLoading(false);
            });
    }, []);
    var CAD = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "CAD",
    });
    const GSTPST = [
        {
            province: "AB",
            GST: 5,
            PST: 0,
        },
        {
            province: "BC",
            GST: 5,
            PST: 7,
        },
        {
            province: "MB",
            GST: 5,
            PST: 7,
        },
        {
            province: "NB",
            GST: 15,
            PST: 0,
        },
        {
            province: "NL",
            GST: 15,
            PST: 0,
        },
        {
            province: "NS",
            GST: 15,
            PST: 0,
        },
        {
            province: "NT",
            GST: 5,
            PST: 0,
        },
        {
            province: "NU",
            GST: 5,
            PST: 0,
        },
        {
            province: "ON",
            GST: 13,
            PST: 0,
        },
        {
            province: "PE",
            GST: 15,
            PST: 0,
        },
        {
            province: "QC",
            GST: 5,
            PST: 9.975,
        },
        {
            province: "SK",
            GST: 5,
            PST: 6,
        },
        {
            province: "YT",
            GST: 5,
            PST: 0,
        },
    ];
    function InvoiceHeaders() {
        let domElement = [];
        domElement.push(
            <>
                <tr>
                    <td>
                        <b>Invoice No.:</b>
                    </td>
                    <td>{props.id}</td>
                </tr>
                <tr>
                    <td>
                        <b>Date:</b>
                    </td>
                    <td>{order.orderDate}</td>
                </tr>
            </>
        );
        return domElement;
    }

    function CalculateTotal() {
        let domElement = [];
        let salesPrice = "";
        let salesTax = "";
        const prov = GSTPST.filter((item) => item.province === order.billingAddress.province);
        const provGST = prov[0].GST;
        const provPST = prov[0].PST;
        order.details.forEach((item) => {
            salesPrice += item.totalPrice;
        });
        salesTax += (provGST / 100) * salesPrice + (provPST / 100) * salesPrice;
        if (salesPrice == undefined) {
            domElement.push(
                <tr>
                    <td>CUSTOM</td>
                    <td>CUSTOM</td>
                    <td width="20%" style={{ fontSize: "30px" }}>
                        CUSTOM
                    </td>
                </tr>
            );
        } else {
            domElement.push(
                <tr>
                    <td>{CAD.format(salesPrice)}</td>
                    <td>{CAD.format(salesTax)}</td>
                    <td width="20%" style={{ fontSize: "30px" }}>
                        {order.orderTotal}
                    </td>
                </tr>
            );
        }

        return domElement;
    }
    function LoadCart() {
        let domElement = [];
        order.details.forEach((item) => {
            let size = "";
            let price = "";
            let subtotal = "";
            if (item.size === undefined) {
                size = item.lengths + '" x ' + item.width + '"';
            } else {
                size = item.size;
            }
            if (item.unitPrice === undefined) {
                price = "CUSTOM";
                subtotal = "CUSTOM";
            } else {
                price = CAD.format(item.unitPrice);
                subtotal = CAD.format(item.totalPrice);
            }
            domElement.push(
                <tr style={{ maxHeight: "20px" }}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>

                    <td>{size}</td>
                    <td>{item.colour}</td>
                    <td>{price}</td>
                    <td>{subtotal}</td>
                </tr>
            );
        });
        return domElement;
    }
    return (
        <>
            {isLoading ? (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : (
                <Jumbotron className="mb-0" style={{ backgroundColor: "white" }}>
                    <Container>
                        <Row>
                            <Col>
                                <Card style={{ minHeight: "29.7cm" }}>
                                    <Card.Text>
                                        <Container>
                                            <Row>
                                                <Col xs={3}>
                                                    <Image className="m-2" src={NKG} width="200px" />
                                                </Col>
                                                <Col xs={5} />
                                                <Col xs={4}>
                                                    <h3>INVOICE</h3>
                                                    <Table>
                                                        <tbody>{InvoiceHeaders()}</tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                            <Row className="mt-5">
                                                <Col xs={3}>
                                                    <>
                                                        <h5>{order.billingAddress.billingName}</h5>
                                                        <p>
                                                            {order.billingAddress.address}
                                                            <br />
                                                            {order.billingAddress.city}, {order.billingAddress.province}
                                                            , {order.billingAddress.postalCode}
                                                            <br />
                                                            {order.billingAddress.phone}
                                                        </p>
                                                    </>
                                                </Col>
                                                <Col xs={6} />
                                                <Col xs={3}>
                                                    <h5>NKG Graphics</h5>
                                                    <p>
                                                        123 NKG Graphics Road SW
                                                        <br />
                                                        Calgary, AB, T3H N1N
                                                        <br />
                                                        403-903-9827
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row style={{ minHeight: "17cm" }}>
                                                <Col>
                                                    <Table>
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Quantity</th>
                                                                <th>Size</th>
                                                                <th>Colour</th>
                                                                <th>Unit Price</th>
                                                                <th>Subtotal</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>{LoadCart()}</tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col style={{ textAlign: "center" }}>
                                                    {custom ? (
                                                        <h1>CUSTOM ORDER</h1>
                                                    ) : (
                                                        <Table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Sales Price</th>
                                                                    <th>Sales Tax</th>
                                                                    <th>Total</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>{CalculateTotal()}</tbody>
                                                        </Table>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Card.Text>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            )}
        </>
    );
}
