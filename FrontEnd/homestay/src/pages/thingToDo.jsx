import React from 'react';
import Header from '../component/header';
import Footer from '../component/footer';
import ContactComponent from '../component/contact';

const ThingToDo = () => {
   
    return (
        <div>
            <Header />
            <main>
                <section className='imgThinsToDo'>
                    <div className="thingToDoText container text-white " style={{ zIndex: '2' }}>
                        <div className=' mx-auto d-flex justify-content-between align-items-center'>
                            <p className='fw-bold' style={{ fontSize: '80px', flex: '5' }}>Things to Do</p>
                            <p style={{ fontSize: '20px', flex: '5' }}>Eu quam vulputate mollis vitae egestas facilisi mauris urna faucibus suspendisse at tempor orci felis eu nascetur.</p>
                        </div>
                    </div>
                    <div className='h-100 w-100 bgThings' ></div>
                </section>

                <section className='catba text-center py-5'>
                    <p className='hotelName pt-5'>Khám phá Cát Bà</p>
                    <p className='fw-bold' style={{ fontSize: '25px' }}>Một hòn đảo nằm trong vịnh Hạ Long, một trong những kỳ quan tự nhiên hàng đầu của Việt Nam</p>
                    <p className='' style={{ fontSize: '20px' }}>Mốt số điểm nổi bật: Vẻ đẹp tự nhiên, Vườn quốc gia Cát Bà, Vịnh Lan Hạ...</p>
                    <div className="container pt-5">
                        <div className="row g-4 pt-5">
                            <div className="col-md-6">
                                <img className='rounded h-100 w-100' src="https://static-images.vnncdn.net/files/publish/2022/7/30/vinh-lan-ha-767.jpg" alt="" />
                            </div>
                            <div className="col-md-6 text-start">
                                <p className='hotelName'>01.</p>
                                <p className='fw-bold' style={{ fontSize: '30px' }}>Vịnh Lan Hạ</p>
                                <p className='detailLocation'>Mô tả: Vịnh Lan Hạ là một trong những điểm đến hấp dẫn nhất ở Cát Bà với bãi biển cát trắng mịn và nước biển trong xanh.</p>
                                <p className='detailLocation'>Hoạt động: Du khách có thể tham gia các hoạt động như bơi, chèo kayak, thưởng ngoạn cảnh đẹp của vịnh và tham quan các hang động đáng kinh ngạc.</p>
                            </div>
                        </div>
                        <div className="row g-4 pt-5">
                            <div className="col-md-6 text-start">
                                <p className='hotelName'>02.</p>
                                <p className='fw-bold' style={{ fontSize: '30px' }}>Bãi cát Dứa</p>
                                <p className='detailLocation'>Mô tả: Bãi Cát Dứa là một trong những bãi biển đẹp nhất tại Cát Bà, với cát trắng mịn và nước biển trong xanh.</p>
                                <p className='detailLocation'>Hoạt động: Du khách có thể thưởng ngoạn cảnh đẹp của bãi biển, tắm biển, thư giãn dưới bóng dừa hoặc tham gia các hoạt động vui chơi trên bãi biển.</p>
                            </div>
                            <div className="col-md-6">
                                <img className='rounded h-100 w-100' src="images/baicatdua.png" alt="" />
                            </div>
                        </div>
                        <div className="row g-4 pt-5">
                            <div className="col-md-6">
                                <img className='rounded h-100 w-100' src="https://manmo.vn/wp-content/uploads/2023/08/dao-khi-cat-ba-4.jpg" alt="" />
                            </div>
                            <div className="col-md-6 text-start">
                                <p className='hotelName'>03.</p>
                                <p className='fw-bold' style={{ fontSize: '30px' }}>Đảo khỉ</p>
                                <p className='detailLocation'>Mô tả: Đảo Khỉ là một hòn đảo nhỏ nằm cách bờ biển Cát Bà khoảng 2 km về phía đông nam. Được đặt tên theo hình dáng của đàn khỉ nơi đây. </p>
                                <p className='detailLocation'>Hoạt động: Du khách có thể thuê thuyền từ Cát Bà để đến Đảo Khỉ và khám phá cuộc sống tự nhiên của các loài động vật, đặc biệt là đàn khỉ hoang dã. </p>
                            </div>
                        </div>
                        <div className="row g-4 pt-5">

                            <div className="col-md-6 text-start">
                                <p className='hotelName'>04.</p>
                                <p className='fw-bold' style={{ fontSize: '30px' }}>Vườn Quốc gia Cát Bà</p>
                                <p className='detailLocation'>Mô tả: Vườn quốc gia Cát Bà là một khu bảo tồn thiên nhiên với rừng núi xanh mướt, động vật hoang dã đa dạng và các hệ sinh thái độc đáo.</p>
                                <p className='detailLocation'>Hoạt động: Du khách có thể tham gia các tour trekking để khám phá rừng núi, tham quan các địa điểm du lịch và thưởng ngoạn cảnh đẹp của vườn quốc gia.</p>
                            </div>
                            <div className="col-md-6">
                                <img className='rounded h-100 w-100' src="https://catba.net.vn/wp-content/uploads/2023/07/kham-pha-vuon-quoc-gia-cat-ba-2.jpg" alt="" />
                            </div>
                        </div>
                    </div>

                </section>
                <ContactComponent/>
            </main>
            <Footer />
        </div>
    );
}

export default ThingToDo;
