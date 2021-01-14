export const getContactList = (contactList) => {
    return {
        type: 'LOAD_CONTACT_LIST',
        payload: contactList

    };
};

export const setCurrentContact = (currentContact) => {
    return {
        type: 'SET_CURRENT_CONTACT',
        payload: currentContact
    };
};

export const setInputValue = (currentValue) => {
    return {
        type: 'ADD_VALUE_FROM_INPUT',
        payload: currentValue
    };
};

