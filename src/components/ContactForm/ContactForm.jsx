import {useState, useEffect} from 'react';
import { nanoid } from 'nanoid';
import { Container, FormInput, SubmitButton } from './ContactForm.styled';

const useLocalStorage = (key,defaultValue) => {
  const [state, setState] = useState(()=>{
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });
  useEffect(()=>{
    window.localStorage.setItem(key, JSON.stringify(state));
  },[key, state]);

  return [state, setState];
}

export default function ContactForm({contacts, onSubmit}) {
  const [name, setName] = useLocalStorage('name', '');
  const [number, setNumber] = useLocalStorage('number', '');

  const handleChange = e => {
    const {name, value} = e.target;
    switch(name){
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
  
    if (contacts.some(contact => contact.text === name)) {
      alert(`${name} is already in contacts.`);
      setName('');
    } else {
      onSubmit(name, number);
      setName('');
      setNumber('')
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormInput>
          Name
          <br />
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            id={nanoid()}
            value={name}
            onChange={handleChange}
            required
          />
        </FormInput>
        <br />
        <FormInput>
          Number
          <br />
          <input
            type="tel"
            placeholder="Enter number"
            name="number"
            id={nanoid()}
            value={number}
            onChange={handleChange}
            required
          />
        </FormInput>
        <br />
        <SubmitButton type="submit" >Add contact</SubmitButton>
      </form>
    </Container>
  );
}