import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { v4 as uuidv4 } from 'uuid'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// Include components
import ContactList from './Components/ContactList/ContactList'
import Header from './Components/Header/Header'
import NotFound from './Components/NotFound/NotFound'
import ContactDetails from './Components/ContactDetails/ContactDetails'
import AddContact from './Components/AddContact/AddContact'
import EditContact from './Components/EditContact/EditContact'

class App extends Component {
  DB_URL = 'https://my-contact-list-2654f.firebaseio.com/contacts.json'

  state = {
    List: [
      // {
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
      // },
    ],
    currentContact: '',
    inputValue: '',
  }
  componentDidMount() {
    this.updateData()
  }

  render() {
    return (
      <Router>
        <Header searchContactValue={this.searchContactValue} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <ContactList
                List={this.state.List}
                onToggle={this.toggleStatus}
                onDelite={this.onDelite}
                onEdit={this.onEdit}
                inputValue={this.state.inputValue}
              />
            )}
          />
          <Route
            path="/contact-details/:id"
            render={({ match }) => {
              let isUser = this.state.List.findIndex((elem) => elem.id === match.params.id)
              if (isUser !== -1) {
                return (
                  <ContactDetails
                    List={this.state.List}
                    userId={match.params.id}
                    onToggle={this.toggleStatus}
                  />
                )
              }
              return <Redirect to="/" />
            }}
          />
          <Route
            path="/edit-contact"
            render={() => (
              <EditContact
                onEditCurrentContact={this.onEditCurrentContact}
                currentContact={this.state.currentContact}
              />
            )}
          />
          <Route
            path="/add-new-contact"
            exact
            render={() => <AddContact onCreate={this.onCreate} />}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }

  onSaveData(List) {
    fetch(this.DB_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(List),
    })
  }
  updateData() {
    fetch(this.DB_URL)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data == null) {
          this.setState({
            List: [],
          })
        } else {
          this.setState({
            List: data,
          })
        }
      })
      .catch((err) => console.log(err))
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
    }
    const newList = [...this.state.List, newContact]
    this.onSaveData(newList)
    this.setState(() => {
      return {
        List: newList,
      }
    })
  }
  toggleStatus = (id) => {
    let newData = [...this.state.List].map((user) => {
      if (id === user.id) {
        if (user.status === 'Inactive') user.status = 'Active'
        else if (user.status === 'Active') user.status = 'Banned'
        else if (user.status === 'Banned') user.status = 'Pending'
        else if (user.status === 'Pending') user.status = 'Inactive'
        return user
      }
      return user
    })
    this.onSaveData(newData)
    this.setState({
      List: newData,
    })
  }
  onDelite = (id) => {
    let newData = [...this.state.List].filter((elem) => elem.id !== id)
    this.onSaveData(newData)
    this.setState({ List: newData })
  }
  onEdit = (id) => {
    const index = this.state.List.findIndex((elm) => elm.id === id)
    const currentContact = this.state.List[index]
    this.setState({ currentContact })
  }
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
    }
    const index = this.state.List.findIndex((elm) => elm.id === id)
    const partOne = this.state.List.slice(0, index)
    const partTwo = this.state.List.slice(index + 1)
    const newList = [...partOne, newContact, ...partTwo]
    this.onSaveData(newList)
    this.setState(() => {
      return { List: newList }
    })
  }
  searchContactValue = (inputValue) => {
    this.setState({ inputValue: inputValue })
    fetch(this.DB_URL)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data == null) {
          this.setState({
            List: [],
          })
        } else {
          let newData = data.filter((contact) => {
            if (contact.name.toLowerCase().includes(this.state.inputValue.toLowerCase())) {
              return contact
            }
          })
          this.setState({
            List: newData,
          })
        }
      })
      .catch((err) => console.log(err))
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
