import React, { useContext } from 'react';
import { AdminContext } from '../contextAPI';
import { Link } from 'react-router-dom';

const HeaderAdmin = () => {

    const { showSidebar, handleLogout } = useContext(AdminContext)
    return (
        <div>
            <div className="w-100">
                <div className="navbar navbar-expand-sm bg-body-tertiary shadow">
                    <div className="container-fluid">
                        <button className="btn btnsidebar" type="button" data-bs-toggle="offcanvas" href="#offcanvasExample" >
                            <i className="fa-solid fa-bars"></i>
                        </button>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <i className="fa-regular fa-bell mt-3 me-3" style={{ fontSize: '25px', marginTop: '10px' }}></i>
                                </li>
                                <li className="nav-item dropdown dropdown-menu-lg-end d-flex align-items-center">

                                    <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img className='rounded-circle me-2 border border-2' style={{ height: '100%', width: '3rem' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEbQQVL316EnOguTFMcyWbTEnBqbD98ungpw&usqp=CAU" alt="" />
                                        <div>Duong Nguyen</div>
                                    </a>
                                    <ul className="dropdown-menu" style={{ left: '' }}>
                                        <li><Link to={'/admin/profile'} className="dropdown-item" href="#"><i className="fa-solid fa-user mt-3 me-3" style={{ fontSize: '20px', marginTop: '10px' }}></i>My Profile</Link></li>
                                        <li><Link to={'/admin/profile'} className="dropdown-item" href="#"><i className="fa-solid fa-gear mt-3 me-3" style={{ fontSize: '20px', marginTop: '10px' }}></i>Account Setting</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li onClick={handleLogout}><a className="dropdown-item" href="#"><i className="fa-solid fa-right-from-bracket mt-3 me-3" style={{ fontSize: '20px', marginTop: '10px' }}></i>Sign out</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderAdmin;
