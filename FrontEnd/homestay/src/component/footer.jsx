import React from 'react';

const Footer = () => {
   
    return (
        <div>
            <section className='footer'>
                <div className="container py-5">
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-3 pe-5">
                            <p className='fw-bold' style={{ fontSize: '25px' }}>HT Hotel</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, odio sit amet ultrices fermentum, magna felis faucibus nunc, non dapibus arcu justo id odio. Duis lacinia auctor nisi, id vestibulum quam aliquam nec.
                            </p>
                            <div className='d-flex'>
                                <i className="fa-brands fa-instagram iconfooter"></i>
                                <i className="fa-solid fa-envelope iconfooter"></i>
                                <i className="fa-brands fa-facebook iconfooter"></i>
                                <i className="fa-brands fa-twitter iconfooter"></i>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <p className='' style={{ fontSize: '25px' }}>Hotel</p>
                            <ul className='p-0' style={{ listStyle: 'none' }}>
                                <li>About Us</li>
                                <li>Reviews</li>
                                <li>Direction</li>
                                <li>News</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <p className='' style={{ fontSize: '25px' }}>Customer Help</p>
                            <ul className='p-0' style={{ listStyle: 'none' }}>
                                <li>Customer Support</li>
                                <li>Guest Feedback</li>
                                <li>Sitemap</li>
                                <li>Responsible Disclosure</li>
                                <li>FAQs</li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <p className='' style={{ fontSize: '25px' }}>Contact</p>
                            <ul className='p-0' style={{ listStyle: 'none' }}>
                                <li>Sea Scape Hotel</li>
                                <li>1234 Market Street,</li>
                                <li>Viet Nam, CA 98765</li>
                                <li>0856474699</li>
                                <li>duong@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        Copyright © 2024 Duong Nguyen | Powered by Duong Nguyen
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;
