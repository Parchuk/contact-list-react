// import { v4 as uuidv4 } from 'uuid';
import store from '../Store';
import {
  getContactList,
  setCurrentContact,
} from '../Actions/ContactListActions';

export default class ContactListService {
  DB_URL = 'http://localhost:8000/api/';
  async onSaveData(List, formData = false) {
    if (formData) {
      const list = await fetch(this.DB_URL + 'contacts', {
        method: 'POST',
        body: List,
      })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      return list;
    } else {
      const list = await fetch(this.DB_URL + 'contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(List),
      })
        .then((data) => data)
        .catch((err) => console.log(err));
      return list;
    }
  }

  async onEditData(edetedContact) {
    const contact = await fetch(this.DB_URL + 'contacts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(edetedContact),
    })
      .then((data) => data)
      .catch((err) => console.log(err));
    return contact;
  }

  async onDeleteContact(id) {
    const list = await fetch(this.DB_URL + 'contacts/' + id, {
      method: 'DELETE',
    })
      .then((data) => data)
      .catch((err) => console.log(err));
    return list;
  }

  async updateData() {
    const List = await fetch(this.DB_URL + 'contacts')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.hasOwnProperty('contacts')) {
          return {
            data: [],
          };
        } else {
          return {
            data: data.contacts,
          };
        }
      })
      .catch((err) => console.log(err));
    return List;
  }

  onCreate = (newContact) => {
    this.onSaveData(newContact, true).then((newData) => {
      return newData;
      // const newList = [...store.getState().ContactListReducer.List, newData];
      // console.log(newData);
      // // return store.dispatch(getContactList(newList));
    });

    // this.onSaveData([{
    //   id: uuidv4(),
    //   name: 'Mila Kunis',
    //   role: 'Member',
    //   avatar: '16',
    //   created: '2013/08/08',
    //   status: 'Inactive',
    //   email: 'mila@kunis.com',
    //   gender: 'women',
    // },
    // {
    //   id: uuidv4(),
    //   name: 'George Clooney',
    //   role: 'Admin',
    //   avatar: '42',
    //   created: '2013/08/08',
    //   status: 'Active',
    //   email: 'marlon@brando.com',
    //   gender: 'men',
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Ryan Gossling',
    //   role: 'Registered',
    //   avatar: '44',
    //   created: '2013/03/03',
    //   status: 'Banned',
    //   email: 'jack@nicholson',
    //   gender: 'men',
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Emma Watson',
    //   role: 'Registered',
    //   avatar: '12',
    //   created: '2004/01/24',
    //   status: 'Pending',
    //   email: 'humphrey@bogart.com',
    //   gender: 'women',
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Robert Downey Jr.',
    //   role: 'Admin',
    //   avatar: '3',
    //   created: '2013/12/31',
    //   status: 'Active',
    //   email: 'spencer@tracy',
    //   gender: 'men',
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Mila Kunis',
    //   role: 'Admin',
    //   avatar: '7',
    //   created: '2013/08/08',
    //   status: 'Inactive',
    //   email: 'mila@kunis.com',
    //   gender: 'women',
    // },
    // {
    //   id: uuidv4(),
    //   name: 'George Clooney',
    //   role: 'Member',
    //   avatar: '8',
    //   created: '2013/08/08',
    //   status: 'Active',
    //   email: 'marlon@brando.com',
    //   gender: 'men',
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Ryan Gossling',
    //   role: 'Registered',
    //   avatar: '11',
    //   created: '2013/03/03',
    //   status: 'Banned',
    //   email: 'jack@nicholson',
    //   gender: 'men',
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Emma Watson',
    //   role: 'Registered',
    //   avatar: '10',
    //   created: '2004/01/24',
    //   status: 'Pending',
    //   email: 'humphrey@bogart.com',
    //   gender: 'women',
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Robert Downey Jr.',
    //   role: 'Admin',
    //   avatar: '1',
    //   created: '2013/12/31',
    //   status: 'Active',
    //   email: 'spencer@tracy',
    //   gender: 'men',
    // },]);
  };
  toggleStatus = (id) => {
    let newData = [...store.getState().ContactListReducer.List].map((user) => {
      if (id === user._id) {
        if (user.status === 'Inactive') user.status = 'Active';
        else if (user.status === 'Active') user.status = 'Banned';
        else if (user.status === 'Banned') user.status = 'Pending';
        else if (user.status === 'Pending') user.status = 'Inactive';
        return user;
      }
      return user;
    });
    this.onSaveData(newData);
    store.dispatch(getContactList(newData));
  };
  onDelite = (id) => {
    let newData = [...store.getState().ContactListReducer.List].filter(
      (elem) => elem._id !== id
    );
    store.dispatch(getContactList(newData));
    this.onDeleteContact(id);
  };
  onEdit = (id) => {
    const index = [...store.getState().ContactListReducer.List].findIndex(
      (elm) => elm._id === id
    );
    const currentContact = [...store.getState().ContactListReducer.List][index];
    store.dispatch(setCurrentContact([currentContact]));
  };
  onEditCurrentContact = (
    name,
    role,
    avatar,
    status,
    email,
    gender,
    created,
    id
  ) => {
    console.log(id);
    let edetedContact = {
      _id: id,
      name: name,
      role: role,
      avatar: avatar,
      created: created,
      status: status,
      email: email,
      gender: gender,
    };
    const index = [...store.getState().ContactListReducer.List].findIndex(
      (elm) => elm.id === id
    );
    const partOne = [...store.getState().ContactListReducer.List].slice(
      0,
      index
    );
    const partTwo = [...store.getState().ContactListReducer.List].slice(
      index + 1
    );
    const newList = [...partOne, edetedContact, ...partTwo];

    this.onEditData(edetedContact).then((data) => {
      return data;
    });
  };
}
