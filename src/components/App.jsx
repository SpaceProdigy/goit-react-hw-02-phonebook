import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './Contacts.module.css';
import { ContactForm } from './ContactForm/ContactForm ';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
export class App extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
    filter: PropTypes.string.isRequired,
    addContact: PropTypes.func.isRequired,
    changeFilter: PropTypes.func.isRequired,
    deleteContact: PropTypes.func.isRequired,
  };

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = data => {
    const { contacts } = this.state;
    const existing = contacts.filter(
      e => e.name.trim().toLowerCase() === data.name.trim().toLowerCase()
    );

    if (existing.length > 0) {
      return alert(`${data.name} is already in contacts`);
    }

    const contact = {
      id: nanoid(10),
      ...data,
    };

    this.setState({
      contacts: [...contacts, contact],
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(e =>
      e.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = id => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter(e => e.id !== id);
    console.log(updatedContacts);
    this.setState({ contacts: updatedContacts });
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContact();

    return (
      <section className={css.contacts}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm contactData={this.addContact} />
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList arr={visibleContacts} deleteContact={this.deleteContact} />
      </section>
    );
  }
}
