import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './Contacts.module.css';
import { ContactForm, Filter, ContactList } from '.';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const existing = contacts.find(
      e => e.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (existing) {
      return alert(`${name} is already in contacts`);
    }

    const contact = {
      id: nanoid(10),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
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
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        ({ id: contact_ID }) => contact_ID !== id
      ),
    }));
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
