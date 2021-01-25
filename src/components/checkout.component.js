import { Jumbotron, Container, Row, Col, Form, Table, Image, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { emptyCart } from "../actions";

export default function Checkout(props) {
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
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
    const [grandTotalBeforeTax, setGrandTotalBeforeTax] = useState(0);
    const [profile, setProfile] = useState({});
    const [GST, setGST] = useState(5);
    const [GSTPrice, setGSTPrice] = useState(0.0);
    const [PSTPrice, setPSTPrice] = useState(0.0);
    const [PST, setPST] = useState(0);
    const cartState = useSelector((state) => state.cart);
    const isLogged = useSelector((state) => state.isLogged);
    const [orderTotal, setOrderTotal] = useState("");
    const [orderNumber, setOrderNumber] = useState("");
    const [redirect, setRedirect] = useState(false);
    const counter = useSelector((state) => {
        let i = 0;
        state.cart.forEach((item) => {
            i += item.quantity;
        });
        return i;
    });
    const [billing, setBilling] = useState({
        billingName: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        phone: "",
    });
    const [payment, setPayment] = useState({
        paymentName: "",
        cardNumber: "",
        month: "",
        year: "",
        code: "",
    });

    useEffect(() => {
        let total = 0;
        cartState.forEach((item) => {
            total += item.totalPrice;
        });
        setGrandTotalBeforeTax(total);
        axios.get("http://localhost:5000/users/getUser", { params: { email: isLogged.email } }).then((response) => {
            const profile = response.data[0];
            setProfile(profile);
            setBilling({
                billingName: profile.billingAddress.billingName,
                address: profile.billingAddress.address,
                city: profile.billingAddress.city,
                province: profile.billingAddress.province,
                postalCode: profile.billingAddress.postalCode,
                phone: profile.billingAddress.phone,
            });
            setPayment({
                paymentName: profile.paymentMethod.paymentName,
                cardNumber: profile.paymentMethod.cardNumber,
                month: profile.paymentMethod.month,
                year: profile.paymentMethod.year,
                code: profile.paymentMethod.code,
            });
            const prov = GSTPST.filter((item) => item.province === profile.billingAddress.province);
            let provGST = 0;
            let provPST = 0;
            if (prov[0]) {
                provGST = prov[0].GST;
                provPST = prov[0].PST;
            }

            const provGSTPrice = (provGST / 100) * total;
            const provPSTPrice = (provPST / 100) * total;
            const provOrderTotal = CAD.format(total + provGSTPrice + provPSTPrice);
            setGST(provGST);
            setPST(provPST);
            setGSTPrice(provGSTPrice);
            setPSTPrice(provPSTPrice);
            setOrderTotal(provOrderTotal);
        });
    }, grandTotalBeforeTax);

    function handleBillingChange(e) {
        const target = e.target;
        const name = target.name;
        setBilling({
            ...billing,
            [name]: target.value,
        });
        if (name === "province") {
            const prov = GSTPST.filter((item) => item.province === target.value);
            const provGST = prov[0].GST;
            const provPST = prov[0].PST;
            const provGSTPrice = (provGST / 100) * grandTotalBeforeTax;
            const provPSTPrice = (provPST / 100) * grandTotalBeforeTax;
            const provOrderTotal = CAD.format(grandTotalBeforeTax + provGSTPrice + provPSTPrice);
            setGST(provGST);
            setPST(provPST);
            setGSTPrice(provGSTPrice);
            setPSTPrice(provPSTPrice);
            setOrderTotal(provOrderTotal);
        }
    }

    function handlePaymentChange(e) {
        const target = e.target;
        const name = target.name;
        setPayment({
            ...billing,
            [name]: target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            let orderState = {
                billingAddress: billing,
                paymentMethod: payment,
                orderQuantity: counter,
                orderTotal: orderTotal,
            };
            axios
                .put("http://localhost:5000/users/updateCatalogOrders", {
                    email: isLogged.email,
                    order: orderState,
                    cart: cartState,
                })
                .then((response) => {
                    setOrderNumber(response.data);
                    setBilling({
                        billingName: "",
                        address: "",
                        city: "",
                        province: "",
                        postalCode: "",
                        phone: "",
                    });
                    setPayment({
                        paymentName: "",
                        cardNumber: "",
                        month: "",
                        year: "",
                        code: "",
                    });
                    dispatch(emptyCart());
                    setRedirect(true);
                });
        }
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
                                    <h1 style={{ fontSize: "75px", fontWeight: "bold" }}>Review your Order</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>
                                        Please confirm your billing address, payment method, and the order summary
                                        before placing your order. Once the order has been placed, you will receive an
                                        email confirmation, followed by a date/time when you can come to pickup your
                                        order.
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>

                    <Container>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mt-3" style={{ border: "1px solid black", borderRadius: "20px" }}>
                                <Col xs={6}>
                                    <b>Billing Address</b>

                                    <Form.Group as={Row} controlId="formBillingName">
                                        <Form.Label className="pr-0" column sm="3">
                                            Full Name
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control
                                                onChange={handleBillingChange}
                                                name="billingName"
                                                value={billing.billingName}
                                                placeholder="Joe Adams"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide your name
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formBillingAddress">
                                        <Form.Label column sm="3">
                                            Address
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control
                                                onChange={handleBillingChange}
                                                name="address"
                                                value={billing.address}
                                                placeholder="123 Common Street SW"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide your address
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formBillingCityProvince">
                                        <Form.Label column sm="3">
                                            City
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control
                                                onChange={handleBillingChange}
                                                name="city"
                                                value={billing.city}
                                                placeholder="Calgary"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide your city
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Form.Label column sm="3">
                                            Province
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control
                                                onChange={handleBillingChange}
                                                name="province"
                                                value={billing.province}
                                                as="select"
                                                required
                                            >
                                                <option></option>
                                                {GSTPST.map((prov) => (
                                                    <option>{prov.province}</option>
                                                ))}
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide your province
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formBillingPostalCodePhone">
                                        <Form.Label className="pr-0" column sm="3">
                                            Postal Code
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control
                                                onChange={handleBillingChange}
                                                name="postalCode"
                                                value={billing.postalCode}
                                                placeholder="A1A 1A1"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide your postal code
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Form.Label column sm="2">
                                            Phone
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control
                                                onChange={handleBillingChange}
                                                name="phone"
                                                value={billing.phone}
                                                placeholder="(403) 000-0000"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide your phone number
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <b>Payment Method</b>
                                    <Form.Group as={Row} controlId="formPaymentName">
                                        <Form.Label column sm="4">
                                            Cardholder's Name:
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control
                                                onChange={handlePaymentChange}
                                                name="fullName"
                                                value={payment.paymentName}
                                                placeholder="Joe Adams"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide your name
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPaymentNumber">
                                        <Form.Label column sm="4">
                                            Card Number:
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control
                                                onChange={handlePaymentChange}
                                                name="cardNumber"
                                                value={payment.cardNumber}
                                                placeholder="1111-2222-3333-4444"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide your credit card number
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPaymentExpiration">
                                        <Form.Label column sm="4">
                                            Date (MM/YY):
                                        </Form.Label>
                                        <Col>
                                            <Form.Control
                                                onChange={handlePaymentChange}
                                                name="month"
                                                value={payment.month}
                                                as="select"
                                                required
                                            >
                                                <option></option>
                                                <option>01</option>
                                                <option>02</option>
                                                <option>03</option>
                                                <option>04</option>
                                                <option>05</option>
                                                <option>06</option>
                                                <option>07</option>
                                                <option>08</option>
                                                <option>09</option>
                                                <option>10</option>
                                                <option>11</option>
                                                <option>12</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide the expiration month
                                            </Form.Control.Feedback>
                                        </Col>
                                        /
                                        <Col>
                                            <Form.Control
                                                onChange={handlePaymentChange}
                                                name="year"
                                                value={payment.year}
                                                as="select"
                                                required
                                            >
                                                <option></option>
                                                <option>20</option>
                                                <option>21</option>
                                                <option>22</option>
                                                <option>23</option>
                                                <option>24</option>
                                                <option>25</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide the expiration year
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPaymentCode">
                                        <Form.Label column sm="4">
                                            Security Code:
                                        </Form.Label>
                                        <Col>
                                            <Form.Control
                                                onChange={handlePaymentChange}
                                                name="code"
                                                value={payment.code}
                                                required
                                                placeholder="000"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide the security code
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-3" style={{ border: "1px solid black", borderRadius: "20px" }}>
                                    <Table>
                                        <tr>
                                            <th className="cartTableColumns">Image</th>
                                            <th className="cartTableColumns">Name</th>
                                            <th className="cartTableColumns">Quantity</th>
                                            <th className="cartTableColumns">Size</th>
                                            <th className="cartTableColumns">Colour</th>
                                            <th className="cartTableColumns">Unit Price</th>
                                        </tr>
                                        {cartState.map((item) => (
                                            <tr>
                                                <td className="cartTableColumns">
                                                    <Image
                                                        src={item.imagePath}
                                                        width="50px"
                                                        rounded
                                                        style={{ borderStyle: "solid" }}
                                                    />
                                                </td>
                                                <td className="cartTableColumns">
                                                    <b>{item.name}</b>
                                                </td>
                                                <td className="cartTableColumns">{item.quantity}</td>
                                                <td className="cartTableColumns">{item.size}</td>
                                                <td className="cartTableColumns">{item.colour}</td>
                                                <td className="cartTableColumns">{CAD.format(item.unitPrice)}</td>
                                            </tr>
                                        ))}
                                    </Table>
                                </Col>

                                <Col
                                    xs={4}
                                    className="mt-3 ml-3"
                                    style={{ border: "1px solid black", borderRadius: "20px" }}
                                >
                                    <b>Order Summary</b>

                                    <Table>
                                        {cartState.map((item) => (
                                            <tr>
                                                <td>{item.name}</td>
                                                <td style={{ textAlign: "right" }}>{CAD.format(item.totalPrice)}</td>
                                            </tr>
                                        ))}

                                        <tr>
                                            <td>GST ({GST}%):</td>
                                            <td style={{ textAlign: "right" }}>{CAD.format(GSTPrice)}</td>
                                        </tr>
                                        <tr>
                                            <td>PST ({PST}%):</td>
                                            <td style={{ textAlign: "right" }}>{CAD.format(PSTPrice)}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <b>Order Total:</b>
                                            </td>
                                            <td style={{ textAlign: "right" }}>
                                                <b>{orderTotal}</b>
                                            </td>
                                        </tr>
                                    </Table>
                                    <Button type="submit" className="mt-3 mb-3" variant="dark" size="lg" block>
                                        Place Order
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </>
            )}
        </>
    );
}
