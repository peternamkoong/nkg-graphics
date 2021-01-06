export const addItem = (catalogItem) => {
    return {
        type: "ADD_ITEM",
        payload: {
            item: catalogItem,
        },
    };
};

export const removeItem = (catalogItem) => {
    return {
        type: "REMOVE_ITEM",
        payload: {
            item: catalogItem,
        },
    };
};

export const updateQuantity = (catalogItem, quantity) => {
    return {
        type: "UPDATE_QUANTITY",
        payload: {
            item: catalogItem,
            quantity: parseInt(quantity),
        },
    };
};

export const signIn = (email) => {
    return {
        type: "SIGN_IN",
        payload: {
            email: email,
        },
    };
};

export const signOut = () => {
    return {
        type: "SIGN_OUT",
    };
};

export const emptyCart = () => {
    return {
        type: "EMPTY_CART",
    };
};

export const filter = (filteredSearch) => {
    return {
        type: "FILTER",
        payload: {
            filter: filteredSearch,
        },
    };
};
