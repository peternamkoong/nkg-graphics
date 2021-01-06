import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./sidebar.component";
import { Image, Jumbotron, Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Switch from "react-bootstrap/esm/Switch";
import CatalogItem from "./catalogItem.component";
import { useSelector } from "react-redux";

export default function Catalog(props) {
    const filteredText = useSelector((state) => state.filter.filter);
    const [items, setItems] = useState([]);
    const [path, setPath] = useState("");
    const [type, setType] = useState(props.type);
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let [filteredCatalog, setFilteredCatalog] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:5000/catalog/getAllTypes", { params: { type: type } }).then((response) => {
            setItems(response.data);
            setIsLoading(false);
            setFilteredCatalog(
                response.data.filter((item) => {
                    return item.name.toLowerCase().indexOf(filteredText.toLowerCase()) !== -1;
                })
            );
        });
        if (type === "Transfer Stickers") {
            setImage("logo");
            setPath("/transfer-stickers/");
        } else if (type === "Vinyl Lettering") {
            setImage("text");
            setPath("/vinyl-lettering/");
        } else if (type === "Die-Cut Stickers") {
            setImage("sticker");
            setPath("/die-cut-stickers/");
        }
    }, [filteredText]);

    function filterItems(filter) {
        console.log(filter);
        axios
            .get("http://localhost:5000/catalog/getFilteredType", { params: { type: type, category: filter } })
            .then((response) => {
                setFilteredCatalog(
                    response.data.filter((item) => {
                        return item.name.toLowerCase().indexOf(filteredText.toLowerCase()) !== -1;
                    })
                );
                console.log(response.data);
            });
    }

    return (
        <>
            <Jumbotron className="mb-2" fluid>
                <Container>
                    <Row>
                        <Col xs={9}>
                            <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>{type}</h1>
                        </Col>
                        <Col xs={3}>
                            <Image src={`../images/${image}.png`} height="100px" />
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Container style={{ maxWidth: "100%" }}>
                <Row>
                    <Col xs={3} style={{ boxShadow: "3px 3px 3px #9E9E9E" }}>
                        <SideBar type={type} filterItems={filterItems} />
                    </Col>
                    <Col xs={9}>
                        {isLoading ? (
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        ) : (
                            <Container style={{ maxWidth: "100%" }}>
                                <Row>
                                    {filteredCatalog.map((i) => {
                                        return (
                                            <Col xs={3}>
                                                <Card>
                                                    <Router>
                                                        <Card.Img variant="top" src={`../${i.imagePath}`} />
                                                        <Card.Body>
                                                            <Card.Title>{i.name}</Card.Title>
                                                            <Card.Text>{i.description}</Card.Text>
                                                            <Button
                                                                block
                                                                size="lg"
                                                                href={path + i._id}
                                                                params={{ id: i._id }}
                                                                variant="dark"
                                                            >
                                                                More Details
                                                            </Button>
                                                        </Card.Body>
                                                        <Switch>
                                                            <Route exact path="/transfer-stickers/:id">
                                                                <CatalogItem id={i._id} />
                                                            </Route>
                                                            <Route exact path="/vinyl-lettering/:id">
                                                                <CatalogItem id={i._id} />
                                                            </Route>
                                                            <Route exact path="/die-cut-stickers/:id">
                                                                <CatalogItem id={i._id} />
                                                            </Route>
                                                        </Switch>
                                                    </Router>
                                                </Card>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </Container>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}
