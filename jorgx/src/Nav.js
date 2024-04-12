import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Nav({ handleFormSubmit }) {

    const [textInput, setTextInput] = useState('');
    const [option1Checked, setOption1Checked] = useState(false);
    const [option2Checked, setOption2Checked] = useState(false);
    const [option3Checked, setOption3Checked] = useState(false);
    const [isValid, setIsValid] = useState(false);
  
    const handleInputChange = (event) => {
      const value = event.target.value;
      const pattern = /^[a-zA-Z0-9\s\-]+$/;
      const isValidLength = value.length >= 3 && value.length <= 32;
      const isValidInput = pattern.test(value) && isValidLength;
  
      setTextInput(value);
      setIsValid(isValidInput);
    };
  
    const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      switch (name) {
        case 'option1':
          setOption1Checked(checked);
          break;
        case 'option2':
          setOption2Checked(checked);
          break;
        case 'option3':
          setOption3Checked(checked);
          break;
        default:
          break;
      }
    };
  
    const handleReset = () => {
      setTextInput('');
      setOption1Checked(false);
      setOption2Checked(false);
      setOption3Checked(false);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const isAtLeastOneCheckboxChecked = option1Checked || option2Checked || option3Checked;
      if (isValid && isAtLeastOneCheckboxChecked) {
         handleFormSubmit({
          textInput,
          option1Checked,
          option2Checked,
          option3Checked
        });
      } else {
        alert('Wprowadź nazwę z 3 do 32 znaków, bez znaków specjalnych, i zaznacz przynajmniej jeden checkbox!');
      }
    };

    return (
        <nav>
        <Form onSubmit={handleSubmit}>
        <div className="input-container">
          <Form.Group controlId="formBasicText">
            <Form.Control
              type="text"
              id='textinput'
              className={`form-control ${isValid ? '' : 'is-invalid'}`}
              value={textInput}
              onChange={handleInputChange}
              placeholder="Wpisz nazwę / miejscowość / adres"
            />
          </Form.Group>
          <Form.Group >
            <div className='checkbox-label'>
            <Form.Check
              inline
              type="checkbox"
              name="option1"
              checked={option1Checked}
              onChange={handleCheckboxChange}
              label="Wyszukaj po mieście"
            />
            <Form.Check
              inline
              type="checkbox"
              name="option2"
              checked={option2Checked}
              onChange={handleCheckboxChange}
              label="Wyszukaj po adresie"
            />
            <Form.Check
              inline
              type="checkbox"
              name="option3"
              checked={option3Checked}
              onChange={handleCheckboxChange}
              label="Wyszukaj po nazwie"
            />
            </div>
            <br/>
          </Form.Group>
          <Button variant="secondary" className='button' id='reset' onClick={handleReset}>Resetuj</Button>{' '}
          <Button variant="primary"  className='button' id='submit' type="submit">Wyszukaj</Button>
          </div>
        </Form>
        </nav>
    );
}

export default Nav;