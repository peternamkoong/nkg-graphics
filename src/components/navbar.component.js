import React, { useState } from "react";
import { Nav, Navbar, NavDropdown, Button, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import NKG from "../images/NKG White 50x50.png";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../actions";

export default function NKGNavbar() {
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => state.isLogged);
    console.log(isLogged);
    const counter = useSelector((state) => {
        let i = 0;
        state.cart.forEach((item) => {
            i += item.quantity;
        });
        return i;
    });
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
                    <Nav.Link href="/about">About Us</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                    {isLogged.isLogged ? (
                        <NavDropdown title="Profile" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile-settings">Profile Settings</NavDropdown.Item>
                            <NavDropdown.Item href="/past-orders">Past Orders</NavDropdown.Item>
                            <NavDropdown.Item href="/" onClick={() => dispatch(signOut())}>
                                Log Out
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <Nav.Link href="/sign-in">Sign In</Nav.Link>
                    )}
                </Nav>
                <Nav>
                    {isLogged.isLogged ? (
                        <Nav.Link href="/cart">
                            <Button variant="light">
                                <FaShoppingCart /> Cart{" "}
                                {counter !== 0 ? (
                                    <Badge show={false} variant="dark">
                                        {counter}
                                    </Badge>
                                ) : (
                                    <></>
                                )}
                            </Button>
                        </Nav.Link>
                    ) : (
                        <></>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
