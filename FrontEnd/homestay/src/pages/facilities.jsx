import React from 'react';
import Header from '../component/header';
import Footer from '../component/footer';
import HotelInfomation from '../component/hotelinfomation';
import ContactComponent from '../component/contact';

const Facilities = () => {

    return (
        <div>
            <Header />
            <main>
                <section className='imgFacilities'>
                    <div className="FacilitiesText container text-white " style={{ zIndex: '2' }}>
                        <div className=' mx-auto d-flex justify-content-between align-items-center'>
                            <p className='fw-bold' style={{ fontSize: '80px', flex: '5' }}>Facilities</p>
                            <p style={{ fontSize: '20px', flex: '5' }}>Eu quam vulputate mollis vitae egestas facilisi mauris urna faucibus suspendisse at tempor orci felis eu nascetur.</p>
                        </div>
                    </div>
                    <div className='h-100 w-100 bgFacilities' ></div>
                </section>
                <section className='facilities text-center py-5'>
                    <div className='w-50 mx-auto pt-5' style={{ fontSize: '50px', fontWeight: '400px' }}>Facilities to Enhance <div>Your Stay</div></div>
                    <div className='w-50 mx-auto' style={{ fontSize: '20px' }}>Amet, est laoreet mollis ligula luctus nibh bibendum convallis elementum semper scelerisque risus tellus sed gravida.</div>
                    <div className="container  pt-5">
                        <div className="row pt-5 g-4">
                            <div className="col-sm-4 mb-5">
                                <i className="fa-solid fa-wifi iconFacilities mb-4"></i>
                                <div className='' style={{ fontSize: '36px', fontWeight: '400' }}>Free Wi-Fi</div>
                                <p>Magna sagittis faucibus mauris, sit enim varius sem ultricies sed netus tortor tortor fusce.</p>
                            </div>
                            <div className="col-sm-4 mb-5">
                                <i className="fa-solid fa-ban-smoking iconFacilities mb-4"></i>
                                <div className='' style={{ fontSize: '36px', fontWeight: '400' }}>Smoke-Free</div>
                                <p>Magna sagittis faucibus mauris, sit enim varius sem ultricies sed netus tortor tortor fusce.</p>
                            </div>
                            <div className="col-sm-4 mb-5">
                                <i className="fa-solid fa-square-parking iconFacilities mb-4"></i>
                                <div className='' style={{ fontSize: '36px', fontWeight: '400' }}>Free Parking</div>
                                <p>Magna sagittis faucibus mauris, sit enim varius sem ultricies sed netus tortor tortor fusce.</p>
                            </div>
                            <div className="col-sm-4 mb-5">
                                <i className="fa-solid fa-dog iconFacilities mb-4"></i>
                                <div className='' style={{ fontSize: '36px', fontWeight: '400' }}>Pet Friendly</div>
                                <p>Magna sagittis faucibus mauris, sit enim varius sem ultricies sed netus tortor tortor fusce.</p>
                            </div>
                            <div className="col-sm-4 mb-5">
                                <i className="fa-solid fa-bread-slice iconFacilities mb-4"></i>
                                <div className='' style={{ fontSize: '36px', fontWeight: '400' }}>Free Breakfast</div>
                                <p>Magna sagittis faucibus mauris, sit enim varius sem ultricies sed netus tortor tortor fusce.</p>
                            </div>
                            <div className="col-sm-4 mb-5">
                                <i className="fa-solid fa-dumbbell iconFacilities mb-4"></i>
                                <div className='' style={{ fontSize: '36px', fontWeight: '400' }}>Fitness Center</div>
                                <p>Magna sagittis faucibus mauris, sit enim varius sem ultricies sed netus tortor tortor fusce.</p>
                            </div>
                            <div className="col-sm-4 mb-5">
                                <i className="fa-solid fa-tv iconFacilities mb-4"></i>
                                <div className='' style={{ fontSize: '36px', fontWeight: '400' }}>Plasma TV</div>
                                <p>Magna sagittis faucibus mauris, sit enim varius sem ultricies sed netus tortor tortor fusce.</p>
                            </div>
                            <div className="col-sm-4 mb-5">
                                <i className="fa-solid fa-copy iconFacilities mb-4"></i>
                                <div className='' style={{ fontSize: '36px', fontWeight: '400' }}>Copy Machine</div>
                                <p>Magna sagittis faucibus mauris, sit enim varius sem ultricies sed netus tortor tortor fusce.</p>
                            </div>
                            <div className="col-sm-4 mb-5">
                                <i className="fa-solid fa-newspaper iconFacilities mb-4"></i>
                                <div className='' style={{ fontSize: '36px', fontWeight: '400' }}>Weekday Newspaper</div>
                                <p>Magna sagittis faucibus mauris, sit enim varius sem ultricies sed netus tortor tortor fusce.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <HotelInfomation />
                <ContactComponent />
            </main>
            <Footer />
        </div>
    );
}

export default Facilities;
