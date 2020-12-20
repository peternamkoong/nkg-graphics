const cartReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_ITEM":
            const found = state.some(
                (item) =>
                    item.id === action.payload.item.id &&
                    item.size === action.payload.item.size &&
                    item.colour === action.payload.item.colour
            );
            if (!found) {
                return [...state, action.payload.item];
            } else {
                const index = state.findIndex(
                    (item) =>
                        item.id === action.payload.item.id &&
                        item.size === action.payload.item.size &&
                        item.colour === action.payload.item.colour
                );
                const newQuantity = state[index].quantity + action.payload.item.quantity;
                const newItem = {
                    ...action.payload.item,
                    quantity: newQuantity,
                };
                return [...state.slice(0, index), newItem, ...state.slice(index + 1)];
            }
        case "REMOVE_ITEM":
            const removed = state.filter(
                (item) =>
                    item.id !== action.payload.item.id ||
                    item.size !== action.payload.item.size ||
                    item.colour !== action.payload.item.colour
            );
            return removed;
        case "UPDATE_QUANTITY":
            const newItem = {
                ...action.payload.item,
                quantity: action.payload.quantity,
                totalPrice: action.payload.quantity * action.payload.item.unitPrice,
            };
            const index = state.findIndex(
                (item) =>
                    item.id === action.payload.item.id &&
                    item.size === action.payload.item.size &&
                    item.colour === action.payload.item.colour
            );
            return [...state.slice(0, index), newItem, ...state.slice(index + 1)];

        default:
            return state;
    }
};
export default cartReducer;
