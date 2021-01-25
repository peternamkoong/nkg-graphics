import { useState, useEffect } from "react";
import axios from "axios";
import { Jumbotron, Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ProfileSettings(props) {
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
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const isLogged = useSelector((state) => state.isLogged);
    const [id, setId] = useState("");
    const [account, setAccount] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirm: "",
    });
    const [billingAddress, setBillingAddress] = useState({
        billingName: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        phone: "",
    });
    const [paymentMethod, setPaymentMethod] = useState({
        paymentName: "",
        cardNumber: "",
        month: "",
        year: "",
        code: "",
    });
    useEffect(() => {
        axios.get("http://localhost:5000/users/getUser", { params: { email: isLogged.email } }).then((response) => {
            const profile = response.data[0];
            console.log(profile);
            setId(profile._id);
            setAccount({
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                phoneNumber: profile.phoneNumber,
                password: profile.password,
                confirm: profile.password,
            });
            setBillingAddress({
                billingName: profile.billingAddress.billingName,
                address: profile.billingAddress.address,
                city: profile.billingAddress.city,
                province: profile.billingAddress.province,
                postalCode: profile.billingAddress.postalCode,
                phone: profile.billingAddress.phone,
            });

            setPaymentMethod({
                paymentName: profile.paymentMethod.paymentName,
                cardNumber: profile.paymentMethod.cardNumber,
                month: profile.paymentMethod.month,
                year: profile.paymentMethod.year,
                code: profile.paymentMethod.code,
            });
        });
    }, [isLogged.email]);

    function handleAccountChange(e) {
        const target = e.target;
        const name = target.name;
        console.log(target.value);
        setAccount({
            ...account,
            [name]: target.value,
        });
    }

    function handleAccountSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const form2 = e.currentTarget;
        if (form2.checkValidity() === false) {
            setValidated(true);
        } else if (account.password !== account.confirm) {
            setError(true);
        } else {
            setSuccess(true);
            axios.put("http://localhost:5000/users/updateAccount", {
                id: id,
                firstName: account.firstName,
                lastName: account.lastName,
                email: account.email,
                phoneNumber: account.phoneNumber,
                password: account.password,
            });
        }
    }

    function handleBillingChange(e) {
        const target = e.target;
        const name = target.name;
        console.log(target.value);
        setBillingAddress({
            ...billingAddress,
            [name]: target.value,
        });
    }

    function handleBillingSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const form2 = e.currentTarget;
        if (form2.checkValidity() === false) {
            setValidated(true);
        } else {
            setSuccess(true);
            axios.put("http://localhost:5000/users/updateBilling", {
                id: id,
                billingAddress: billingAddress,
            });
        }
    }

    function handlePaymentChange(e) {
        const target = e.target;
        const name = target.name;
        console.log(target.value);
        setPaymentMethod({
            ...paymentMethod,
            [name]: target.value,
        });
    }

    function handlePaymentSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const form2 = e.currentTarget;
        if (form2.checkValidity() === false) {
            setValidated(true);
        } else {
            setSuccess(true);
            axios.put("http://localhost:5000/users/updatePayment", {
                id: id,
                paymentMethod: paymentMethod,
            });
        }
    }

    return (
        <>
            <Jumbotron fluid>
                <Container>
                    <Row>
                        <Col>
                            <h1 style={{ fontSize: "75px", fontWeight: "bold" }}>Profile Settings</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>
                                Use this page to update your account settings, billing address, and preferred payment
                                method.
                            </p>
                        </Col>
                    </Row>
                    <Alert
                        show={success}
                        style={{ textAlign: "center" }}
                        onClose={() => setSuccess(false)}
                        variant="success"
                        dismissible
                    >
                        <Alert.Heading>Update Successful!</Alert.Heading>
                        <p>Saved Successfully</p>
                    </Alert>
                </Container>
            </Jumbotron>
            <Jumbotron className="mb-0" style={{ backgroundColor: "#fbfbfb" }}>
                <Container>
                    <Row>
                        <Col>
                            <b>Account Settings</b>
                        </Col>
                    </Row>
                    <Form noValidate validated={validated} onSubmit={handleAccountSubmit}>
                        <Row>
                            <Col xs="10">
                                <Form.Group as={Row} controlId="formFirstName">
                                    <Form.Label column sm="2">
                                        First Name
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            value={account.firstName}
                                            name="firstName"
                                            onChange={handleAccountChange}
                                            placeholder="Joe"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide your last name
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Form.Label column sm="2">
                                        Last Name
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            value={account.lastName}
                                            name="lastName"
                                            onChange={handleAccountChange}
                                            placeholder="Adams"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide your last name
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formEmail">
                                    <Form.Label column sm="2">
                                        Email Address
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="email"
                                            value={account.email}
                                            onChange={handleAccountChange}
                                            type="email"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a correct email address
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Form.Label column sm="2">
                                        Phone Number
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="phoneNumber"
                                            value={account.phoneNumber}
                                            onChange={handleAccountChange}
                                            type="phone"
                                            placeholder="(403) 000 - 0000"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide your phone number
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPassword">
                                    <Form.Label column sm="2">
                                        Password
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="password"
                                            value={account.password}
                                            onChange={handleAccountChange}
                                            type="password"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your password
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Form.Label column sm="2">
                                        Confirm
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="confirm"
                                            value={account.confirm}
                                            onChange={handleAccountChange}
                                            type="password"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please confirm your password
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col style={{ alignSelf: "center" }}>
                                <Button variant="dark" type="submit" block>
                                    Save Account Changes
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Jumbotron>
            <Jumbotron className="mb-0" style={{ backgroundColor: "#fbfbfb" }}>
                <Container>
                    <Row>
                        <Col>
                            <b>Billing Address Settings</b>
                        </Col>
                    </Row>
                    <Form noValidate validated={validated} onSubmit={handleBillingSubmit}>
                        <Row>
                            <Col xs="10">
                                <Form.Group as={Row} controlId="BillingNamePhone">
                                    <Form.Label column sm="2">
                                        Full Name
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            onChange={handleBillingChange}
                                            name="billingName"
                                            value={billingAddress.billingName}
                                            placeholder="Joe Adams"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide your name
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Form.Label column sm="2">
                                        Phone Number
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            onChange={handleBillingChange}
                                            name="phone"
                                            value={billingAddress.phone}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide your phone number
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="BillingAddressCity">
                                    <Form.Label column sm="2">
                                        Address
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            onChange={handleBillingChange}
                                            name="address"
                                            value={billingAddress.address}
                                            placeholder="123 Common Street SW"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide your address
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Form.Label column sm="2">
                                        City
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            onChange={handleBillingChange}
                                            name="city"
                                            value={billingAddress.city}
                                            placeholder="Calgary"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide your city
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="Billing ProvincePostalCode">
                                    <Form.Label column sm="2">
                                        Province
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            onChange={handleBillingChange}
                                            name="province"
                                            value={billingAddress.province}
                                            as="select"
                                            required
                                        >
                                            <option></option>
                                            {GSTPST.map((prov) => (
                                                <option key={prov.province}>{prov.province}</option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide your province
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Form.Label column sm="2">
                                        Postal Code
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            onChange={handleBillingChange}
                                            name="postalCode"
                                            value={billingAddress.postalCode}
                                            placeholder="A1A 1A1"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide your postal code
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col style={{ alignSelf: "center" }}>
                                <Button variant="dark" type="submit" block>
                                    Save Billing Changes
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Jumbotron>
            <Jumbotron style={{ backgroundColor: "#fbfbfb" }}>
                <Container>
                    <Row>
                        <Col>
                            <b>Payment Method Settings</b>
                        </Col>
                    </Row>
                    <Form noValidate validated={validated} onSubmit={handlePaymentSubmit}>
                        <Row>
                            <Col xs="10">
                                <Form.Group as={Row} controlId="paymentName">
                                    <Form.Label column sm="2">
                                        Cardholder Name
                                    </Form.Label>
                                    <Col>
                                        <Form.Control
                                            onChange={handlePaymentChange}
                                            name="paymentName"
                                            value={paymentMethod.paymentName}
                                            placeholder="Joe Adams"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide your name
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="PaymentCardNumber">
                                    <Form.Label column sm="2">
                                        Card Number
                                    </Form.Label>
                                    <Col>
                                        <Form.Control
                                            onChange={handlePaymentChange}
                                            name="cardNumber"
                                            value={paymentMethod.cardNumber}
                                            placeholder="1111-2222-3333-4444"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide your credit card number
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="PaymentExpirationCVV">
                                    <Form.Label column sm="2">
                                        Date (MM/YY)
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control
                                            onChange={handlePaymentChange}
                                            name="month"
                                            value={paymentMethod.month}
                                            as="select"
                                            required
                                        >
                                            <option></option>
                                            <option key="01">01</option>
                                            <option key="02">02</option>
                                            <option key="03">03</option>
                                            <option key="04">04</option>
                                            <option key="05">05</option>
                                            <option key="06">06</option>
                                            <option key="07">07</option>
                                            <option key="08">08</option>
                                            <option key="09">09</option>
                                            <option key="10">10</option>
                                            <option key="11">11</option>
                                            <option key="12">12</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide the expiration month
                                        </Form.Control.Feedback>
                                    </Col>

                                    <Col sm="2">
                                        <Form.Control
                                            onChange={handlePaymentChange}
                                            name="year"
                                            value={paymentMethod.year}
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
                                    <Form.Label column sm="2">
                                        CVV
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            onChange={handlePaymentChange}
                                            name="code"
                                            value={paymentMethod.code}
                                            required
                                            placeholder="000"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide the security code
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col style={{ alignSelf: "center" }}>
                                <Button variant="dark" type="submit" block>
                                    Save Payment Changes
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Jumbotron>
        </>
    );
}
