import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const Wrap = styled.div`
  margin: 30px 0 0 30px;
`;

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  handleAddContact = (text, number) => {
    this.setState(prevState => ({
      contacts: [{ id: nanoid(), text, number }, ...prevState.contacts],
    }));
  };
  
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  
  componentDidMount () {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if(parsedContacts){
      this.setState({contacts: parsedContacts});
    }
  }

  componentDidUpdate(prevProps,prevState) {

    if (this.state.contacts !== prevState.contacts){
      console.log('Обновились конаткты');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  render() {
    const normalisedFilter = this.state.filter.toLowerCase();

    const filterContacts = this.state.contacts.filter(contact =>
      contact.text.toLowerCase().includes(normalisedFilter)
    );

    return (
      <Wrap>
        <h1>Phonebook</h1>
        <ContactForm contacts={this.state.contacts} onSubmit={this.handleAddContact} />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} changeFilter={this.changeFilter} />
        <ContactList contacts={filterContacts} onDeleteContact={this.deleteContact} />
      </Wrap>
    );
  }
}
