import React, { useState, useEffect } from 'react';
import Master from '../master';
import 'react-quill/dist/quill.snow.css';
import http from '../../Axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import swal from 'sweetalert';
const Post = () => {

    const [post, setPost] = useState([]);
    const [searchValue, setSearchValue] = useState({
        title: '',
        status: ''
    })

    const [loading, setLoading] = useState(false)
    const [perPage, setPerPage] = useState(5)
    const [currentPage, setCurrentPerPage] = useState(1)
    useEffect(() => {
        async function getUser() {
            setLoading(true)
            await http.get('/post')
                .then(res => {
                    var userResponse = res.data.posts.data
                    setPost(userResponse)
                    setPerPage(res.data.posts.last_page)
                    setLoading(false)

                })

        }
        getUser()
    }, [])
    async function handleSearch() {
        var title = searchValue.title;
        var status = searchValue.status;
        await http.get(`/post?title=${title}&status=${status}`)
            .then(res => {
                var dataPagination = res.data.posts
                var dataUser = dataPagination.data
                var perPage = dataPagination.last_page
                setPost(dataUser)
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

        var title = searchValue.title;
        var status = searchValue.status;
        var page = data.selected + 1
        setCurrentPerPage(page)
        await http.get(`/post?page=${page}&title=${title}&status=${status}`)
            .then(res => {
                var dataPagination = res.data.posts
                var perPage = dataPagination.last_page
                setPerPage(perPage)
                setPost(dataPagination.data)
            })

    }
    /* console.log(process.env); */
    function handleDelete(id) {
        http.delete(`/api/deletePost/${id}`)
            .then(res => {
                if (res.data.status === 200) {
                    swal('Thông bóa', 'Xóa bài đăng thành công', 'success')
                        .then(() => {
                            window.location.reload()
                        })
                }
            })

    }
    return (
        <Master>
            <div>
                <section className='managePost'>
                    <div className="w-75 mx-auto mt-5">
                        <div className="row justify-content-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link style={{ fontSize: '20px' }} to={'/admin'} href="#">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: '20px' }}>Post</li>
                                </ol>
                            </nav>
                            <div className="col">
                                <div className="container">
                                    <div className=" row row-cols-lg-5 g-4 divSearch w-100 mx-auto d-flex justify-content-end">
                                        <div className='col-12 col-lg-2 col-md-5 px-0 mx-md-auto'>
                                            <select onChange={handleSearchValue} name="status" id="" className='form-control'>
                                                <option value="">Select status</option>
                                                <option value="1">Hiển thị</option>
                                                <option value="0">Ẩn</option>
                                            </select>
                                        </div>
                                        <div className='col-12 col-lg-6 col-md-5 px-0 mx-lg-3'>
                                            <input onChange={handleSearchValue} name='title' type="search" className='form-control' placeholder='Enter title...' />
                                        </div>
                                        <button onClick={handleSearch} className='btn btn-primary mx-md-auto col-12 col-md-5 px-0 col-lg-1 me-lg-3'>Search</button>
                                        <Link to={'/addPost'} className='btn btn-primary col-lg-1 col-12 col-md-5 px-0 ' style={{}}><i className="fa-solid fa-plus me-2"></i>Add new</Link>
                                    </div>

                                </div>
                                {loading ? (
                                    <div className=" " role="status">
                                        Loading...
                                    </div>
                                ) : (

                                    <div style={{overflowX: 'auto'}}>
                                        <table className="table mt-3 w-100 mx-auto" style={{
                                             minWidth: '1131px', width: '100%'
                                        }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">Content</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className='table-group-divider'>
                                                {post.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        <tr >
                                                            <th scope="row">{item.id}</th>
                                                            <td dangerouslySetInnerHTML={{ __html: item.title }} />
                                                            <td className=''>
                                                                <div className='w-100 h-100'>
                                                                    <img style={{ height: '7rem', width: '10rem' }} src={process.env.REACT_APP_IMAGE_PATH + `/${item.image_path}`} alt="" />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <textarea value={item.content} name="" id="" cols='30' rows='5' className=' form-control' ></textarea>
                                                            </td>
                                                            <td>
                                                                {item.status === 1 ? <div className='bg-success w-50 mx-auto text-white' style={{ borderRadius: '10px' }}>Hiển thị</div> : <div style={{ borderRadius: '10px' }} className='bg-warning w-50 mx-auto text-dark'>Ẩn</div>}
                                                            </td>
                                                            <td>
                                                                <div className='w-100 d-flex align-items-center justify-content-center'>
                                                                    <i data-bs-toggle="modal" data-bs-target={'#exampleModal' + item.id} className="fa-solid fa-eye text-primary me-3" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            Action
                                                                        </button>
                                                                        <ul className="dropdown-menu">
                                                                            <Link to={`/updatePost/${item.id}`} className="btn-primary btn mx-auto w-100 mb-3 text-white" style={{ textDecoration: 'none' }} >
                                                                                <i className="fa-solid fa-pen-to-square me-3"></i>Update Post
                                                                            </Link>
                                                                            <li>
                                                                                <button onClick={() => { handleDelete(item.id) }} data-user-id={item.id} className="btn-danger btn w-100 mx-auto">
                                                                                    <i className="fa-solid fa-trash me-3"></i>Delete Post
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <div key={index} className="modal fade" id={'exampleModal' + item.id} aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                                        {/*  <button type="button" className="btn btn-primary">Save changes</button> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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

            </div >
        </Master >
    );
};

export default Post;
