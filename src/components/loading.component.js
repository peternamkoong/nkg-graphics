import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loading(props) {
    return (
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    );
}
