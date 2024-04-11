import React, { useEffect, useState } from 'react';
import Master from '../master';
import swal from 'sweetalert';
import http from '../../Axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
const Reservation = () => {
    const [searchValue, setSearchValue] = useState({
        user_name: '',
        room_name: '',
        start_from: '',
        end_at: '',
        status: '',
    })
    const [refresh, setRefresh] = useState(true)
    const [reservation, setReservation] = useState([])
    const [loading, setLoading] = useState(false)
    const [perPage, setPerPage] = useState(2)
    useEffect(() => {
        async function getRoom() {
            setLoading(true)
            await http.get('/api/reservation')
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
    function handleSearchValue(e) {
        var valueSearch = e.target.value
        setSearchValue({
            ...searchValue, [e.target.name]: valueSearch
        })
    }
    function handleStatusChange(status, id) {
        var data = new FormData()
        data.append('_method', 'PUT')
        data.append('status', status)
        http.post(`/api/reservation/${id}`, data)
            .then(res => {
                if (res.data.status === 200) {
                    swal("Thông báo", "Cập nhật trạng thái đơn hàng thành công", "success")
                    setReservation(prevReservation => {
                        return prevReservation.map(item => {
                            if (item.id === id) {
                                return { ...item, status: status };
                            }
                            return item;
                        });
                    });
                }
            })
            .catch(err => {
                swal("Thông báo", "Cập nhật trạng thái đơn hàng không thành công. Vui lòng thử lại sau!", "error");
            })
    }
    async function handlePageClick(data) {


        var page = data.selected + 1
        await http.get(`/api/reservation?page=${page}&user_name=${searchValue.user_name}&room_name=${searchValue.room_name}&start_from=${searchValue.start_from}&end_at=${searchValue.end_at}&status=${searchValue.status}`)
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
    async function handleSearch() {

        await http.get(`/api/reservation?&user_name=${searchValue.user_name}&room_name=${searchValue.room_name}&start_from=${searchValue.start_from}&end_at=${searchValue.end_at}&status=${searchValue.status}`)
            .then(res => {
                var dataPagination = res.data.reservation
                var perPage = dataPagination.last_page
                setPerPage(perPage)
                setReservation(dataPagination.data)
            })
    }
    return (
        <div>
            <Master>
                <section className='manageReservation'>
                    <div className="container w-100 mx-auto mt-5">
                        <div className="row justify-content-center">
                            {/* BreadCrumb */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link style={{ fontSize: '20px' }} to={'/admin'} href="#">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: '20px' }}>Reservation</li>
                                </ol>
                            </nav>
                            <div className="col">
                                <div className="container px-0 d-flex flex-column align-items-center">

                                    <div className=" row divSearch w-100 ">
                                        <div className=' pe-md-0 px-0 pe-lg-2  col-md-12 col-lg-6 flex flex-column justify-content-between'>
                                            <div className="row mb-3">
                                                <div className='col-12'>
                                                    <label htmlFor="start_from">Tên Khách hàng</label>
                                                    <input onChange={handleSearchValue} name='user_name' type="search" className='form-control' placeholder='Enter name user...' />

                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className='col-6'>
                                                    <label htmlFor="start_from">Ngày đặt phòng</label>
                                                    <input onChange={handleSearchValue} name='start_from' type="date" className='form-control' placeholder='Enter name room...' />

                                                </div>
                                                <div className='col-6'>
                                                    <label htmlFor="end_at">Ngày trả phòng</label>
                                                    <input onChange={handleSearchValue} name='end_at' type="date" className='form-control' placeholder='Enter name room...' />

                                                </div>
                                            </div>

                                        </div>
                                        <div className=' ps-md-0 px-0  col-md-12 col-lg-6 d-flex flex-column justify-content-between'>
                                            <div className='row mb-3'>
                                                <div className="col-12">
                                                    <label htmlFor="start_from">Tên phòng</label>
                                                    <input onChange={handleSearchValue} name='room_name' type="search" className='form-control' placeholder='Enter name room...' />
                                                </div>
                                            </div>

                                            <div className="row mb-3 g-3 ">
                                                <div className=" col-lg-6 col-md-12">
                                                    <label htmlFor="start_from">Trạng thái đơn đặt phòng</label>
                                                    <select onChange={handleSearchValue} name="status" id="" className='form-control text-center'>
                                                        <option value="">----- Select Status -----</option>
                                                        <option value="1">Đã thanh toán</option>
                                                        <option value="2">Đã hủy</option>
                                                        <option value="3">Đã tiếp nhận</option>
                                                        <option value="5">Đang chờ tiếp nhận</option>
                                                        <option value="4">Đã trả phòng</option>
                                                    </select>
                                                </div>
                                                <div className=" col-lg-6 col-md-12 pt-4">

                                                    <button onClick={handleSearch} className='btn btn-primary w-100'>Search</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='row  w-100'>
                                        <div className="col-12 text-end p-0">
                                            <Link to={'/addRoom'} className='btn btn-primary col-lg-1 col-12 col-md-5 px-0 w-auto px-3' style={{}}><i className="fa-solid fa-plus me-2"></i>Add new</Link>
                                        </div>
                                    </div>
                                </div>
                                {loading ? (
                                    <div className=" " role="status">
                                        Loading...
                                    </div>
                                ) : (
                                    <>
                                        <table className="table mt-3 table-striped">
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
                                                                    <li onClick={() => handleStatusChange('1', item.id)} style={{ cursor: 'pointer' }}><div className="dropdown-item" href=""><i className="fa-solid fa-check me-2 text-success"></i>Đã thanh toán</div></li>
                                                                    <li onClick={() => handleStatusChange('2', item.id)} style={{ cursor: 'pointer' }}><div className="dropdown-item" href=""><i className="fa-solid fa-ban me-2 text-danger"></i>Đã hủy</div></li>
                                                                    <li onClick={() => handleStatusChange('3', item.id)} style={{ cursor: 'pointer' }}><div className="dropdown-item" href=""><i className="fa-solid fa-check-double text-success me-2"></i>Đã tiếp nhận</div></li>
                                                                    <li onClick={() => handleStatusChange('5', item.id)} style={{ cursor: 'pointer' }}><div className="dropdown-item" href=""><i className="fa-regular fa-circle-pause text-dark me-2"></i>Đang chờ tiếp nhận</div></li>
                                                                    <li onClick={() => handleStatusChange('4', item.id)} style={{ cursor: 'pointer' }}><div className="dropdown-item" href=""><i className="fa-solid fa-house me-2 text-primary"></i>Đã trả phòng</div></li>
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
                                    </>
                                )}


                            </div>
                        </div>
                    </div>
                </section>
            </Master>
        </div>
    );
}

export default Reservation;
