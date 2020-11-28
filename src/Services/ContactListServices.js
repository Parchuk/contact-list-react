import { v4 as uuidv4 } from 'uuid';
import store from '../Store';
import { getContactList, setCurrentContact } from '../Actions/ContactListActions';


export default class ContactListService {
  DB_URL = 'https://my-contact-list-2654f.firebaseio.com/contacts.json';
  async onSaveData(List) {
    const list = await fetch(this.DB_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(List),
    }).then(data => data)
      .catch((err) => console.log(err));
    return list;
  }
  async updateData() {
    const List = await fetch(this.DB_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data == null) {
          return {
            data: []
          };
        } else {
          return {
            data
          };
        }
      })
      .catch((err) => console.log(err));
    return List;
  }

  onCreate = (name, role, avatar, status, email, gender) => {
    let newContact = {
      id: uuidv4(),
      name: name,
      role: role,
      avatar: avatar,
      created: Date.now(),
      status: status,
      email: email,
      gender: gender,
    };
    const newList = [...store.getState().ContactListReducer.List, newContact];
    this.onSaveData(newList).then(data => {
      return store.dispatch(getContactList(newList));
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
      if (id === user.id) {
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
    let newData = [...store.getState().ContactListReducer.List].filter((elem) => elem.id !== id);
    this.onSaveData(newData);
    store.dispatch(getContactList(newData));
  };
  onEdit = (id) => {
    const index = [...store.getState().ContactListReducer.List].findIndex((elm) => elm.id === id);
    const currentContact = [...store.getState().ContactListReducer.List][index];
    store.dispatch(setCurrentContact([currentContact]));

  };
  onEditCurrentContact = (name, role, avatar, status, email, gender, created, id) => {
    let newContact = {
      id: id,
      name: name,
      role: role,
      avatar: avatar,
      created: created,
      status: status,
      email: email,
      gender: gender,
    };
    const index = [...store.getState().ContactListReducer.List].findIndex((elm) => elm.id === id);
    const partOne = [...store.getState().ContactListReducer.List].slice(0, index);
    const partTwo = [...store.getState().ContactListReducer.List].slice(index + 1);
    const newList = [...partOne, newContact, ...partTwo];
    this.onSaveData(newList).then(data => {
      return store.dispatch(getContactList(newList));
    });
  };
}
