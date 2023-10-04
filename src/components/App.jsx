import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Wrap } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts'))??[]
  );

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const handleAddContact = (text, number) => {
    setContacts(prevContacts => [{ id: nanoid(), text, number }, ...prevContacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts =>contacts.filter(contact => contact.id !== contactId));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
    },
   [contacts]);

  const normalisedFilter = filter.toLowerCase();

  const filterContacts = contacts.filter(contact =>
    contact.text.toLowerCase().includes(normalisedFilter)
  );

  return (
    <Wrap>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} onSubmit={handleAddContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} changeFilter={changeFilter} />
      <ContactList contacts={filterContacts} onDeleteContact={deleteContact} />
    </Wrap>
  );
}
