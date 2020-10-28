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

class App extends Component {
  state = {
    List: [
      {
        id: uuidv4(),
        name: 'Mila Kunis',
        role: 'Member',
        avatar: '16',
        created: '2013/08/08',
        status: 'Inactive',
        email: 'mila@kunis.com',
        gender: 'women',
      },
      {
        id: uuidv4(),
        name: 'George Clooney',
        role: 'Admin',
        avatar: '42',
        created: '2013/08/08',
        status: 'Active',
        email: 'marlon@brando.com',
        gender: 'men',
      },
      {
        id: uuidv4(),
        name: 'Ryan Gossling',
        role: 'Registered',
        avatar: '44',
        created: '2013/03/03',
        status: 'Banned',
        email: 'jack@nicholson',
        gender: 'men',
      },
      {
        id: uuidv4(),
        name: 'Emma Watson',
        role: 'Registered',
        avatar: '12',
        created: '2004/01/24',
        status: 'Pending',
        email: 'humphrey@bogart.com',
        gender: 'women',
      },
      {
        id: uuidv4(),
        name: 'Robert Downey Jr.',
        role: 'Admin',
        avatar: '3',
        created: '2013/12/31',
        status: 'Active',
        email: 'spencer@tracy',
        gender: 'men',
      },
      {
        id: uuidv4(),
        name: 'Mila Kunis',
        role: 'Admin',
        avatar: '7',
        created: '2013/08/08',
        status: 'Inactive',
        email: 'mila@kunis.com',
        gender: 'women',
      },
      {
        id: uuidv4(),
        name: 'George Clooney',
        role: 'Member',
        avatar: '8',
        created: '2013/08/08',
        status: 'Active',
        email: 'marlon@brando.com',
        gender: 'men',
      },
      {
        id: uuidv4(),
        name: 'Ryan Gossling',
        role: 'Registered',
        avatar: '11',
        created: '2013/03/03',
        status: 'Banned',
        email: 'jack@nicholson',
        gender: 'men',
      },
      {
        id: uuidv4(),
        name: 'Emma Watson',
        role: 'Registered',
        avatar: '10',
        created: '2004/01/24',
        status: 'Pending',
        email: 'humphrey@bogart.com',
        gender: 'women',
      },
      {
        id: uuidv4(),
        name: 'Robert Downey Jr.',
        role: 'Admin',
        avatar: '1',
        created: '2013/12/31',
        status: 'Active',
        email: 'spencer@tracy',
        gender: 'men',
      },
    ],
  }
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <ContactList
                List={this.state.List}
                onToggle={this.toggleStatus}
                onDelite={this.onDelite}
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
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
  toggleStatus = (id) => {
    this.setState({
      List: [...this.state.List].map((user) => {
        if (id === user.id) {
          if (user.status === 'Inactive') user.status = 'Active'
          else if (user.status === 'Active') user.status = 'Banned'
          else if (user.status === 'Banned') user.status = 'Pending'
          else if (user.status === 'Pending') user.status = 'Inactive'
          return user
        }
        return user
      }),
    })
  }
  onDelite = (id) => {
    this.setState({ List: [...this.state.List].filter((elem) => elem.id !== id) })
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
