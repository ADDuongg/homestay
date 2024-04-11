import Cookies from 'js-cookie';
import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import http from '../Axios';
import swal from 'sweetalert';
import Header from '../component/header';
import Footer from '../component/footer';
import ReactPaginate from 'react-paginate';
const Booking = () => {
    const [selectImage, setImage] = useState(null);
    const [user, setUser] = useState({});
    const [reservation, setReservation] = useState([])
    const [loading, setLoading] = useState(false)
    const [perPage, setPerPage] = useState(2)
    var user_login = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    useEffect(() => {
        async function getRoom() {
            setLoading(true)
            await http.get(`/api/reservation/${user_login.id}`)
                .then(res => {
                    var roomResponse = res.data.reservation.data
                    setReservation(roomResponse)
                    setPerPage(res.data.reservation.last_page)
                    setLoading(false)
                    console.log(roomResponse);
                })

        }
        getRoom()
    }, [])
    if (!user_login) {
        return <Navigate to={'/login'} />;
    }
    async function handlePageClick(data) {
        var page = data.selected + 1
        await http.get(`/api/reservation/${user_login.id}?page=${page}`)
            .then(res => {
                var dataPagination = res.data.reservation
                var perPage = dataPagination.last_page
                setPerPage(perPage)
                setReservation(dataPagination.data)
            })

    }
    function handleDelete(id) {
        http.delete(`/api/reservation/${id}`)
            .then(res => {
                if (res.data.status === 200) {
                    swal('Thông báo', 'Xóa thành công đơn đặt phòng', 'success')
                        .then(() => {
                            window.location.reload()
                        })
                }
            })
            .catch(err => {
                swal("Thông báo", "Xóa đơn đặt không thành công. Vui lòng thử lại sau!", "error");
            })
    }

    return (
        <div>
            <Header />
            <section className='updateUser'>
                <div className="container my-5 w-100 mx-auto" style={{overflowX: 'auto'}}>
                    <div className='w-100'>
                        <div className='fw-bold mb-2'>YOUR RESERVATION</div>

                        <div className='border-1 border'></div>
                    </div>
                    <div className="row g-4 mt-5">
                        <div className="col-md-3 text-center col-12">
                            <div>{user_login.role}</div>
                            <img className='rounded-circle' src={process.env.REACT_APP_IMAGE_PATH + `/${user_login.image_path}`} alt="..." style={{ width: '10rem', height: '10rem' }} />
                            <div className='fw-bold '>{user_login.name}</div>
                        </div>
                        <div className="col-md-9 col-12 ">
                            {loading ? (
                                <div className=" " role="status">
                                    Loading...
                                </div>
                            ) : (
                                <div className='w-100 overflow-x-auto'>
                                    <table className="table mt-3 table-striped ">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th>Tên phòng</th>
                                                <th className='text-start' scope="col">Thông tin khách hàng</th>
                                                <th className='text-start' scope="col">Thông tin phòng</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='table-group-divider' style={{ backgroundColor: '#F2F2F2' }}>
                                            {reservation.length === 0 ? (<h3>Không có thông tin phòng</h3>) : reservation.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <tr >
                                                        <td >{item.id}</td>
                                                        <td>{item.room_name}</td>
                                                        <td className='text-start'>
                                                            <div >
                                                                <div className='mb-2'><strong>Name: </strong>{item.fullname}</div>
                                                                <div className='mb-2'><strong>Email: </strong>{item.email}</div>
                                                                <div className='mb-2' ><strong>SĐT: </strong>{item.number}</div>
                                                            </div>
                                                        </td>
                                                        <td className='text-start'>
                                                            <div >
                                                                <div className='mb-2'><strong>Ngày nhận phòng: </strong>{item.start_from}</div>
                                                                <div className='mb-2'><strong>Ngày trả phòng: </strong>{item.end_at}</div>
                                                                <div className='mb-2'><strong>Số người lớn: </strong>{item.adult}</div>
                                                                <div className='mb-2'><strong>Số trẻ em: </strong>{item.childre}</div>
                                                                <div className='mb-2'><strong>Tổng tiền thuê: </strong>{item.rent_cost}</div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {item.status === '1' && <div className='bg-success text-white rounded w-auto p-2'>Đã thanh toán</div>}
                                                            {item.status === '2' && <div className='bg-danger text-white rounded w-auto p-2'>Đã hủy</div>}
                                                            {item.status === '3' && <div className='bg-primary text-white rounded w-auto p-2'>Đã tiếp nhận</div>}
                                                            {item.status === '5' && <div className='bg-secondary text-white rounded w-auto p-2'>Đang chờ tiếp nhận</div>}
                                                            {item.status === '4' && <div className='text-white bg-info rounded w-auto p-2'>Đã trả phòng</div>}
                                                        </td>

                                                        <td><div className="btn-group dropup">
                                                            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                Action
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                {/* <li style={{ cursor: 'pointer' }}><div className="dropdown-item" href=""><i className="fa-solid fa-check me-2 text-success"></i>Đã thanh toán</div></li>
                                                                <li style={{ cursor: 'pointer' }}><div className="dropdown-item" href=""><i className="fa-solid fa-ban me-2 text-danger"></i>Đã hủy</div></li>
                                                                <li style={{ cursor: 'pointer' }}><div className="dropdown-item" href=""><i className="fa-solid fa-check-double text-success me-2"></i>Đã tiếp nhận</div></li>
                                                                <li style={{ cursor: 'pointer' }}><div className="dropdown-item" href=""><i className="fa-regular fa-circle-pause text-dark me-2"></i>Đang chờ tiếp nhận</div></li>
                                                                <li style={{ cursor: 'pointer' }}><div className="dropdown-item" href=""><i className="fa-solid fa-house me-2 text-primary"></i>Đã trả phòng</div></li> */}
                                                                <li onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer' }}><div className="dropdown-item" href=""><i className="fa-solid fa-trash me-2 text-danger"></i>Xóa đơn đặt phòng</div></li>
                                                            </ul>
                                                        </div></td>

                                                    </tr>
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className='w-100 d-flex justify-content-end'>
                                        <ReactPaginate
                                            previousLabel={'previous'}
                                            nextLabel={'next'}
                                            breakLabel={'...'}
                                            pageCount={perPage}/* Tổng số lượng bản ghi */
                                            /* pageRangeDisplayed={2} */
                                            onPageChange={handlePageClick}/* click vào số của các page để chuyển hướng */
                                            containerClassName={'pagination'}
                                            pageClassName={'page-item'}
                                            pageLinkClassName={'page-link'}
                                            previousClassName='page-item'
                                            previousLinkClassName='page-link'
                                            nextClassName='page-item'
                                            nextLinkClassName='page-link'
                                            breakClassName='page-item'
                                            breakLinkClassName='page-link'
                                            activeClassName='active'
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Booking;
