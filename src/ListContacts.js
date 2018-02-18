import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'



//if your clas ONLY has a render method, you can simplify your code be re-rendering it as a stateless function
//Stateless functional components only render and don't keep track of any internal state
//REACT components are really just javascript functions that return HTML
/*
function ListContacts(props) {
    return (
      <ol className='contact-list'>
        {props.contacts.map((contact) => (
        <li key={contact.id} className='contact-list-item'>
          <div className='contact-avatar' style={{
              backgroundImage: `url(${contact.avatarURL})`
            }}/>
          <div className='contact-details'>
            <p>{contact.name}</p>
            <p>{contact.email}</p>
          </div>
          <button onClick={() => props.onDeleteContact(contact)} className='contact-remove'>
            Remove
          </button>
        </li>
        ))}
      </ol>
      )
    }
*/

class ListContacts extends Component {

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { contacts, onDeleteContact } = this.props
    const { query } =  this.state

    let showingContacts
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter((contact) => match.test(contact.name))
    } else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    console.log('Props', this.props)
    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search Contacts'
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
            />
          <Link
            to='/create'
            className = 'add-contact'
            >Add Contact
          </Link>
        </div>

        {showingContacts.length !== contacts.length && (
            <div className='showing-contacts'>
              <span>Now showing {showingContacts.length} of {contacts.length} total</span>
              <button onClick={this.clearQuery}>Show All</button>
            </div>
          )}

        <ol className='contact-list'>
          {showingContacts.map((contact) => (
          <li key={contact.id} className='contact-list-item'>
            <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
            <div className='contact-details'>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
              Remove
            </button>
          </li>
          ))}
        </ol>
      </div>
      )
    }
  }

export default ListContacts