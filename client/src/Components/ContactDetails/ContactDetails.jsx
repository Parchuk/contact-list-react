import React from 'react'
import './ContactDetails.css'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import ContactListService from '../../Services/ContactListServices'
const contactListService = new ContactListService()

const ContactDetails = ({ List }) => {
  let { id: userId } = useParams()
  let currentIem = List.filter((user) => userId === user._id)
  const { avatar, role, name, status, email, created, gender, id } = currentIem[0]
  const URL = `https://api.randomuser.me/portraits/${gender}/${avatar}.jpg`

  let statusStyle = 'label label-default'
  if (status === 'Active') statusStyle = 'label label-success'
  else if (status === 'Inctive') statusStyle = 'label label-default'
  else if (status === 'Banned') statusStyle = 'label label-danger'
  else if (status === 'Pending') statusStyle = 'label label-warning'

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="card rounded">
        <span className={statusStyle} onClick={() => contactListService.toggleStatus(id)}>
          {status}
        </span>
        <div className=" d-block justify-content-center">
          <div className="area1 p-3 py-5"> </div>
          <div className="area2 p- text-center px-3">
            <div className="image mr-3">
              <img src={URL} className="rounded-circle" width="100" alt={gender} />
              <h4 className=" name mt-3 ">{name}</h4>
              <span className="user-subhead">{role}</span>
              <p className="information mt-3 text-justify">
                I'm doing this as a way to practice my design skills,explore different styles and
                have fun.I'm fully aware this challenge doesn't pose my real problem to solve,That's
                why i'm looking for criticism and feedback ,not just likes
              </p>
              <div className="d-flex justify-content-center mt-5">
                <ul className="list-icons">
                  <li className="facebook">
                    <i className="fa fa-facebook"></i>
                  </li>
                  <li className="youtube">
                    <i className="fa fa-youtube"></i>
                  </li>
                  <li className="instagram">
                    <i className="fa fa-instagram"></i>
                  </li>
                  <li className="whatsapp">
                    <i className="fa fa-whatsapp"></i>
                  </li>
                  <li className="pinterest">
                    <i className="fa fa-pinterest"></i>
                  </li>
                </ul>
              </div>
              <Link to="#">{email}</Link>
              <div>
                Created:
                {created}
              </div>
            </div>
          </div>
        </div>
        <Link to="/" className="back-to-home">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = ({ ContactListReducer }) => {
  const { List } = ContactListReducer
  return {
    List,
  }
}

export default connect(mapStateToProps)(ContactDetails)
