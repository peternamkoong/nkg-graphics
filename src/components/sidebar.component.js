import { useEffect, useState } from "react";
import { ListGroup, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../actions";
import _ from "lodash";
import Loading from "./loading.component";

export default function SideBar(props) {
    const [categories, setCategories] = useState([]);
    const filteredText = useSelector((state) => state.filter.filter);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(filter(""));
        if (props.type === "Vinyl Lettering") {
            setCategories(["Letters", "Words", "Quotes"]);
        } else if (props.type === "Transfer Stickers") {
            setCategories(["Animals", "Disney Characters"]);
        } else if (props.type === "Die-Cut Stickers") {
            setCategories(["KakaoFriends"]);
        }
    }, [dispatch, props.type]);

    function handleChange(e) {
        const target = e.target;
        dispatch(filter(target.value));
    }
    if (_.isEmpty(categories)) {
        return <Loading />;
    }
    return (
        <>
            <Form.Control
                className="mb-3"
                name="search"
                onChange={handleChange}
                value={filteredText}
                placeholder="Search"
            />
            <ListGroup>
                {categories.map((category) => {
                    return (
                        <ListGroup.Item action onClick={() => props.filterItems(category)}>
                            {category}
                        </ListGroup.Item>
                    );
                })}
                <ListGroup.Item action onClick={() => props.filterItems("")}>
                    All
                </ListGroup.Item>
            </ListGroup>
        </>
    );
}
