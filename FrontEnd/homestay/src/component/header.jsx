import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Cookies from 'js-cookie';
import http from '../Axios';
const Header = () => {
    
    
    const userCookie = Cookies.get('user')?JSON.parse(Cookies.get('user')):null;
    

    function handleLogout() {
        http.post('/api/logout')
        .then(res =>{
            if(res.data.status === 200){
                Cookies.remove('access_token')
                Cookies.remove('user')
                window.location.reload()
            }
        })
    }
    return (
        <div className='header'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid ">
                    <a className="navbar-brand" href="#">HT Hotel</a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={'/room'}>Room</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={'/blog'}>Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={'/thingsToDo'}>Things To Do</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={'/facilities'}>Facilities</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={'/contact'}>Contact</Link>
                            </li>
                        </ul>

                    </div>

                    {userCookie ? <div className="dropdown">
                        <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {userCookie.name}
                        </button>
                        <ul className="dropdown-menu" style={{ left: '-100%' }}>
                            <li><Link to={'/user'} className="dropdown-item" href="#"><i className="fa-solid fa-user mt-3 me-3 text-secondary" style={{ fontSize: '20px', marginTop: '10px' }}></i>My Profile</Link></li>
                            <li><Link to={'/booking'} className="dropdown-item" href="#"><i className="fa-solid fa-server mt-3 me-3 text-warning" style={{ fontSize: '20px', marginTop: '10px' }}></i>My Reservation</Link></li>
                            <li><Link to={'/user'} className="dropdown-item" href="#"><i className="fa-solid fa-gear mt-3 me-3 text-primary" style={{ fontSize: '20px', marginTop: '10px' }}></i>Account Setting</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li onClick={handleLogout}><div className="dropdown-item"><i className="fa-solid fa-right-from-bracket mt-3 me-3 text-danger" style={{ fontSize: '20px', marginTop: '10px' }}></i>Sign out</div></li>
                        </ul>
                    </div> : <Link to={'/login'} className=" btn btn-success rounded-pill" >login</Link>}
                    {/* <Link to={'/login'} className=" btn btn-success rounded-pill" >login</Link> */}
                </div>
            </nav>


        </div>
    );
}

export default Header;
