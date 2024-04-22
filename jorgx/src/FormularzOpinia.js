import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormControl, FormGroup } from 'react-bootstrap';

function FormularzOpinia() {

    const [formData, setFormData] = useState({
        nick: '',
        opinia: '',
        miejsce: 0
      });

    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
          const form = event.target;
          const formDataToSend = new FormData(form);
    
          fetch('https://http://localhost:3000/opinion', {
            method: 'POST',
            body: formDataToSend,
          })
          .then(response => {
            if(response.ok){
            return response.json();
          }else{
            console.log("Wystąpił problem z przetworzeniem żądania.")
          }  
        })
          .then(data => {
            console.log('Dane otrzymane z serwera:', data);
          })
          .catch(error => {
            console.error('Błąd:', error);
          });
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;
    
        if (formData.nick.trim().length < 3 || formData.nick.trim().length > 25) {
          errors.nick = 'Nick musi mieć od 3 do 25 znaków';
          isValid = false;
        }
    
        if (formData.opinia.trim().length < 2 || formData.opinia.trim().length > 250) {
          errors.opinia = 'Wiadomość musi mieć od 2 do 250 znaków';
          isValid = false;
        }
    
        setErrors(errors);
        return isValid;
      };
      

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center kontener">
                <div className="col-md-6 mx-auto my-auto form-opinia">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Nick:</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={formData.nick} 
                                name="nick" 
                                onChange={handleInputChange} 
                                placeholder='Podaj nick'
                                isInvalid={!!errors.nick}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nick}
                            </Form.Control.Feedback>
                        </Form.Group>
  
                        <Form.Group>
                            <Form.Label>Opinia:</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                name="opinia" 
                                value={formData.opinia} 
                                onChange={handleInputChange} 
                                placeholder='Tutaj napisz swoją opinie masz na to 250 znaków !'
                                isInvalid={!!errors.opinia}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.opinia}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br></br>
                        <div>
                        <Button variant="primary" type="submit">
                            Wyślij
                        </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
      );
}

export default FormularzOpinia;
