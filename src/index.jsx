import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from './Store'
import { Provider } from 'react-redux'

// Include components
import ContactList from './Components/ContactList/ContactList'
import Header from './Components/Header/Header'
import NotFound from './Components/NotFound/NotFound'
import ContactDetails from './Components/ContactDetails/ContactDetails'
import AddContact from './Components/AddContact/AddContact'
import EditContact from './Components/EditContact/EditContact'

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <ContactList />} />
          <Route
            path="/contact-details/:id"
            render={({ match }) => {
              return <ContactDetails />
            }}
          />
          <Route path="/edit-contact" render={() => <EditContact />} />
          <Route path="/add-new-contact" exact render={() => <AddContact />} />
          <Route component={NotFound} />
        </Switch>
      </Provider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
