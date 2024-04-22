import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../contextAPI';
const SidebarAdmin = () => {
    const { isActiveSidebar } = useContext(AdminContext); 

    return (
        <>
            <nav className=" sidebar pt-3 navbar-expand-lg ">
                <div className="container-fluid text-center px-0">
                    <div className='w-100 px-3'>
                        <h4 className=''>Trang Quản Trị</h4>
                        <div className='d-flex w-100 justify-content-start align-items-center mt-5'>
                            <img className='rounded-circle me-4' style={{ height: '50%', width: '3rem' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEbQQVL316EnOguTFMcyWbTEnBqbD98ungpw&usqp=CAU" alt="" />
                            <h4>Admin</h4>
                        </div>
                    </div>

                    <div className="offcanvas-xl  offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <div className='text-white'>
                                <h4 className=''>Trang Quản Trị</h4>
                                <div className='d-flex w-100 justify-content-start align-items-center mt-5'>
                                    <img className='rounded-circle me-4' style={{ height: '50%', width: '3rem' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEbQQVL316EnOguTFMcyWbTEnBqbD98ungpw&usqp=CAU" alt="" />
                                    <h4>Admin</h4>
                                </div>
                            </div>

                            <button type="button" className="btn-close bg-white" data-bs-dismiss="offcanvas" href="#offcanvasExample" aria-label="Close" />
                        </div>
                        <div className="offcanvas-body px-0 mt-3">
                            <div className="w-100 d-flex flex-column align-items-start" style={{ height: '400px' }}>
                                <div className='w-100' style={{ listStyle: 'none', padding: '0', marginTop: '2rem' }}>
                                    <Link className='itemSidebar d-flex mb-2' to={'/admin'} style={{ flex: '9', textAlign: 'start', textDecoration: 'none', color: 'white' }}>
                                        <i className="fa-solid fa-house mt-1 me-3"></i>
                                        Bảng điều khiển
                                    </Link>
                                    <Link className='itemSidebar d-flex mb-2' to={'/admin/post'} style={{ flex: '9', textAlign: 'start', textDecoration: 'none', color: 'white' }}>
                                        <i className="fa-solid fa-file mt-1 me-3" ></i>
                                        Bài viết
                                    </Link>
                                    <Link className='itemSidebar d-flex mb-2' to={'/admin/comment'} style={{ flex: '9', textAlign: 'start', textDecoration: 'none', color: 'white' }}>
                                        <i className="fa-solid fa-comment mt-1 me-3" ></i>
                                        Bình luận
                                    </Link>
                                    <Link className='itemSidebar d-flex mb-2' to={'/admin/listroom'} style={{ flex: '9', textAlign: 'start', textDecoration: 'none', color: 'white' }}>
                                        <i className="fa-solid fa-hotel mt-1 me-3" ></i>
                                        Danh sách phòng
                                    </Link>
                                    <Link className='itemSidebar d-flex mb-2' to={'/admin/facilities'} style={{ flex: '9', textAlign: 'start', textDecoration: 'none', color: 'white' }}>
                                        <i className="fa-solid fa-tv mt-1 me-3" ></i>
                                        Cơ sở vật chất
                                    </Link>
                                    <Link className='itemSidebar d-flex mb-2' to={'/admin/bookroom'} style={{ flex: '9', textAlign: 'start', textDecoration: 'none', color: 'white' }}>
                                        <i className="fa-solid fa-wallet mt-1 me-3" ></i>
                                        Danh sách đặt phòng
                                    </Link>
                                    <Link className='itemSidebar d-flex mb-2' to={'/admin/user'} style={{ flex: '9', textAlign: 'start', textDecoration: 'none', color: 'white' }}>
                                        <i className="fa-solid fa-user mt-1 me-3" ></i>
                                        Người dùng
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </nav>
        </>



    );
}

export default SidebarAdmin;
