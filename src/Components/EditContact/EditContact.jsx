import ContactListService from '../../Services/ContactListServices'
import { connect } from 'react-redux'

import React from 'react'
import { Redirect } from 'react-router-dom'
// action
import { getContactList, setCurrentContact } from '../../Actions/ContactListActions'
const contactListService = new ContactListService()

class EditContact extends React.Component {
  state = {
    currentContact: this.props.currentContact[0],
    isRedirect: false,
  }

  onSendData = (event) => {
    event.preventDefault()
    const { name, role, avatar, status, email, gender, created, id } = this.state.currentContact
    contactListService.onEditCurrentContact(name, role, avatar, status, email, gender, created, id)
    this.setState({
      isRedirect: true,
    })
  }
  getInputValue = (event) => {
    this.setState({
      currentContact: {
        ...this.props.currentContact[0],
        [event.target.name]: event.target.value,
      },
    })
  }

  render() {
    const { avatar, role, name, status, email, gender } = this.state.currentContact

    if (this.state.isRedirect) {
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <form onSubmit={this.onSendData}>
              <div class="form-group">
                <div>
                  <input
                    value={name}
                    type="text"
                    class="form-control"
                    placeholder="Name"
                    name="name"
                    onChange={this.getInputValue}
                  />
                </div>
              </div>
              <div class="form-group">
                <div>
                  <input
                    value={role}
                    type="text"
                    class="form-control"
                    placeholder="Role"
                    name="role"
                    onChange={this.getInputValue}
                  />
                </div>
              </div>
              <div class="form-group">
                <div>
                  <input
                    value={avatar}
                    type="number"
                    min="1"
                    max="99"
                    class="form-control"
                    placeholder="Avatar"
                    name="avatar"
                    onChange={this.getInputValue}
                  />
                </div>
              </div>
              <div class="form-group">
                <div>
                  <input
                    value={status}
                    type="text"
                    class="form-control"
                    placeholder="Status"
                    name="status"
                    onChange={this.getInputValue}
                  />
                </div>
              </div>

              <div class="form-group">
                <div>
                  <input
                    value={email}
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={this.getInputValue}
                  />
                </div>
              </div>
              <div class="form-group">
                <div>
                  <input
                    value={gender}
                    type="text"
                    class="form-control"
                    placeholder="Gender"
                    name="gender"
                    onChange={this.getInputValue}
                  />
                </div>
              </div>

              <div class="form-group">
                <div>
                  <button type="submit" class="btn btn-default">
                    Edit contact
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-4">
            <img
              src={`https://api.randomuser.me/portraits/${gender}/${avatar}.jpg`}
              style={{ width: '100%' }}
              alt={gender}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ ContactListReducer }) => {
  console.log('mapStateToProps ', ContactListReducer.currentContact)
  const { currentContact } = ContactListReducer
  return {
    currentContact,
  }
}

const mapDispatchToProps = {
  getContactList,
  setCurrentContact,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContact)
