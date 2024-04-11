import React, { useState, useEffect } from 'react';
import Header from '../component/header';
import Footer from '../component/footer';
import HotelInfomation from '../component/hotelinfomation';
import ContactComponent from '../component/contact';
import http from '../Axios';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
const DetailRoom = () => {
    const params = useParams();
    var user = Cookies.get('user')?JSON.parse(Cookies.get('user')):null;

    const [detailRoom, setDetailRoom] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [showRent, setShowRent] = useState(true);
    const [showDetailRent, setShowDetailRent] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        number: '',
        start_from: '',
        end_at: '',
        adult: 0,
        children: 0,
        note: " "
    });
    
    useEffect(() => {
        async function getRoom() {
            await http.get(`/api/room/${params.id}`)
                .then(res => {
                    setDetailRoom(res.data.detail_room);
                    setFacilities(res.data.room_facilities)
                    if (user && user.name) {
                        setFormData(prev => ({
                            ...prev,
                            fullname: user.name,
                            number: user.number
                        }));
                    }
                })
        }
        getRoom()
    }, [])
    const handleRentClick = () => {
        if (!user) {
            swal("Thông báo", "Vui lòng đăng nhập trước để có thể đặt phòng", "warning");
        }
        else {
            setShowRent(false);
            setShowDetailRent(true);
        }
    };

    const handleCloseClick = () => {
        setShowRent(true);
        setShowDetailRent(false);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        const startDate = new Date(formData.start_from);
        const endDate = new Date(formData.end_at);
        if (startDate >= endDate) {
            swal("Thông báo", "Ngày kết thúc phải sau ngày bắt đầu!", "warning");
            return;
        }
        const totalPeople = parseInt(formData.adult) + parseInt(formData.children);
        if (totalPeople > detailRoom.max_number_people) {
            swal("Thông báo", "Tổng số người thuê vượt quá số lượng cho phép!", "warning");
            return;
        }
        if (detailRoom.status != '0') {
            swal("Thông báo", "Phòng này đã được thuê, vui lòng chọn phòng khác", "warning");
            return;
        }
        const data = {
            ...formData,
            room_id: params.id,
            user_id: user.id,
            note: ''
        };
        http.post('/api/reservation', data)
            .then(res => {
                if(res.data.status === 200){
                    swal("Thông báo", res.data.message, "success");
                    setShowRent(true);
                    setShowDetailRent(false);
                }
                if(res.data.status === 400){
                    swal("Thông báo", res.data.message, "error");
                    setShowRent(true);
                    setShowDetailRent(false);
                }
            })
            .catch(err => {
                /* swal("Thông báo", "Đặt phòng không thành công. Vui lòng thử lại sau!", "error"); */
                console.log(err);
            });
    };

    return (
        <div>
            <Header />
            <main className=''>
                <section className='imgRoom'>
                    <div className="roomText container text-white " style={{ zIndex: '2' }}>
                        <div className='w-75 mx-auto d-flex justify-content-between align-items-center'>
                            <p className='fw-bold' style={{ fontSize: '80px', flex: '5' }}>Rooms</p>
                            <p style={{ fontSize: '25px', flex: '5' }}>Eu quam vulputate mollis vitae egestas facilisi mauris urna faucibus suspendisse at tempor orci felis eu nascetur.</p>
                        </div>
                    </div>
                    <div className='h-100 w-100 bgroom' ></div>
                </section>

                <section className='  pt-5 pb-3'>
                    <div className="container h-100 w-100">
                        <p className='hotelName  text-center' style={{ fontSize: '20px' }}>HT Hotel</p>
                        <p className='fw-bold text-center' style={{ fontSize: '35px' }}>Chi tiết phòng</p>
                        <div className="row mt-5 g-4">
                            <div className='divdetailRoom col-md-7 d-flex justify-content-between'>
                                <h4>Phòng: {detailRoom.name}</h4>
                                <div className='d-flex '><strong>Trạng thái:</strong> {detailRoom.status === 1 ? (<div className='bg-success rounded text-white p-2 ms-3'>Đang thuê</div>) : (<div className='bg-warning rounded p-2 ms-3 text-white'>Đang trống</div>)}</div>
                            </div>
                            <div className="col-md-7 divImageRoom">
                                <div className='w-100 mb-4'>
                                    <img className='w-100 rounded' style={{ maxHeight: '30rem', minHeight: '30rem' }} src={process.env.REACT_APP_IMAGE_PATH + `${detailRoom.image_path}`} alt="" />
                                </div>
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Thông tin phòng
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                            <div className="accordion-body row">
                                                <div className='col-md-6 col-12' >
                                                    <div className='d-flex'>
                                                        <strong> Loại phòng:</strong>
                                                        <p className='ms-3'>
                                                            {detailRoom.type_room === '1' ? <div>Phòng VIP <i className="fa-solid fa-crown text-warning"></i></div> : 'Phòng Thường'}
                                                        </p>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <strong> Số người thuê tối đa:</strong>
                                                        <p className='ms-3'>
                                                            {detailRoom.max_number_people}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className='col-lg-6 col-12'>
                                                    <p className='text-lg-center fw-bold'>Cơ sở vật chất</p>
                                                    <div className="row">
                                                        {facilities.map((facility, fIndex) => (
                                                            facility.room_id === detailRoom.id ?
                                                                <div className='mb-3 col-6' key={fIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <div className='fw-bold me-3' dangerouslySetInnerHTML={{ __html: facility.icon }} />
                                                                    <div> {facility.name}</div>
                                                                </div> :
                                                                null
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Địa điểm
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse " data-bs-parent="#accordionExample">

                                            <div className="accordion-body">

                                                <p>Đắm chìm trong vẻ đẹp hoang sơ và huyền bí của hòn đảo Cát Bà, căn phòng của chúng tôi tại khách sạn là điểm đến hoàn hảo cho những ai muốn khám phá vùng đất nổi tiếng này.</p>
                                                <p>Với vị trí lý tưởng ngay bên cạnh bãi biển tuyệt đẹp và gần các điểm du lịch hàng đầu như Vịnh Lan Hạ và Hang Sơn Đoòng, bạn sẽ được tận hưởng không gian yên tĩnh và cảm giác thư giãn trong căn phòng của chúng tôi.</p>
                                                <p>Căn phòng được thiết kế hiện đại và sang trọng, với trang thiết bị đầy đủ và tiện nghi cao cấp để đảm bảo mọi kỳ nghỉ của bạn trở thành một trải nghiệm đáng nhớ.</p>
                                                <p>Hãy bắt đầu mỗi buổi sáng bằng việc ngắm nhìn bình minh từ ban công, hoặc thư giãn trong không gian thoáng đãng của phòng sau một ngày dày công khám phá.</p>
                                                <p>Với dịch vụ chăm sóc khách hàng chuyên nghiệp và thân thiện, chúng tôi cam kết mang lại cho bạn một kỳ nghỉ không thể quên tại Cát Bà. Hãy để chúng tôi là điểm dừng chân lý tưởng cho chuyến đi của bạn!</p>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                Thông tin liên hệ
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <div><strong>Địa chỉ: </strong> 43 Núi Ngọc, TT. Cát Bà, Cát Hải, Hải Phòng, Việt Nam</div>
                                                <div><strong>Số điện thoại: </strong>0856474699</div>
                                                <div><strong>Email: </strong>aduong@88999gmail.com</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="divRent w-75 mx-auto text-center p-3 rounded " style={{ backgroundColor: '#F9FAFD', display: showRent ? 'block' : 'none' }}>
                                    <p className='fw-bold'>Giá từ {detailRoom.rent_cost} vnd/ngày</p>
                                    <button onClick={handleRentClick} className='btn btn-rent rounded text-white w-100 p-3' style={{ backgroundColor: '#ef6839' }} >Đặt phòng</button>
                                </div>
                                <div className='w-100 text-end divDetailRent' style={{ display: showDetailRent ? 'block' : 'none' }}>
                                    <button onClick={handleCloseClick} type="button" className="btn-close ms-auto"></button>
                                    <form onSubmit={handleSubmit}>
                                        <div className="divDetailRent w-100  p-4 rounded" style={{ backgroundColor: '#F9FAFD', minHeight: '50rem' }}>
                                            <div className=' mb-3'>
                                                <label htmlFor="fullname" className='d-flex form-label'>Họ và tên <div className='text-danger'>*</div></label>
                                                <input type="text" className=' me-3 form-control  ' name='fullname'  value={formData.fullname}  onChange={handleInputChange}  />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="number" className='d-flex form-label '>Số điện thoại <div className='text-danger'>*</div></label>
                                                <input type="text" className='form-control mb-3 ' name='number' value={formData.number} onChange={handleInputChange}  />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="start_from" className='d-flex form-label '>Ngày nhận phòng <div className='text-danger'>*</div></label>
                                                <input type="date" className='form-control mb-3 ' name='start_from' required placeholder='Subject' value={formData.start_from} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="end_at" className='d-flex form-label '>Ngày trả phòng <div className='text-danger'>*</div></label>
                                                <input type="date" className='form-control mb-3 ' name='end_at' required placeholder='Subject' value={formData.end_at} onChange={handleInputChange} />
                                            </div>
                                            <div className=' mb-3'>
                                                <label htmlFor="adult" className='d-flex form-label'>Số người lớn <div className='text-danger'>*</div></label>
                                                <input type="text" className=' me-3 form-control  ' name='adult' onChange={handleInputChange} required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="children" className='d-flex form-label '>Số trẻ em <div className='text-danger'>*</div></label>
                                                <input type="text" className='form-control mb-3 ' name='children' onChange={handleInputChange} required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="note" className='d-flex form-label '>Ghi chú <div className='text-danger'>*</div></label>
                                                <textarea type="text" className='form-control mb-3 inputContactBig' name='note' value={formData.note} onChange={handleInputChange} ></textarea>
                                            </div>
                                            <button onClick={handleSubmit} className='btnsend'>Đặt phòng</button>
                                        </div>
                                    </form>
                                </div>
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

export default DetailRoom;
