import React, { useEffect, useState } from 'react';
import Master from '../master';
import { Link } from 'react-router-dom';
import http from '../../Axios';
import ReactPaginate from 'react-paginate'
import swal from 'sweetalert';
const User = () => {
    const [user, setUser] = useState([])
    const [searchValue, setSearchValue] = useState({
        name: '',
        role: ''
    })
    const [loading, setLoading] = useState(false)
    const [perPage, setPerPage] = useState(5)
    useEffect(() => {
        async function getUser() {
            setLoading(true)
            await http.get('/api/user')
                .then(res => {
                    var userResponse = res.data.users.data

                    setUser(userResponse)
                    setPerPage(res.data.users.last_page)
                    setLoading(false)

                })

        }
        getUser()
    }, [])


    async function handlePageClick(data) {

        var name = searchValue.name;
        var role = searchValue.role;
        var page = data.selected + 1
        await http.get(`/api/user?page=${page}&limit=3&name=${name}&role=${role}`)
            .then(res => {
                var dataPagination = res.data.users
                var perPage = dataPagination.last_page
                setPerPage(perPage)
                setUser(dataPagination.data)
            })

    }
    function handleSearchValue(e) {
        var valueSearch = e.target.value
        setSearchValue({
            ...searchValue, [e.target.name]: valueSearch
        })
    }

    async function handleSearch() {
        var name = searchValue.name;
        var role = searchValue.role;
        await http.get(`/api/user?name=${name}&role=${role}`)
            .then(res => {
                var dataPagination = res.data.users
                var dataUser = dataPagination.data
                var perPage = dataPagination.last_page
                /* console.log(dataPagination.last_page); */
                setUser(dataUser)
                setPerPage(perPage)
            })
    }
    function handleDelete(id) {
        http.delete(`/api/deleteUser/${id}`)
            .then(res => {
                if (res.data.status === 200) {
                    swal('Thông bóa', res.data.message, 'success')
                        .then(() => {
                            console.log(res.data);
                            setUser(res.data.users.data);
                            setPerPage(res.data.users.last_page)
                        })
                }
                else{
                    swal('Thông bóa', res.data.message, 'error')
                }
            })

    }
    return (

        <div>
            <Master>
                <section className='manageUser'>
                    <div className="container w-100 mx-auto mt-5">
                        <div className="row justify-content-center">
                            {/* BreadCrumb */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link style={{ fontSize: '20px' }} to={'/admin'} href="#">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: '20px' }}>User</li>
                                </ol>
                            </nav>
                            <div className="col">
                                <div className="container">

                                    <div className=" row row-cols-lg-5 g-4 divSearch w-100 mx-auto d-flex justify-content-end">
                                        <div className='col-12 col-lg-2 col-md-5 px-0 mx-md-auto'>
                                            <select onChange={handleSearchValue} name="role" id="" className='form-control'>
                                                <option value="">Select role</option>
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                            </select>
                                        </div>
                                        <div className='col-12 col-lg-6 col-md-5 px-0 mx-lg-3'>
                                            <input onChange={handleSearchValue} name='name' type="search" className='form-control' placeholder='Enter name...' />
                                        </div>
                                        <button onClick={handleSearch} className='btn btn-primary mx-md-auto col-12 col-md-5 px-0 col-lg-1 me-lg-3'>Search</button>
                                        <Link to={'/addUser'} className='btn btn-primary col-lg-1 col-12 col-md-5 px-0 ' style={{}}><i className="fa-solid fa-plus me-2"></i>Add new</Link>
                                    </div>

                                </div>
                                {loading ? (
                                    <div className=" " role="status">
                                        Loading...
                                    </div>
                                ) : (
                                    <>
                                        <table className="table mt-3">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Avatar</th>
                                                    <th scope="col">Role</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className='table-group-divider'>
                                                {user.map((item, index) => (
                                                    <tr key={index}>
                                                        <th scope="row">{item.id}</th>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>
                                                            <div className='w-100 h-100 '>
                                                                <img className='rounded-circle' style={{ height: '5rem', width: '5rem' }} src={process.env.REACT_APP_IMAGE_PATH + `/${item.image_path}`} alt="" />
                                                            </div>
                                                        </td>
                                                        <td>{item.role}</td>
                                                        <td>
                                                            <div className="dropdown">
                                                                <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    Action
                                                                </button>
                                                                <ul className="dropdown-menu">
                                                                    <Link to={`/updateUser/${item.id}`} className="btn-primary btn mx-auto w-100 mb-3" >
                                                                        <i className="fa-solid fa-pen-to-square me-3"></i>Update User
                                                                    </Link>
                                                                    <li>
                                                                        <button onClick={()=>handleDelete(item.id)} data-user-id={item.id} className="btn-danger btn w-100 mx-auto">
                                                                            <i className="fa-solid fa-trash me-3"></i>Delete User
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
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

export default User;
