import React from 'react';


const ContactComponent = () => {
  
  return (
    <div>
      <section className='contact mt-5'>
        <div className="contactText container text-white " style={{ zIndex: '2' }}>
          <div className='w-75 text-center mx-auto'>
            <p style={{ fontSize: '17px' }}>HOTEL RESERVATION</p>
            <h2 className='fw-bold my-4' style={{ fontSize: '40px' }}>Extra Perks When You Book Directly With Us</h2>
            <p style={{ fontSize: '17px' }}>CALL US NOW:</p>
            <div className='d-flex justify-content-center align-items-center'>
              <i className="fa-solid fa-phone me-3" style={{ fontSize: '43px' }}></i>
              <p style={{ fontSize: '43px' }}>0856474699</p>
            </div>
          </div>
        </div>
        <div className='h-100 w-100 bgcontact' ></div>
      </section>
    </div>
  );
}

export default ContactComponent;
