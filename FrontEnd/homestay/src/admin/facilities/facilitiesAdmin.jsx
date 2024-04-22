import React, { useEffect, useState } from 'react';
import Master from '../master';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import http from '../../Axios';
import ReactPaginate from 'react-paginate';
const FacilitiesAdmin = () => {
    const [facilities, setFacilities] = useState([])
    const [loading, setLoading] = useState(false)
    const [perPage, setPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState()
    const [searchValue, setSearchValue] = useState({
        name: '',
    })
    function handleSearchValue(e) {
        var valueSearch = e.target.value
        setSearchValue({
            ...searchValue, [e.target.name]: valueSearch
        })
    }
    useEffect(() => {
        setLoading(true)
        http.get('/api/facilities')
            .then((res) => {
                setFacilities(res.data.facilities.data);
                setPerPage(res.data.facilities.last_page)
                setLoading(false)
                /* console.log(res.data.facilities); */
            })

    }, [])


    async function handleSearch() {
        var name = searchValue.name;

        await http.get(`/api/facilities?page=${currentPage}&name=${name}`)
            .then(res => {
                var dataPagination = res.data.facilities.data
                var dataUser = dataPagination.data
                var perPage = dataPagination.last_page
                setFacilities(dataPagination)
                setPerPage(perPage)
                /* console.log(dataPagination); */
            })
    }

    function handleDelete(id) {
        http.delete(`/api/facilities/${id}`)
            .then(res => {
                if (res.data.status === 200) {
                    swal('Thông báo', 'Xóa cơ sở vật chất thành công', 'success')
                        .then(() => {
                            // Lấy lại danh sách cơ sở vật chất sau khi xóa
                            http.get('/api/facilities')
                                .then((res) => {
                                    setFacilities(res.data.facilities.data);
                                    setPerPage(res.data.facilities.last_page);
                                    /* console.log(res.data.facilities); */
                                })
                                .catch((error) => {
                                    console.error('Error fetching facilities:', error);
                                });
                        });
                }
            })
            .catch(error => {
                console.error('Error deleting facility:', error);
            });
    }

    async function handlePageClick(data) {
        var name = searchValue.name;
        var page = data.selected + 1
        setCurrentPage(page)
        await http.get(`/api/facilities?page=${page}&limit=3&name=${name}`)
            .then(res => {
                var dataPagination = res.data.facilities
                var perPage = dataPagination.last_page
                setPerPage(perPage)
                setFacilities(dataPagination.data)
            })

    }
    function handleUpdate() {
        swal('Thông báo', 'chức năng này sẽ có trong tương lai gần', 'warning')
    }
    return (
        <div>
            <Master>
                <div className="container mt-5">
                    <div className="row">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link style={{ fontSize: '20px' }} to={'/admin'} href="#">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: '20px' }}>Facilities</li>
                            </ol>
                        </nav>
                        <div className="col">
                            <div className="container">
                                <div className=" row row-cols-lg-5 g-4 divSearch w-100 mx-auto d-flex justify-content-end">
                                    {/* <div className='col-12 col-lg-2 col-md-5 px-0 mx-md-auto'>
                                        <select onChange={handleSearchValue} name="status" id="" className='form-control'>
                                            <option value="">Select status</option>
                                            <option value="1">Hiển thị</option>
                                            <option value="0">Ẩn</option>
                                        </select>
                                    </div> */}
                                    <div className='col-12 col-lg-6 col-md-12 px-0 mx-lg-3'>
                                        <input onChange={handleSearchValue} name='name' type="search" className='form-control' placeholder='Enter name...' />
                                    </div>
                                    <button onClick={handleSearch} className='btn btn-primary ms-3 col-12 col-md-12 px-0 col-lg-2 me-lg-3'>Search</button>
                                    <Link to={'/addFacilities'} className='btn btn-primary col-lg-2 col-12 col-md-12 px-0 ' style={{}}><i className="fa-solid fa-plus me-2"></i>Add new</Link>
                                </div>
                                {loading ? (
                                    <div className=" " role="status">
                                        Loading...
                                    </div>
                                ) : (
                                    <>
                                        <table className="table mt-3 w-100 mx-auto">
                                            <thead>
                                                <tr>
                                                    <th >#</th>
                                                    <th >Name</th>
                                                    <th >Icon</th>
                                                    <th >Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className='table-group-divider'>
                                                {facilities.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        <tr >
                                                            <td>{item.id}</td>
                                                            <td>{item.name}</td>

                                                            <td style={{ fontSize: '20px' }}>
                                                                <div dangerouslySetInnerHTML={{ __html: item.icon }}></div>
                                                            </td>

                                                            <td>
                                                                <div className='w-100 d-flex align-items-center justify-content-center'>
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            Action
                                                                        </button>
                                                                        <ul className="dropdown-menu">
                                                                            <Link onClick={handleUpdate} className="btn-primary btn mx-auto w-100 mb-3 text-white" style={{ textDecoration: 'none' }} >
                                                                                <i className="fa-solid fa-pen-to-square me-3"></i>Update
                                                                            </Link>
                                                                            <li>
                                                                                <button onClick={() => { handleDelete(item.id) }} data-user-id={item.id} className="btn-danger btn w-100 mx-auto">
                                                                                    <i className="fa-solid fa-trash me-3"></i>Delete
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </td>
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
                                    </>

                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Master>
        </div>
    );
}

export default FacilitiesAdmin;
