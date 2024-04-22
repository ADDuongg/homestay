import React from 'react';
import Header from '../component/header';
import Footer from '../component/footer';
import swal from 'sweetalert';
import { useState } from 'react';
const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        swal('Success', 'Your message has been sent!', 'success');
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: ''
        });
    };


    return (
        <div>
            <Header />
            <main>
                <section className='imgContact'>
                    <div className="contactText container text-white " style={{ zIndex: '2' }}>
                        <div className=' mx-auto d-flex justify-content-between align-items-center'>
                            <p className='fw-bold' style={{ fontSize: '80px', flex: '5' }}>Contact Us</p>
                            <p style={{ fontSize: '20px', flex: '5' }}>Eu quam vulputate mollis vitae egestas facilisi mauris urna faucibus suspendisse at tempor orci felis eu nascetur.</p>
                        </div>
                    </div>
                    <div className='h-100 w-100 bgContact' ></div>
                </section>

                <section className='contactUs pb-3'>
                    <div className="container pt-5 pb-5">
                        <div className="row">
                            <div className="col-md-6">
                                <p style={{ fontSize: '55px', fontWeight: '400' }}>Get in Touch</p>
                                <p style={{ fontSize: '20px' }}>Sed volutpat vestibulum, non leo molestie eu justo mauris quis eu, at pretium rutrum amet, mauris euismod eu facilisis enim, at non scelerisque dolor.</p>
                                <div className='d-flex  mt-2'>
                                    <i className="fa-solid fa-location-dot me-4 mt-1 iconFacilities"></i>
                                    <p style={{ fontSize: '20px', fontWeight: '500' }}>123 Beach St, CatBa, CA 1234, VietNam</p>
                                </div>
                                <div className='d-flex  mt-2'>
                                    <i className="fa-solid fa-phone me-4 mt-1 iconFacilities"></i>
                                    <p style={{ fontSize: '20px', fontWeight: '500' }}>0856474699</p>
                                </div>
                                <div className='d-flex  mt-2'>
                                    <i className="fa-solid fa-envelope me-4 mt-1 iconFacilities"></i>
                                    <p style={{ fontSize: '20px', fontWeight: '500' }}>duong@gmail.com</p>
                                </div>
                                <div className='d-flex  mt-2'>
                                    <i className="fa-solid fa-clock me-4 mt-1 iconFacilities"></i>
                                    <p style={{ fontSize: '20px', fontWeight: '500' }}>8:30 AM – 5:30 PM</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14912.190587153604!2d106.64655084924198!3d20.87012969183372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7a463c156bdb%3A0x61eb5d5557ce813d!2zU-G7nyBE4bqndSwgSOG7k25nIELDoG5nLCBI4bqjaSBQaMOybmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1708181622460!5m2!1svi!2s" style={{ border: 0, width: '100%', height: '450px' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='formContact text-start pt-5 w-50 mx-auto'>
                        <p style={{ fontSize: '50px', fontWeight: '400' }}>Send a Message</p>
                        <p className='w-75'>Volutpat eu mauris, arcu, consectetur nulla massa interdum interdum ornare senectus adipiscing eget nibh aliquam.</p>

                        <label htmlFor="" className='d-flex' style={{ fontWeight: '500' }}>Name <div className='text-danger'>*</div></label>
                        <div className='d-flex mb-3'>
                            <input value={formData.firstName} onChange={handleInputChange} type="text" className='w-50 me-3 form-control inputContact ' name='firstName' required placeholder='First name' />
                            <input value={formData.lastName} onChange={handleInputChange} type="text" className='w-50 form-control inputContact' name='lastName' required placeholder='Last name' />
                        </div>
                        <label htmlFor="" className='d-flex ' style={{ fontWeight: '500' }}>Email <div className='text-danger'>*</div></label>
                        <input value={formData.email} onChange={handleInputChange} type="text" className='form-control mb-3 inputContact' name='email' required placeholder='Email' />
                        <label htmlFor="" className='d-flex ' style={{ fontWeight: '500' }}>Subject <div className='text-danger'>*</div></label>
                        <input value={formData.subject} onChange={handleInputChange} type="text" className='form-control mb-3 inputContact' name='subject' required placeholder='Subject' />
                        <label htmlFor="" className='d-flex ' style={{ fontWeight: '500' }}>Comment or Message <div className='text-danger'>*</div></label>
                        <textarea  value={formData.message} onChange={handleInputChange} type="text" className='form-control mb-3 inputContactBig' name='message' required  ></textarea>
                        <button className='btnsend'>Send Message</button>
                    </form>
                </section>

                <section className='contact '>
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
            </main>
            <Footer />
        </div>
    );
}

export default Contact;
