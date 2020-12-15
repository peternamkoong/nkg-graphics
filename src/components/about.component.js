import React from "react";
import { Container, Jumbotron, Row, Col, Image } from "react-bootstrap";
import Decalify from "../images/about/decalify.jpg";
import VinylMentality from "../images/about/vinylMentality.jpg";
import NKGGraphics from "../images/about/NKGGraphics.png";
import Headshot from "../images/about/headshot.png";

export default function About(props) {
    return (
        <>
            <Jumbotron className="mb-0" fluid>
                <Container>
                    <Row className="align-items-center">
                        <Col xs={8}>
                            <h1 style={{ fontSize: "75px", fontWeight: "bold" }}>About NKG Graphics</h1>
                            <p>
                                Get to know a bit about the background of who I am and how I got started with NKG
                                Graphics.
                            </p>
                        </Col>
                        <Col>
                            <Image src={Headshot} height="250px" rounded />
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Jumbotron className="mb-0" style={{ backgroundColor: "#fbfbfb" }}>
                <Container>
                    <Row className="align-items-center">
                        <Col xs={8}>
                            <h3 style={{ fontWeight: "bold" }}>How I Started.</h3>
                            <p>
                                I started making decals when I was in high school. I was inspired to start making decals
                                when I bought my first decal online that I stuck onto my macbook. It was a decal of my
                                last name, <i>NAMKOONG</i>. I fell in love with the idea of bringing personalized
                                designs to life! After saving up some money, I bought my first cutter and created a
                                business under the name <b>Decalify</b>. I promoted myself to my friends and family and
                                started to see the potential of this business. At that point, I wanted to expand.
                            </p>
                        </Col>
                        <Col>
                            <Image src={Decalify} height="250px" roundedCircle />
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Jumbotron className="mb-0" style={{ backgroundColor: "#fbfbfb" }}>
                <Container>
                    <Row>
                        <Col>
                            <Image src={VinylMentality} height="250px" roundedCircle />
                        </Col>
                        <Col xs={8}>
                            <h3 style={{ fontWeight: "bold" }}>Next Steps.</h3>
                            <p>
                                After I realized the potential this business could have, I decided to rebrand myself.
                                During this time, I was very interested in hip-hop and how it allowed you to freely
                                express yourself, whether it was through music, dance, and art. The word "mentality" was
                                important to me, as I always felt that you should always be pursuing your dreams and
                                ambitions, no matter how crazy it may seem. With that mindset, I decided to incorporate
                                that word into my craft, and thus <b>Vinyl Mentality</b> was created.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Jumbotron className="mb-0" style={{ backgroundColor: "#fbfbfb" }}>
                <Container>
                    <Row className="align-items-center">
                        <Col xs={8}>
                            <h4 style={{ fontWeight: "bold" }}>Present Day.</h4>
                            <p>
                                As much as I enjoyed the company name <b>Vinyl Mentality</b>, my ambitions changed. I
                                wanted my company to grow and not be limited to a niche market, such as the underground
                                hip-hop scene that I previously had in mind. I wanted my business to be a place where
                                everyone and anyone can go to to get decals. Interests come and go, but I wanted the
                                business to be a part of who I am. Thus, taking using my last name - Namkoong,{" "}
                                <b>NKG Graphics</b> was born.
                            </p>
                        </Col>
                        <Col>
                            <Image src={NKGGraphics} height="250px" roundedCircle />
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </>
    );
}
