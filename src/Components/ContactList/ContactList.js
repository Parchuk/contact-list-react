import React from "react";
import ContactItem from "./ContactItem/ContactItem";

const ContactList = (props) => {
  const item = props.List.map((item) => {
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
        onClick={props.onToggle}
        onDelite={() => props.onDelite(item.id)}
        onEdit={() => props.onEdit(item.id)}
      />
    );
  });
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
                  {item.length !== 0 ? item : <h2>Contact list is empty.</h2>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactList;
