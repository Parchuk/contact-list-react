import React from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import './AddContact.css';

import ContactListService from '../../Services/ContactListServices';
const contactListService = new ContactListService();

class AddContact extends React.Component {
  state = {
    isRedirect: false,
  };

  getInputValue = (event) => {
    if (event.target.name === 'avatar') {
      this.setState({
        [event.target.name]: event.target.files[0],
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  };

  onSendData = (event) => {
    event.preventDefault();
    const { name, role, avatar, status, email, gender } = this.state;

    const formData = new FormData();

    formData.append('avatar', avatar);
    formData.append('name', name);
    formData.append('role', role);
    formData.append('status', status);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('created', moment().format('l'));

    contactListService.onCreate(formData);
    this.setState({
      isRedirect: true,
    });
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.onSendData}>
              <div class="form-group">
                <div>
                  <input
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
                    type="file"
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
                    Add contact
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddContact;
