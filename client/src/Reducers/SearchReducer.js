const initialState = {
    currentSearchValue: ''
};

const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_VALUE_FROM_INPUT':
            return {
                currentSearchValue: action.payload
            };
        default:
            return state;
    }
};

export default SearchReducer;