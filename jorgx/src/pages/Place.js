import React, { useState } from 'react';
import Header from '.././Header';
import Nav from '.././Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import zle from ".././assets/zle.png";
import dobre from ".././assets/dobre.png";



const Place = () => {



    const [formDataDisplay, setFormDataDisplay] = useState(null);
  
    const handleFormSubmit = (formData) => {
      setFormDataDisplay(formData);
  };



    return (
        <div>
  <Header/>
  <Nav 
  handleFormSubmit={handleFormSubmit}

  />

  <div className="max">
    <div className="row">
      <div className="col-lg-6">
        <aside>
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3C/svg%3E" alt="Placeholder" />

          <h1>
            Średnia Hawajska
          </h1>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <h2>Ocena na podstawie opinii</h2>
          <img src={zle} alt="Placeholder" id='opinia' />
        </aside>
      </div>
      <div className="col-lg-6">
  <div className='wynik' style={{ overflowY: 'auto', maxHeight: '100vh' }}>
          <ul className="list-unstyled" style={{ listStyleType: 'none', padding: 12 }}>
            
            <li>
            <div className="card rounded">
                <div className="card-body">
                    <h3 className='no-decoration'>Okropne</h3>
                    <p className='no-decoration'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec tortor quis lacus vehicula tincidunt. Vestibulum pharetra felis nec diam tinc</p>
                    <img src={zle} alt="Placeholder" />
                </div>
            </div>
            </li>
            <li>
            <div className="card rounded">
                <div className="card-body">
                    <h3 className='no-decoration'>Okropne</h3>
                    <p className='no-decoration'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec tortor quis lacus vehicula tincidunt. Vestibulum pharetra felis nec diam tinc</p>
                    <img src={zle} alt="Placeholder" />
                </div>
            </div>
            </li>
            <li>
            <div className="card rounded">
                <div className="card-body">
                    <h3 className='no-decoration'>Okropne</h3>
                    <p className='no-decoration'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
</p>
                    <img src={zle} alt="Placeholder" />
                </div>
            </div>
            </li>
            <li>
            <div className="card rounded">
                <div className="card-body">
                    <h3 className='no-decoration'>Okropne</h3>
                    <p className='no-decoration'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec tortor quis lacus vehicula tincidunt. Vestibulum pharetra felis nec diam tinc</p>
                    <img src={zle} alt="Placeholder" />
                </div>
            </div>
            </li>
            <li>
            <div className="card rounded">
                <div className="card-body">
                    <h3 className='no-decoration'>Okropne</h3>
                    <p className='no-decoration'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec tortor quis lacus vehicula tincidunt. Vestibulum pharetra felis nec diam tinc</p>
                    <img src={zle} alt="Placeholder" />
                </div>
            </div>
            </li>
            <li>
            <div className="card rounded">
                <div className="card-body">
                    <h3 className='no-decoration'>Okropne</h3>
                    <p className='no-decoration'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec tortor quis lacus vehicula tincidunt. Vestibulum pharetra felis nec diam tinc</p>
                    <img src={zle} alt="Placeholder" />
                </div>
            </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>


    );
};
 
export default Place;