import React from "react";
import "../App.css";
import { Container, Carousel, Row, Col, Jumbotron, Image } from "react-bootstrap";

import transferSticker from "../images/logo.png";
import vinylLettering from "../images/text.png";
import dieCutStickers from "../images/sticker.png";
import customOrder from "../images/custom.png";

import CarolHotWorks from "../images/carousel/Carol Hotworks.png";
import Hyattstone from "../images/carousel/Hyattstone.png";
import Lawganizer from "../images/carousel/Lawganizer.png";

import Transparent from "../images/Transparent.png";
export default function Homepage(props) {
    return (
        <>
            <Jumbotron className="m-0 p-0" fluid style={{ backgroundColor: "white" }}>
                <Container>
                    <Row>
                        <Col xs={6} className="p-3">
                            <Row>
                                <h1 style={{ fontSize: "75px" }} className="roboto bold mb-3">
                                    Welcome to NKG Graphics!
                                </h1>
                            </Row>
                            <Row>
                                <p className="roboto">
                                    NKG Graphics is a Calgary-based sticker/decal company that specializes in creating
                                    custom products. Order from either an existing product in one of our catalogues or
                                    request for a custom order and we'll turn your designs and illustrations into custom
                                    sticker or decals! With our super fast turnaround time, you will see your products
                                    ready for pick-up in as little as an hour!
                                </p>
                            </Row>
                        </Col>
                        <Col xs={1}></Col>
                        <Col className="align-self-center">
                            <Image src={Transparent} width={400} />
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>

            <Jumbotron>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col>
                            <a href="/transfer-stickers" className="homepage-choice">
                                <Image src={transferSticker} width={150} />
                                <p className="pt-3 roboto">Transfer Stickers</p>
                            </a>
                        </Col>
                        <Col>
                            <a href="/vinyl-lettering" className="homepage-choice">
                                <Image src={vinylLettering} width={150} />
                                <p className="pt-3 roboto">Vinyl Lettering</p>
                            </a>
                        </Col>
                        <Col>
                            <a href="/die-cut-stickers" className="homepage-choice">
                                <Image src={dieCutStickers} width={150} />
                                <p className="pt-3 roboto">Die-Cut Stickers</p>
                            </a>
                        </Col>
                        <Col>
                            <a href="/custom-order" className="homepage-choice">
                                <Image src={customOrder} width={150} />
                                <p className="pt-3 roboto">Custom Orders</p>
                            </a>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Container>
                <Row className="pb-5 justify-content-md-center">
                    <Carousel>
                        <Carousel.Item>
                            <img className="carousel" src={CarolHotWorks} width={1100} />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="carousel" src={Lawganizer} width={1100} />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="carousel" src={Hyattstone} width={1100} />

                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
            </Container>
        </>
    );
}
