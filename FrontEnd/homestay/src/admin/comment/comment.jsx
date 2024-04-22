import React, { useState, useEffect } from 'react';
import Master from '../master';
import http from '../../Axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
const Comment = () => {

    const [comment, setComment] = useState([])
    const [searchValue, setSearchValue] = useState({
        user_name: '',
        post_title: '',
        content: '',

    })

    const [loading, setLoading] = useState(false)
    const [perPage, setPerPage] = useState(5)
    useEffect(() => {
        async function getRoom() {
            setLoading(true)
            await http.get('/api/commentBlog')
                .then(res => {
                    var roomResponse = res.data.comment_blog.data
                    setComment(roomResponse)
                    setPerPage(res.data.comment_blog.last_page)
                    setLoading(false)
                    console.log(res.data);
                })
        }
        getRoom()
    }, [])
    async function handleSearch() {

        await http.get(`/api/commentBlog?user_name=${searchValue.user_name}&post_title=${searchValue.post_title}&content=${searchValue.content}`)
            .then(res => {
                var dataPagination = res.data.comment_blog
                var dataUser = dataPagination.data
                var perPage = dataPagination.last_page
                setComment(dataUser)
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
        await http.get(`/api/commentBlog?page=${page}&user_name=${searchValue.user_name}&post_title=${searchValue.post_title}&content=${searchValue.content}`)
            .then(res => {
                var dataPagination = res.data.comment_blog
                var perPage = dataPagination.last_page
                setPerPage(perPage)
                setComment(dataPagination.data)
            })

    }
    console.log(searchValue);
    async function handleDelete(id) {
        http.delete(`/api/commentBlog/${id}`)
            .then(res => {
                if (res.data.status === 200) {
                    swal('Thông báo', 'Xóa bình luận thành công', 'success')
                        .then(() => {
                           
                            setComment(prevComment => prevComment.filter(item => item.id !== id));
                        })
                }
            })
    }
    
    

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
                                                <div className='col'>
                                                    <label htmlFor="post_title">Tiêu đề bài đăng</label>
                                                    <input onChange={handleSearchValue} name='post_title' type="search" className='form-control' placeholder='Enter name room...' />

                                                </div>

                                            </div>
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <label className='' htmlFor="user_name">Tên người đăng</label>
                                                    <input onChange={handleSearchValue} name='user_name' type="search" className='form-control' placeholder='Enter name room...' />
                                                </div>
                                            </div>

                                        </div>
                                        <div className=' ps-md-0 px-0  col-md-12 col-lg-6 d-flex flex-column justify-content-between'>
                                            <div className='row mb-3'>
                                                <div className="col-12">
                                                    <label htmlFor="content">Nội dung bình luận</label>
                                                    <input onChange={handleSearchValue} name='content' type="search" className='form-control' placeholder='Enter name room...' />
                                                </div>
                                            </div>

                                            <div className="row mb-3 g-3 justify-content-center">
                                                <div className=" col-lg-6 col-md-12 pt-4">
                                                    <button onClick={handleSearch} className='btn btn-primary w-100'>Search</button>
                                                </div>
                                                {/*  <div className="col-lg-6 col-md-12 text-end pt-4">
                                                    <Link to={'/addRoom'} className='btn btn-primary w-100' style={{}}><i className="fa-solid fa-plus me-2"></i>Add new</Link>
                                                </div> */}
                                            </div>

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
                                                    <th >#</th>
                                                    <th className='text-center' style={{ width: '20rem' }}>Bài đăng</th>
                                                    <th className='text-start' style={{ width: '15rem' }}>Người comment</th>
                                                    <th >Nội dung comment</th>
                                                    <th >Trạng thái</th>
                                                    <th >Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className='table-group-divider'>
                                                {comment.length === 0 ? (<h3>Không có bình luận</h3>) : comment.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        <tr>
                                                            <td >{item.id}</td>
                                                            <td className='text-center'>
                                                                <div><strong>Tiêu đề: </strong>{item.title}</div>
                                                                <div className='mb-2 h-100'>
                                                                    <img className=' w-50' style={{minHeight: '3rem', maxHeight: '8rem'}} src={process.env.REACT_APP_IMAGE_PATH + `/${item.room_image}`} alt="" />
                                                                </div>
                                                            </td>
                                                            <td className='text-start h-100 '>
                                                                <div className='d-flex justify-content-start align-items-center'>
                                                                    <div className='mb-2 h-75 me-3' style={{ flex: '3' }}>
                                                                        <img className='h-100 w-100 me-4' src={process.env.REACT_APP_IMAGE_PATH + `/${item.avatar}`} alt="" />
                                                                    </div>
                                                                    <div className='mb-2' style={{ flex: '7' }}><strong>Name: </strong>{item.fullname}</div>

                                                                </div>
                                                            </td>
                                                            <td className=''>
                                                                {item.content}
                                                            </td>
                                                            <td className=''>
                                                            {item.status === 0 ? <div className='bg-success w-50 mx-auto text-white' style={{ borderRadius: '10px' }}>Hiển thị</div> : <div style={{ borderRadius: '10px' }} className='bg-warning w-50 mx-auto text-dark'>Ẩn</div>}

                                                            </td>
                                                            <td>
                                                                <div className='w-100 d-flex align-items-center justify-content-center'>

                                                                    <div className="dropdown dropstart">
                                                                        <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            Action
                                                                        </button>
                                                                        <ul className="dropdown-menu px-1">
                                                                            <li>
                                                                                <Link to={`/updateComment/${item.id}`} style={{textDecoration: 'none'}}  className="btn-primary btn w-100 mb-3 ">
                                                                                    <i className="fa-solid fa-pen-to-square me-3"></i>Update
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <button onClick={() => { handleDelete(item.id) }} className="btn-danger btn w-100 ">
                                                                                    <i className="fa-solid fa-trash me-3"></i>Delete
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

export default Comment;
