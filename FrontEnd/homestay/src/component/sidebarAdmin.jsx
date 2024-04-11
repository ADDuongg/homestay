import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../contextAPI';
const SidebarAdmin = () => {
    const { isActiveSidebar } = useContext(AdminContext); // Sử dụng hook useContext để truy cập vào giá trị của isActiveSidebar từ context

    return (
        <div >
            <div className={`sidebar ${isActiveSidebar ? 'active-sidebar' : ''}`} style={{ backgroundColor: '#282B34', color: 'white', flex: '3', position: 'sticky', left: '0', top: '0' }}>
                <div className='px-4'>
                    <h4 className=''>Trang Quản Trị</h4>
                    <div className='d-flex w-100 justify-content-start align-items-center mt-5'>
                        <img className='rounded-circle me-4' style={{ height: '50%', width: '3rem' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEbQQVL316EnOguTFMcyWbTEnBqbD98ungpw&usqp=CAU" alt="" />
                        <h4>Admin</h4>
                    </div>
                </div>

                <ul style={{ listStyle: 'none', padding: '0', marginTop: '2rem' }}>
                    <li className='itemSidebar d-flex mb-2'><i className="fa-solid fa-house mt-1 me-3" style={{ flex: '1' }}></i> <Link to={'/admin'} style={{ flex: '9', textDecoration: 'none', color: 'white' }}>Bảng điều khiển</Link></li>
                    <li className='itemSidebar d-flex mb-2'><i className="fa-solid fa-file mt-1 me-3" style={{ flex: '1' }}></i> <Link to={'/admin/post'} style={{ flex: '9', textDecoration: 'none', color: 'white' }}>Bài viết</Link></li>
                    <li className='itemSidebar d-flex mb-2'><i className="fa-solid fa-comment mt-1 me-3" style={{ flex: '1' }}></i> <Link to={'/admin/comment'} style={{ flex: '9', textDecoration: 'none', color: 'white' }}>Bình luận</Link></li>
                    <li className='itemSidebar d-flex mb-2'><i className="fa-solid fa-hotel mt-1 me-3" style={{ flex: '1' }}></i> <Link to={'/admin/listroom'} style={{ flex: '9', textDecoration: 'none', color: 'white' }}>Danh sách phòng</Link></li>
                    <li className='itemSidebar d-flex mb-2'><i className="fa-solid fa-tv mt-1 me-3" style={{ flex: '1' }}></i><Link to={'/admin/facilities'} style={{ flex: '9', textDecoration: 'none', color: 'white' }}>Cơ sở vật chất</Link></li>
                    <li className='itemSidebar d-flex mb-2'><i className="fa-solid fa-wallet mt-1 me-3" style={{ flex: '1' }}></i> <Link to={'/admin/bookroom'} style={{ flex: '9', textDecoration: 'none', color: 'white' }}>Danh sách đặt phòng</Link></li>
                    <li className='itemSidebar d-flex mb-2'><i className="fa-solid fa-user mt-1 me-3" style={{ flex: '1' }}></i> <Link to={'/admin/user'} style={{ flex: '9', textDecoration: 'none', color: 'white' }}>Người dùng</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default SidebarAdmin;
