const loggedReducer = (state = {}, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return {
                email: action.payload.email,
                isLogged: true,
            };
        case "SIGN_OUT":
            return {
                email: "",
                isLogged: false,
            };
        default:
            return state;
    }
};
export default loggedReducer;
