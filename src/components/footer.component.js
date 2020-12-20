import React from "react";
import { Container, Row } from "react-bootstrap";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { RiMailFill } from "react-icons/ri";

export default function Footer() {
    return (
        <div className="footer">
            <Container>
                <Row className="justify-content-md-center">
                    <a href="https://www.facebook.com/nkggraphics">
                        <FaFacebookSquare size={25} className="m-1" />
                    </a>
                    <a href="https://www.instagram.com/nkggraphics">
                        <FaInstagramSquare size={25} className="m-1" />
                    </a>
                    <a href="mailto:peter@nkggraphics.com">
                        <RiMailFill size={25} className="m-1" />
                    </a>
                </Row>
                <Row className="justify-content-md-center" style={{ color: "grey" }}>
                    <p>&copy; {new Date().getFullYear()} Copyright: NKG Graphics</p>
                </Row>
            </Container>
        </div>
    );
}
