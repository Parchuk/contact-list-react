const initialState = {
    List: [
    ],
    currentContact: []
};

const ContactListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_CONTACT_LIST':
            return {
                List: action.payload
            };
        case 'SET_CURRENT_CONTACT':
            return {
                ...state,
                currentContact: action.payload,
            };
        default:
            return state;
    }
};

export default ContactListReducer;