import React, { useState, useEffect } from 'react';
import Master from '../master';
import http from '../../Axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
const ListRoom = () => {

    const [room, setRoom] = useState([])
    const [searchValue, setSearchValue] = useState({
        name: '',
        floor: '',
        type_room: '',
        max_number_people: '',
        rent_cost: '',
        status: ''
    })
    const [facilities, setFacilities] = useState([])

    const [loading, setLoading] = useState(false)
    const [perPage, setPerPage] = useState(5)
    useEffect(() => {
        async function getRoom() {
            setLoading(true)
            await http.get('/getroom')
                .then(res => {
                    var roomResponse = res.data.rooms.data
                    var facilitiesResponse = res.data.room_facilities
                    setRoom(roomResponse)
                    setFacilities(facilitiesResponse)
                    setPerPage(res.data.rooms.last_page)
                    setLoading(false)
                    console.log(res.data);
                })
        }
        getRoom()
    }, [])
    async function handleSearch() {
        const url = `/getroom?name=${searchValue.name}&floor=${searchValue.floor}&type_room=${searchValue.type_room}&max_number_people=${searchValue.max_number_people}&rent_cost=${searchValue.rent_cost}&status=${searchValue.status}`;
        await http.get(url)
            .then(res => {
                var dataPagination = res.data.rooms
                var dataUser = dataPagination.data
                var perPage = dataPagination.last_page
                setRoom(dataUser)
                setPerPage(perPage)
            })
    }
    function handleSearchValue(e) {
        var valueSearch = e.target.value
        setSearchValue({
            ...searchValue, [e.target.name]: valueSearch
        })
    }
    async function handlePageClick(data) {
        var page = data.selected + 1
        await http.get(`/getroom?page=${page}&name=${searchValue.name}&floor=${searchValue.floor}&type_room=${searchValue.type_room}&max_number_people=${searchValue.max_number_people}&rent_cost=${searchValue.rent_cost}&status=${searchValue.status}`)
            .then(res => {
                var dataPagination = res.data.rooms
                var perPage = dataPagination.last_page
                setPerPage(perPage)
                setRoom(dataPagination.data)
            })

    }
    async function handleDelete(id) {
        swal('Thông báo', 'Xóa phòng sẽ xóa đi tất cả cơ sở vật chất của phòng, bạn có chắc muốn xóa', 'warning')
            .then(() => {
                http.delete(`/api/room/${id}`)
                    .then(res => {
                        if (res.data.status === 200) {
                            swal('Thông bóa', 'Xóa phòng thành công', 'success')
                                .then(() => {
                                    window.location.reload()
                                })
                        }
                    })
            })
    }
    console.log(facilities);
    return (
        <div>
            <Master>
                <section className='managePost'>
                    <div className="container w-100 mx-auto mt-5">
                        <div className="row justify-content-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link style={{ fontSize: '20px' }} to={'/admin'} href="#">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: '20px' }}>Rooms</li>
                                </ol>
                            </nav>

                            <div className="col">
                                <div className="container px-0 d-flex flex-column align-items-center">
                                    <div className=" row divSearch w-100 ">
                                        <div className=' pe-md-0 px-0 pe-lg-2  col-md-12 col-lg-6 flex flex-column justify-content-between'>
                                            <div className="row mb-3">
                                                <div className='col-6'>
                                                    <label htmlFor="start_from">Chọn loại phòng</label>
                                                    <select onChange={handleSearchValue} name="type_room" id="" className='form-control text-center'>
                                                        <option value="">----- Select Type -----</option>
                                                        <option value="1">Phòng VIP</option>
                                                        <option value="0">Phòng thường</option>
                                                    </select>
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="start_from">Chọn tầng</label>
                                                    <select onChange={handleSearchValue} name="floor" id="" className='form-control text-center'>
                                                        <option value="">----- Select Floor -----</option>
                                                        <option value="1">Tầng 1</option>
                                                        <option value="2">Tầng 2</option>
                                                        <option value="3">Tầng 3</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className='col-6'>
                                                    <label htmlFor="start_from">Giá thuê</label>
                                                    <select onChange={handleSearchValue} name="rent_cost" id="" className='form-control text-center'>
                                                        <option value="">----- Chọn giá -----</option>
                                                        <option value="500">0 - 500.000đ</option>
                                                        <option value="500-1500">500.000đ - 1.500.000đ</option>
                                                        <option value="1500-3000">1.500.000đ - 3.000.000đ</option>
                                                        <option value="3000">Trên 3.000.000</option>

                                                    </select>
                                                </div>
                                                <div className='col-6'>
                                                    <label htmlFor="end_at">Số người tối đa</label>
                                                    <select onChange={handleSearchValue} name="max_number_people" id="" className='form-control text-center'>
                                                        {[...Array(10)].map((_, index) => (
                                                            <option key={index + 1} value={index + 1}>{index + 1} người</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                        <div className=' ps-md-0 px-0  col-md-12 col-lg-6 d-flex flex-column justify-content-between'>
                                            <div className='row mb-3'>
                                                <div className="col-12">
                                                    <label htmlFor="start_from">Tên phòng</label>
                                                    <input onChange={handleSearchValue} name='name' type="search" className='form-control' placeholder='Enter name room...' />
                                                </div>
                                            </div>

                                            <div className="row mb-3 g-3 ">
                                                <div className=" col-lg-6 col-md-12">
                                                    <label htmlFor="start_from">Trạng thái phòng</label>
                                                    <select onChange={handleSearchValue} name="status" id="" className='form-control'>
                                                        <option value="">----- Select Status -----</option>
                                                        <option value="1">Đang thuê</option>
                                                        <option value="0">Đang trống</option>
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
                                    <div className='container px-0 w-100' style={{ overflowX: 'auto' }}>
                                        <table className="table mt-3" style={{
                                             minWidth: '1131px', width: '100%'
                                        }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Floor</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Facilities</th>
                                                    <th scope="col">Max People</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Rent price</th>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className='table-group-divider'>
                                                {room.length === 0 ? (<h3>Không có thông tin phòng</h3>) : room.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        <tr >
                                                            <td scope="row">{item.name}</td>
                                                            <td scope="row">{item.floor}</td>
                                                            <td scope="row">{item.type_room}</td>
                                                            <td className=''>
                                                                {facilities.map((facility, fIndex) => (
                                                                    facility.room_id === item.id ?
                                                                        <div className='mb-3' key={fIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                                                            <div className='fw-bold me-3' dangerouslySetInnerHTML={{ __html: facility.icon }} />
                                                                            <div> {facility.name}</div>
                                                                        </div> :
                                                                        null
                                                                ))}
                                                            </td>
                                                            <td scope="row">{item.max_number_people}</td>
                                                            <td scope="row">
                                                                {item.status === 1 ? (<div className='bg-success rounded text-white'>Đang thuê</div>) : (<div className='bg-warning rounded'>Đang trống</div>)}
                                                            </td>
                                                            <td scope="row">{item.rent_cost}</td>
                                                            <td className=''>
                                                                <div className='w-100 h-100'>
                                                                    <img className='rounded' style={{ height: '7rem', width: '10rem' }} src={process.env.REACT_APP_IMAGE_PATH + `${item.image_path}`} alt="" />
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className='w-100 d-flex align-items-center justify-content-center'>
                                                                    {/* <i data-bs-toggle="modal" data-bs-target={'#exampleModal' + item.id} className="fa-solid fa-eye text-primary me-3" style={{ fontSize: '20px', cursor: 'pointer' }}></i> */}
                                                                    <div className="dropdown dropstart">
                                                                        <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            Action
                                                                        </button>
                                                                        <ul className="dropdown-menu px-1">
                                                                            <Link to={`/addRoomFacilities/${item.id}`} className="btn-secondary btn  w-100 mb-3 text-white" style={{ textDecoration: 'none', fontSize: '14px' }} >
                                                                                <i className="fa-solid fa-plus me-2"></i>Add Facilities
                                                                            </Link>
                                                                            <Link to={`/deleteRoomFacilities/${item.id}`} className="btn-secondary btn  w-100 mb-3 text-white" style={{ textDecoration: 'none', fontSize: '14px' }} >
                                                                                <i className="fa-solid fa-plus me-2"></i>Delete Facilities
                                                                            </Link>
                                                                            <button onClick={() => {
                                                                                window.location.href = `/updateRoom/${item.id}`
                                                                            }} className="btn-primary btn  w-100 mb-3 text-white" style={{ textDecoration: 'none', fontSize: '14px' }} >
                                                                                <i className="fa-solid fa-pen-to-square me-2"></i>Update Room
                                                                            </button>

                                                                            <li>
                                                                                <button onClick={() => { handleDelete(item.id) }} data-user-id={item.id} className="btn-danger btn w-100 ">
                                                                                    <i className="fa-solid fa-trash me-3"></i>Delete Room
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        {/* <div key={index} className="modal fade" id={'exampleModal' + item.id} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div className="modal-dialog p-0">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Post detail</h1>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body d-flex flex-column">
                                                                        <div className='w-100'>
                                                                            <img style={{ height: '7rem', width: '10rem' }} src={process.env.REACT_APP_IMAGE_PATH + `/${item.image_path}`} alt="" />
                                                                        </div>
                                                                        <div className=''>
                                                                            <div dangerouslySetInnerHTML={{ __html: item.title }} />
                                                                            <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                                                            <p>Trạng thái</p>
                                                                            {item.status === 1 ? <div className='bg-success w-50 text-white text-center' style={{ borderRadius: '10px' }}>Hiển thị</div> : <div style={{ borderRadius: '10px' }} className='text-center bg-warning w-50  text-dark'>Ẩn</div>}
                                                                        </div>
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                    </React.Fragment>
                                                ))}


                                            </tbody>
                                        </table>
                                        <div className='w-100 d-flex justify-content-end' style={{
                                             minWidth: '1131px', width: '100%'
                                        }}>
                                            <ReactPaginate
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={perPage}

                                                onPageChange={handlePageClick}
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
            </Master>
        </div>
    );
}

export default ListRoom;
