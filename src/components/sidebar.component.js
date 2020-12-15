import react, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
export default function SideBar(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (props.type === "Vinyl Lettering") {
            setCategories(["Letters", "Words", "Quotes"]);
        } else if (props.type === "Transfer Stickers") {
            setCategories(["Animals", "Disney Characters"]);
        } else if (props.type === "Die-Cut Stickers") {
            setCategories(["KakaoFriends"]);
        }
    }, []);
    return (
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
    );
}
