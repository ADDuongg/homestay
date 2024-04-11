import React, { useState, useEffect } from 'react';
import Master from './master';
import http from '../Axios';
import { Link } from 'react-router-dom';
const Admin = () => {
    const [rooms, setRoom] = useState([])
    const [blog, setBlog] = useState([])
    const [reservation, setReservation] = useState([])
    useEffect(() => {
        http.get('/api/getAllRoom')
            .then(res => {
                console.log(res.data);
                setRoom(res.data.rooms);
                setReservation(res.data.reservation);
            });
        http.get('/getAllpost')
        .then(res => {
            setBlog(res.data.posts)
        })
    }, []);

    const getRoomStatus = (roomId) => {
        const reservedRoom = reservation.find(reserve => reserve.room_id === roomId && reserve.status === '3');

        return reservedRoom ? "Đang thuê" : "Đang trống";
    };

    const countAdultsAndChildren = (reservation) => {
        let totalAdults = 0;
        let totalChildren = 0;
        let totalReservation = 0;
        reservation.forEach(reserve => {
            totalAdults += parseInt(reserve.adult);
            totalChildren += parseInt(reserve.children);
            totalReservation = totalAdults + totalChildren
        });

        return totalReservation;
    };
    /* const totalRoom = () => {

    } */
    const getTextColor = (status) => {
        return status === "Đang thuê" ? "text-primary" : "text-warning";
    };
    
    return (

        <Master>
            <div>
                <div className="section mt-5 ">
                    <div className="divAboutAdmin container">
                        <div className="row g-5  justify-content-center">
                            <div className="col-lg-4 col-md-6 shadow d-flex px-4 ms-3 divUser" style={{ height: '8rem', width: '18rem', borderRadius: '15px' }}>
                                <div className='d-flex align-items-center' style={{ flex: 2 }}>
                                    <i className="fa-solid fa-users " style={{ fontSize: '50px' }}></i>
                                </div>
                                <div className='d-flex flex-column justify-content-between py-3 ps-4 h-100' style={{ flex: 8 }}>
                                    <div>
                                        <h5>Users Rent: {countAdultsAndChildren(reservation)}</h5>
                                    </div>
                                    <div className='w-100 d-flex justify-content-start'>
                                        <Link to={'/admin/user'} className='btn btn-success'>Chi tiết <i className="fa-solid fa-arrow-right text-white ms-3"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 shadow d-flex px-4 ms-3 divRoom" style={{ height: '8rem', width: '18rem', borderRadius: '15px' }}>
                                <div className='d-flex align-items-center' style={{ flex: 2 }}>
                                    <i className="fa-solid fa-bed " style={{ fontSize: '50px' }}></i>
                                </div>
                                <div className='d-flex flex-column justify-content-between py-3 ps-4 h-100' style={{ flex: 8 }}>
                                    <div>
                                        <h5>Total Rooms: {rooms.length}</h5>
                                    </div>
                                    <div className='w-100 d-flex justify-content-start'>
                                        <Link to={'/admin/listroom'} className='btn btn-success'>Chi tiết <i className="fa-solid fa-arrow-right text-white ms-3"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 shadow d-flex px-4 ms-3 divOrder" style={{ height: '8rem', width: '18rem', borderRadius: '15px' }}>
                                <div className='d-flex align-items-center' style={{ flex: 2 }}>
                                    <i className="fa-solid fa-bookmark " style={{ fontSize: '50px' }}></i>
                                </div>
                                <div className='d-flex flex-column justify-content-between py-3 ps-4 h-100' style={{ flex: 8 }}>
                                    <div>
                                        <h5>Orders: {reservation.length}</h5>
                                    </div>
                                    <div className='w-100 d-flex justify-content-start'>
                                        <Link to={'/admin/bookroom'} className='btn btn-success'>Chi tiết <i className="fa-solid fa-arrow-right text-white ms-3"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 shadow d-flex px-4 ms-3 divRentAdmin" style={{ height: '8rem', width: '18rem', borderRadius: '15px' }}>
                                <div className='d-flex align-items-center' style={{ flex: 2 }}>
                                    <i className="fa-solid fa-blog " style={{ fontSize: '50px' }}></i>
                                </div>
                                <div className='d-flex flex-column justify-content-between py-3 ps-4 h-100' style={{ flex: 8 }}>
                                    <div>
                                        <h5>Blogs : {blog.length}</h5>
                                    </div>
                                    <div className='w-100 d-flex justify-content-start'>
                                        <Link to={'/admin/post'} className='btn btn-success'>Chi tiết <i className="fa-solid fa-arrow-right text-white ms-3"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='titleAdmin w-100 text-center '>Khách sạn HT Hotel</div>
                        <div className="row floo1 g-5 px-4 justify-content-sm-center justify-content-md-start">
                            <div className='pb-2 border-2 border-bottom fw-bold' style={{ fontSize: '25px' }}>Tầng 1</div>
                            {rooms.map(room => {
                                if (room.floor === 1) {
                                    return (
                                        <React.Fragment key={room.id}>
                                            <div style={{ width: '25rem' }} className=" divRoom col-lg-3 me-md-4 rounded mt-2 shadow col-6 bg-white p-3">
                                                <div className='h-100 w-100'>
                                                    <div className='w-100 text-center'>
                                                        <div style={{ fontSize: '25px' }}><strong>Phòng: </strong>{room.name}</div>
                                                    </div>
                                                    <div className='mt-3 w-100'>
                                                        <div className='start_from'><strong>Giá thuê: </strong>{room.rent_cost}</div>
                                                        <div className='end_at'><strong>Số người thuê tối đa: </strong>{room.max_number_people}</div>
                                                    </div>
                                                    <div className='my-3 status'>
                                                        <div className='d-flex'>
                                                            <strong className='me-3'>Trạng thái: </strong>
                                                            <p className={getTextColor(getRoomStatus(room.id)) + ' fw-bold'}>{getRoomStatus(room.id)}</p>
                                                        </div>

                                                    </div>
                                                    <div className='w-100 text-end'>
                                                        <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target={`#exampleModal${room.id}`}>Chi tiết</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="modal fade" id={`exampleModal${room.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content w-100">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Chi tiết phòng {room.name}</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            {reservation.some(item => item.room_id === room.id) && <h3 className='text-primary '>Phòng đang có người thuê</h3 >}
                                                            <div className='w-100'>
                                                                <img className='w-100' style={{ height: '13rem' }} src={process.env.REACT_APP_IMAGE_PATH + `${room.image_path}`} alt="" />
                                                            </div>

                                                            {reservation.map((item, index) => {
                                                                if (item.room_id === room.id) {
                                                                    
                                                                    return (
                                                                        <div className='w-100' key={index}>
                                                                            <div className='d-flex my-1 gap-2'>
                                                                                <strong>Khách thuê: </strong>
                                                                                <p>{item.fullname}</p>
                                                                            </div>
                                                                            <div className='d-flex mb-1 gap-2'>
                                                                                <strong>Số lượng người thuê: </strong>
                                                                                <p>{parseInt(item.adult) + parseInt(item.children)}</p>
                                                                            </div>
                                                                            <div className='d-flex mb-1 gap-2'>
                                                                                <strong>Ngày thuê phòng: </strong>
                                                                                <p>{item.start_from}</p>
                                                                            </div>
                                                                            <div className='d-flex mb-1 gap-2'>
                                                                                <strong>Ngày trả phòng: </strong>
                                                                                <p>{item.end_at}</p>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            })}
                                                            {!reservation.some(item => item.room_id === room.id) && <h4 className='text-warning mt-3'>Phòng này đang trống</h4 >}

                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                } else {
                                    return null; // Không render phòng không ở tầng 1
                                }
                            })}
                        </div>
                        <div className="row floo1 g-5 px-4  mt-3 justify-content-sm-center justify-content-md-start">
                            <div className='pb-2 border-2 border-bottom fw-bold' style={{ fontSize: '25px' }}>Tầng 2</div>
                            {rooms.map(room => {
                                if (room.floor === 2) {
                                    return (
                                        <React.Fragment key={room.id}>
                                            <div style={{ width: '25rem' }} className=" divRoom col-lg-3 me-md-4 rounded mt-2 shadow col-6 bg-white p-3">
                                                <div className='h-100 w-100'>
                                                    <div className='w-100 text-center'>
                                                        <div style={{ fontSize: '25px' }}><strong>Phòng: </strong>{room.name}</div>
                                                    </div>
                                                    <div className='mt-3 w-100'>
                                                        <div className='start_from'><strong>Giá thuê: </strong>{room.rent_cost}</div>
                                                        <div className='end_at'><strong>Số người thuê tối đa: </strong>{room.max_number_people}</div>
                                                    </div>
                                                    <div className='my-3 status'>
                                                        <div className='d-flex'>
                                                            <strong className='me-3'>Trạng thái: </strong>
                                                            <p className={getTextColor(getRoomStatus(room.id)) + ' fw-bold'}>{getRoomStatus(room.id)}</p>
                                                        </div>

                                                    </div>
                                                    <div className='w-100 text-end'>
                                                        <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target={`#exampleModal${room.id}`}>Chi tiết</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="modal fade" id={`exampleModal${room.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content w-100">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Chi tiết phòng {room.name}</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            {reservation.some(item => item.room_id === room.id) && <h3 className='text-primary '>Phòng đang có người thuê</h3 >}
                                                            <div className='w-100'>
                                                                <img className='w-100' style={{ height: '13rem' }} src={process.env.REACT_APP_IMAGE_PATH + `${room.image_path}`} alt="" />
                                                            </div>

                                                            {reservation.map((item, index) => {
                                                                if (item.room_id === room.id) {
                                                                    
                                                                    return (
                                                                        <div className='w-100' key={index}>
                                                                            <div className='d-flex my-1 gap-2'>
                                                                                <strong>Khách thuê: </strong>
                                                                                <p>{item.fullname}</p>
                                                                            </div>
                                                                            <div className='d-flex mb-1 gap-2'>
                                                                                <strong>Số lượng người thuê: </strong>
                                                                                <p>{parseInt(item.adult) + parseInt(item.children)}</p>
                                                                            </div>
                                                                            <div className='d-flex mb-1 gap-2'>
                                                                                <strong>Ngày thuê phòng: </strong>
                                                                                <p>{item.start_from}</p>
                                                                            </div>
                                                                            <div className='d-flex mb-1 gap-2'>
                                                                                <strong>Ngày trả phòng: </strong>
                                                                                <p>{item.end_at}</p>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            })}
                                                            {!reservation.some(item => item.room_id === room.id) && <h4 className='text-warning mt-3'>Phòng này đang trống</h4 >}

                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                } else {
                                    return null; // Không render phòng không ở tầng 1
                                }
                            })}
                        </div>
                        <div className="row floo1 g-5 px-4  mt-3 justify-content-sm-center justify-content-md-start">
                            <div className='pb-2 border-2 border-bottom fw-bold' style={{ fontSize: '25px' }}>Tầng 3</div>
                            {rooms.map(room => {
                                if (room.floor === 3) {
                                    return (
                                        <React.Fragment key={room.id}>
                                            <div style={{ width: '25rem' }} className=" divRoom col-lg-3 me-md-4 rounded mt-2 shadow col-6 bg-white p-3">
                                                <div className='h-100 w-100'>
                                                    <div className='w-100 text-center'>
                                                        <div style={{ fontSize: '25px' }}><strong>Phòng: </strong>{room.name}</div>
                                                    </div>
                                                    <div className='mt-3 w-100'>
                                                        <div className='start_from'><strong>Giá thuê: </strong>{room.rent_cost}</div>
                                                        <div className='end_at'><strong>Số người thuê tối đa: </strong>{room.max_number_people}</div>
                                                    </div>
                                                    <div className='my-3 status'>
                                                        <div className='d-flex'>
                                                            <strong className='me-3'>Trạng thái: </strong>
                                                            <p className={getTextColor(getRoomStatus(room.id)) + ' fw-bold'}>{getRoomStatus(room.id)}</p>
                                                        </div>

                                                    </div>
                                                    <div className='w-100 text-end'>
                                                        <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target={`#exampleModal${room.id}`}>Chi tiết</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="modal fade" id={`exampleModal${room.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content w-100">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Chi tiết phòng {room.name}</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                        {reservation.some(item => item.room_id === room.id) && <h3 className='text-primary '>Phòng đang có người thuê</h3 >}
                                                            <div className='w-100'>
                                                                <img className='w-100' style={{ height: '13rem' }} src={process.env.REACT_APP_IMAGE_PATH + `${room.image_path}`} alt="" />
                                                            </div>

                                                            {reservation.map((item, index) => {
                                                                if (item.room_id === room.id) {
                                                                    
                                                                    return (
                                                                        <div className='w-100' key={index}>
                                                                            <div className='d-flex my-1 gap-2'>
                                                                                <strong>Khách thuê: </strong>
                                                                                <p>{item.fullname}</p>
                                                                            </div>
                                                                            <div className='d-flex mb-1 gap-2'>
                                                                                <strong>Số lượng người thuê: </strong>
                                                                                <p>{parseInt(item.adult) + parseInt(item.children)}</p>
                                                                            </div>
                                                                            <div className='d-flex mb-1 gap-2'>
                                                                                <strong>Ngày thuê phòng: </strong>
                                                                                <p>{item.start_from}</p>
                                                                            </div>
                                                                            <div className='d-flex mb-1 gap-2'>
                                                                                <strong>Ngày trả phòng: </strong>
                                                                                <p>{item.end_at}</p>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            })}
                                                            {!reservation.some(item => item.room_id === room.id) && <h4 className='text-warning mt-3'>Phòng này đang trống</h4 >}

                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );

                                } else {
                                    return null; // Không render phòng không ở tầng 1
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    )

};

export default Admin;
