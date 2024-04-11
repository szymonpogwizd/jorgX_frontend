import React, { useState } from 'react';
import Header from './Header';
import Nav from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [formDataDisplay, setFormDataDisplay] = useState(null);

  const handleFormSubmit = (formData) => {
    setFormDataDisplay(formData);
};

  return (
    <div>
      <Header />
      <Nav handleFormSubmit={handleFormSubmit}/>
        {formDataDisplay && (
          <div className="max">
          <div className="row">
            <div className="col-lg-6">
              <aside>
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3C/svg%3E" alt="Placeholder" />
                <h1>{formDataDisplay?.textInput}</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <h2>Ocena na podstwie opinii</h2>
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3C/svg%3E" alt="Placeholder" />
              </aside>
            </div>
            <div className="col-lg-6">
              <div className='wynik row'>
                <div className="col-lg-3">
                  <h1>Co tu się dzieje</h1>
                  <p>Treść pierwszego obiektu</p>
                </div>
                <div className="col-lg-3">
                  <h1>Co tu się dzieje</h1>
                  <p>Treść drugiego obiektu</p>
                </div>
                <div className="col-lg-3">
                  <h1>Co tu się dzieje</h1>
                  <p>Treść trzeciego obiektu</p>
                </div>
                <div className="col-lg-3">
                  <h1>Co tu się dzieje</h1>
                  <p>Treść czwartego obiektu</p>
                </div>
                <div className="col-lg-3">
                  <h1>Co tu się dzieje</h1>
                  <p>Treść czwartego obiektu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        )}
    </div>
  );
}

export default App;
