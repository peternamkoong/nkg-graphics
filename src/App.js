import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Carousel, Row, Col, Jumbotron, Image } from "react-bootstrap";

import NKGNavbar from "./components/navbar.component";
import Footer from "./components/footer.component";
import Catalog from "./components/catalog.component";
import Homepage from "./components/homepage.component";
import Contact from "./components/contact.component";
import Switch from "react-bootstrap/esm/Switch";
import About from "./components/about.component";

export default function App() {
    return (
        <Router>
            <div className="page-container">
                <NKGNavbar />

                <Switch className="p-0">
                    <Route exact path="/">
                        <Homepage />
                    </Route>
                    <Route exact path="/transfer-stickers">
                        <Catalog />
                    </Route>
                    <Route exact path="/vinyl-lettering">
                        <Catalog />
                    </Route>
                    <Route exact path="/die-cut-stickers">
                        <Catalog />
                    </Route>
                    <Route exact path="/about">
                        <About />
                    </Route>
                    <Route exact path="/contact">
                        <Contact />
                    </Route>
                </Switch>

                <Footer />
            </div>
        </Router>
    );
}
