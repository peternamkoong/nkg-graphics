import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown, Button, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import NKG from "../images/NKG White 50x50.png";

export default function NKGNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">
                <img alt="" src={NKG} width="65"></img> NKG Graphics
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/transfer-stickers">Transfer Stickers</Nav.Link>
                    <Nav.Link href="/vinyl-lettering">Vinyl Lettering</Nav.Link>
                    <Nav.Link href="/die-cut-stickers">Die Cut Stickers</Nav.Link>
                    <Nav.Link href="/custom-order">Custom Order</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown title="Profile" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/profileSettings">Profile Settings</NavDropdown.Item>
                        <NavDropdown.Item>Log out</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/about">About Us</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="cart">
                        <Button>
                            <FaShoppingCart /> Cart <Badge variant="light">9</Badge>
                        </Button>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
