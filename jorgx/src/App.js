import React, { useState } from 'react';
import Header from './Header';

function App() {
  const [textInput, setTextInput] = useState('');
  const [option1Checked, setOption1Checked] = useState(false);
  const [option2Checked, setOption2Checked] = useState(false);
  const [option3Checked, setOption3Checked] = useState(false);
  const [isValid, setIsValid] = useState(true);

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
      alert("Udało się !!!")
    } else {
      alert('Wprowadź nazwę z 3 do 32 znaków, bez znaków specjalnych, i zaznacz przynajmniej jeden checkbox!');
    }
  };

  return (
    <div>
      <Header />
      <section>
        <nav>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                className={`textinput ${isValid ? '' : 'invalid'}`}
                id='textinput'
                value={textInput}
                onChange={handleInputChange}
                placeholder="Wpisz nazwę / miejscowość / adres"
              />
            <label className='checkbox-label'>
              <input
                type="checkbox"
                name="option1"
                checked={option1Checked}
                onChange={handleCheckboxChange}
              />
              Wyszukaj po mieście
            </label>
            <label className='checkbox-label'>
              <input
                type="checkbox"
                name="option2"
                checked={option2Checked}
                onChange={handleCheckboxChange}
              />
              Wyszukaj po adresie
            </label>
            <label className='checkbox-label'>
              <input
                type="checkbox"
                name="option3"
                checked={option3Checked}
                onChange={handleCheckboxChange}
              />
              Wyszukaj po nazwie
            </label>
            </div>
            <button className='button' id='reset' type="button" onClick={handleReset}>Resetuj</button>
            <button className='button' id='submit' type="submit">Wyszukaj</button>
          </form>
        </nav>
      </section>
    </div>
  );
}

export default App;
