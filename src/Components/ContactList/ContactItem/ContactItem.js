import ContactListService from '../../../Services/ContactListServices';
import { connect } from 'react-redux';

import React from "react";
import { Link } from 'react-router-dom';
const parse = require('html-react-parser');



const contactListService = new ContactListService();


class ContactItem extends React.Component {

  changeBackground = () => {
    let newString = (this.props.name).split('');
    newString = newString.map((l => {
      if (this.props.currentSearchValue.includes(l.toLowerCase())) {
        return `<span class="searchedLetter">${l}</span>`;
      }
      return l;
    }));
    return parse(newString.join(''));

  };

  render() {
    const { name, avatar, role, status, email, created, gender, id } = this.props;
    const URL = `https://api.randomuser.me/portraits/${gender}/${avatar}.jpg`;
    let statusStyle = 'label label-default';
    if (status === 'Active') statusStyle = 'label label-success';
    else if (status === 'Inctive') statusStyle = 'label label-default';
    else if (status === 'Banned') statusStyle = 'label label-danger';
    else if (status === 'Pending') statusStyle = 'label label-warning';

    this.changeBackground();
    if (name.toLowerCase().includes(this.props.currentSearchValue.toLowerCase())) {
      return (
        <tr>
          <td>
            <img src={URL} alt="" />
            <Link className="user-link" to={`/contact-details/${id}`}>
              {this.changeBackground()}
            </Link>
            <span className="user-subhead">{role}</span>
          </td>
          <td>{created}</td>
          <td className="text-center">
            <span className={statusStyle} onClick={() => contactListService.toggleStatus(id)}>{status}</span>
          </td>
          <td>
            <Link to="#">{email}</Link>
          </td>
          <td>
            <Link to={`/contact-details/${id}`} className="table-link">
              <span className="fa-stack">
                <i className="fa fa-square fa-stack-2x"></i>
                <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
              </span>
            </Link>
            <Link to={`/edit-contact`} className="table-link" onClick={() => contactListService.onEdit(id)}>
              <span className="fa-stack">
                <i className="fa fa-square fa-stack-2x"></i>
                <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
              </span>
            </Link>
            <Link to="#" className="table-link danger">
              <span className="fa-stack" onClick={() => contactListService.onDelite(id)}>
                <i className="fa fa-square fa-stack-2x"></i>
                <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
              </span>
            </Link>
          </td>
        </tr >
      );
    } else {
      return false;
    }
  }
}

const mapStateToProps = ({ SearchReducer }) => {
  const { currentSearchValue } = SearchReducer;
  return {
    currentSearchValue,
  };
};


export default connect(mapStateToProps)(ContactItem);

