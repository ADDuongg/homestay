import React from 'react';



const HotelInfomation = () => {
    
    return (
        <div>
            <section className='hotelInfor my-5 py-5'>
                <div className="container">
                    <p className='fw-bold mb-5' style={{ fontSize: '40px' }}>Hotel Infomation</p>
                    <div className="row g-4">
                        <div className="col-md-3 d-flex">
                            <i className="fa-solid fa-circle-info  iconInfo"></i>
                            <div>
                                <div className='mb-3'>HOTEL ALERT</div>
                                <div>Some hotel features, including vitae, varius ipsum ultrices adipiscing senectus turpis non due to COVID-19.</div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="container">
                                <div className="row g-3">
                                    <div className="col-sm-4 d-flex">
                                        <i className="fa-solid fa-clock iconInfo"></i>
                                        <div>
                                            <div>CHECK-IN</div>
                                            <p>04:00</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 d-flex">
                                        <i className="fa-solid fa-phone iconInfo"></i>
                                        <div>
                                            <div>PHONE NUMBER</div>
                                            <p>0856474699</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 d-flex">
                                        <i className="fa-solid fa-ban-smoking iconInfo"></i>
                                        <div>
                                            <div>NO SMOKING</div>
                                            <p>100% Smoke Free</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 d-flex">
                                        <i className="fa-regular fa-clock iconInfo"></i>
                                        <div>
                                            <div>CHECK-OUT</div>
                                            <p>11:00</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 d-flex">
                                        <i className="fa-solid fa-fax iconInfo"></i>
                                        <div>
                                            <div>FAX NUMBER</div>
                                            <p>(415) 234-5678</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 d-flex">
                                        <i className="fa-solid fa-dog iconInfo"></i>
                                        <div>
                                            <div>PET POLICY</div>
                                            <p>Pet Allowed: Yes</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default HotelInfomation;
