const filterReducer = (state = "", action) => {
    switch (action.type) {
        case "FILTER":
            return {
                filter: action.payload.filter,
            };
        default:
            return state;
    }
};
export default filterReducer;
