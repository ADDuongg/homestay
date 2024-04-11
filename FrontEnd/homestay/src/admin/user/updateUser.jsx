import React, { useEffect, useRef, useState } from 'react';
import Master from '../master';
import { Link, Navigate, useParams } from 'react-router-dom';
import http from '../../Axios';
import swal from 'sweetalert';
const UpdateUser = () => {
    const [selectImage, setImage] = useState(null);
    const [user, setUser] = useState({});
    const [input, setInput] = useState({});
    const newpass = useRef();
    const confirmpass = useRef()
    const oldpass = useRef()

    const params = useParams();
    useEffect(() => {
        http.get(`/api/user/${params.id}`)
            .then(res => {
                console.log(res.data.user.image);
                setUser(res.data.user)
                /* setImage(res.data.user.image) */
            })
    }, [])
    function handleImage(e) {
        var file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    }

    function handleInput(e) {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    console.log(user);
    console.log(selectImage);
    function handleInfo() {
        var formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('number', user.number);
        formData.append('role', user.role);
        if (selectImage) {
            formData.append('image', selectImage);
        }
        formData.append('_method', 'PUT');
        http.post(`/api/updateUser/${params.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                if (res.data.status === 200) {
                    swal('Thông báo', res.data.message, 'success')
                        .then(function () {
                            window.location.href = '/admin/user'
                        })
                }
                else {
                    swal('Thông báo', res.data.message, 'error');
                }
            })
    }
    function handlePassword() {
        const newPassword = newpass.current.value;
        const confirmPassword = confirmpass.current.value;
        const old_pass = oldpass.current.value;
        if (newPassword != confirmPassword) {
            swal('Thông báo', 'Mật khẩu mới không khớp', 'error')
        }
        var formData = new FormData();
        formData.append('new_password', newPassword);
        formData.append('old_password', old_pass);
        formData.append('_method', 'PUT');
        http.post(`/api/updateUser/${params.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if (res.data.status === 200) {
                swal('Thông báo', res.data.message, 'success')
                    .then(function () {
                        window.location.href = '/admin/user'
                    })
            }
            else {
                swal('Thông báo', res.data.message, 'error');
            }
        })

    }
    
    return (
        <div>
            <Master>
                <section className='updateUser'>
                    <div className="container mt-5 w-100 mx-auto">
                        <div className="row">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link style={{ fontSize: '20px' }} to={'/admin'} href="#">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: '20px' }}><Link style={{ fontSize: '20px' }} to={'/admin/user'} href="#">User</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: '20px' }}>Update User</li>
                                </ol>
                            </nav>
                            <div className='col-12 bg-white py-3 px-0' style={{ borderRadius: '10px' }}>
                                <h4 className='w-100 text-start ps-3 border-1 border-bottom pb-3'>User Infor</h4>

                                <div className="w-100  d-flex justify-content-start py-4 ps-3" >

                                    <div style={{ flex: '2' }} className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>

                                        {selectImage ? (
                                            <img className='rounded-circle' src={`${URL.createObjectURL(selectImage)}`} alt="Selected" style={{ width: '10rem', height: '10rem' }} />
                                        ) : (
                                            <img className='rounded-circle' src={`${process.env.REACT_APP_IMAGE_PATH}/${user.image_path}`} alt="..." style={{ width: '10rem', height: '10rem' }} />
                                        )}
                                        <input onChange={handleImage} type="file" name='image' className='form-control mt-3' />
                                    </div>
                                    <div className='px-3' style={{ flex: '8' }}>
                                        <div className='userInfo'>

                                            <div className="mb-3">
                                                <label htmlFor="name" className='d-flex'>Name <div className='text-danger'>*</div></label>
                                                <input onChange={handleInput} name='name' type="text" className='form-control' value={user.name} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="email" className='d-flex'>Email <div className='text-danger'>*</div></label>
                                                <input onChange={handleInput} name='email' type="text" className='form-control' value={user.email} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="role" className='d-flex'>Role <div className='text-danger'>*</div></label>
                                                <select onChange={handleInput} name="role" id="" className='form-control' value={user.role}>
                                                    <option value="admin">Admin</option>
                                                    <option value="user">User</option>
                                                </select>
                                            </div>

                                            <button onClick={handleInfo} className='btn btn-dark text-white'>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-100 bg-white d-flex flex-column py-4 col-12 mt-3 px-0" style={{ borderRadius: '10px' }}>
                                <h4 className='border-1 border-bottom pb-3 px-3'>User Password</h4>
                                <div className='px-3' style={{ flex: '8' }}>
                                    <div className='userPassword'>
                                        <div className="mb-3">
                                            <label htmlFor="name" className='d-flex'>Password <div className='text-danger'>*</div></label>
                                            <input ref={oldpass} type="password" name='old_password' className='form-control' />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="newpassword" className='d-flex'>New Password <div className='text-danger'>*</div></label>
                                            <input ref={newpass} type="password" name='newpassword' className='form-control' />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="name" className='d-flex'>Number <div className='text-danger'>*</div></label>
                                            <input ref={oldpass} type="text" name='number' className='form-control' />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="confirmpassword" className='d-flex'>Confirm Password <div className='text-danger'>*</div></label>
                                            <input ref={confirmpass} type="password" name='confirmpassword' className='form-control' />
                                        </div>
                                        <button onClick={handlePassword} className='btn btn-primary text-white'>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Master>
        </div>
    );
}

export default UpdateUser;
