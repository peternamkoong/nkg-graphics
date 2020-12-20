import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NKGNavbar from "./components/navbar.component";
import Footer from "./components/footer.component";
import Catalog from "./components/catalog.component";
import Homepage from "./components/homepage.component";
import Contact from "./components/contact.component";
import Switch from "react-bootstrap/esm/Switch";
import About from "./components/about.component";
import CatalogItem from "./components/catalogItem.component";
import Cart from "./components/cart.component";
import Checkout from "./components/checkout.component";
import ProfileSettings from "./components/profileSettings.component";
import SignIn from "./components/signIn.component";
import SignUp from "./components/signUp.component";

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
                        <Catalog type="Transfer Stickers" />
                    </Route>
                    <Route exact path="/transfer-stickers/:id">
                        <CatalogItem />
                    </Route>
                    <Route exact path="/vinyl-lettering">
                        <Catalog type="Vinyl Lettering" />
                    </Route>
                    <Route exact path="/vinyl-lettering/:id">
                        <CatalogItem id=":id" />
                    </Route>
                    <Route exact path="/die-cut-stickers">
                        <Catalog type="Die-Cut Stickers" />
                    </Route>
                    <Route exact path="/die-cut-stickers/:id">
                        <CatalogItem id=":id" />
                    </Route>
                    <Route exact path="/about">
                        <About />
                    </Route>
                    <Route exact path="/contact">
                        <Contact />
                    </Route>
                    <Route exact path="/cart">
                        <Cart />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout />
                    </Route>
                    <Route exact path="/profile-settings">
                        <ProfileSettings />
                    </Route>
                    <Route exact path="/sign-in">
                        <SignIn />
                    </Route>
                    <Route exact path="/sign-up">
                        <SignUp />
                    </Route>
                </Switch>

                <Footer />
            </div>
        </Router>
    );
}
