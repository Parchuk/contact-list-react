import React from "react";
import ContactItem from "./ContactItem/ContactItem";
import { connect } from 'react-redux';


// action 
import { getContactList } from '../../Actions/ContactListActions';

import ContactListService from '../../Services/ContactListServices';
const contactListService = new ContactListService();

class ContactList extends React.Component {

  componentDidMount() {
    const { getContactList } = this.props;
    contactListService
      .updateData()
      .then((data) => {
        getContactList(data.data);
      })
      .catch((err) => console.log(err));
  }


  render() {
    const { List } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-box clearfix">
              <div className="table-responsive">
                <table className="table user-list">
                  <thead>
                    <tr>
                      <th>
                        <span>User</span>
                      </th>
                      <th>
                        <span>Created</span>
                      </th>
                      <th className="text-center">
                        <span>Status</span>
                      </th>
                      <th>
                        <span>Email</span>
                      </th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {List.length !== 0 ? (List.map((item) => {
                      return (
                        <ContactItem
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          role={item.role}
                          avatar={item.avatar}
                          created={item.created}
                          status={item.status}
                          email={item.email}
                          gender={item.gender}
                        />
                      );
                    })) : <tr><td> <h2>Contact list is empty.</h2></td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({ ContactListReducer }) => {
  const { List } = ContactListReducer;
  return {
    List
  };
};

const mapDispatchToProps = {
  getContactList
};


export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
