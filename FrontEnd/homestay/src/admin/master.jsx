import React, { useState } from 'react';
import '../admin.css';
import { Navigate, useNavigate } from 'react-router-dom';
import http from '../Axios';
import Cookies from 'js-cookie';
import HeaderAdmin from '../component/headerAdmin';
import SidebarAdmin from '../component/sidebarAdmin';
import { AdminContext } from '../contextAPI';

const Master = ({ children }) => {
    const [isActiveSidebar, setIsActiveSidebar] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        http.post('/api/logout')
            .then(res => {
                if (res.data.status === 200) {
                    navigate('/login');
                    Cookies.remove('access_token');
                    Cookies.remove('user');
                }
            });
    };
    const showSidebar = () => {
        setIsActiveSidebar(!isActiveSidebar);
    };
    const contextValue = {
        isActiveSidebar,
        setIsActiveSidebar,
        handleLogout,
        showSidebar
    };

    const token = Cookies.get('access_token');

    if (!token) {
        return <Navigate to={'/login'} />;
    }

    return (
        <AdminContext.Provider value={contextValue}>
            <div className="d-flex " >
                <SidebarAdmin />
                <div className="content px-0 pt-0" style={{ backgroundColor: '#EBEBF1' }}>
                    <HeaderAdmin />
                    <div className="detailContent">
                        {children}
                    </div>
                </div>
            </div>
        </AdminContext.Provider>
    );
};

export default Master;
