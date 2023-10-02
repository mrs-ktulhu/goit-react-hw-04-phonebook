import {useState} from 'react';
import { nanoid } from 'nanoid';
import { Container, FormInput, SubmitButton } from './ContactForm.styled';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

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

  return (
    <Container>
      <form >
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
        <SubmitButton type="submit">Add contact</SubmitButton>
      </form>
    </Container>
  );
}

// // export default class ContactForm extends Component {

// handleSubmit = e => {
//   e.preventDefault();

//   const { name, number } = this.state;

//   if (this.props.contacts.some(contact => contact.text === name)) {
//     alert(`${name} is already in contacts.`);
//     this.setState({ name: '' });
//   } else {
//     this.props.onSubmit(name, number);
//     this.setState({ name: '', number: '' });
//   }
// };
//     );
//   }
// // }
