import React from 'react';
import Master from '../master';
import { useState } from 'react';
import swal from 'sweetalert';
import http from '../../Axios';
import { Link } from 'react-router-dom';
const AddUserForm = () => {
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        number:'',
        password: '',
        cfpassword: '',
        image: null,
        error: []
    });


    const [showPassword, setShowPassword] = useState(false);

    function handleInput(e) {

        setRegister(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    function HandleShowPassword(e) {
        setShowPassword(e.target.checked);
    }

    function handleImage(e) {
        var file = e.target.files[0];
        if (file) {
            setRegister(prevState => ({ ...prevState, image: file }))
        }
    }
    
    async function registerSubmit(e) {
        e.preventDefault();
        const data = new FormData()
        data.append('name', registerInput.name)
        data.append('email', registerInput.email)
        data.append('password', registerInput.password)
        data.append('image', registerInput.image)
        try {
            await http.get('/sanctum/csrf-cookie');
            const response = await http.post('/api/addUser', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.validation_errors) {
                swal('Thông báo', 'Có lỗi xảy ra', 'error')
            }
            else if (response.data.status === 200) {

                swal('Thông báo', 'Thêm người dùng thành công', 'success')

            }

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div>
            <Master>
                <div className="container mt-5">
                    <div className="row">

                        <main>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link style={{ fontSize: '20px' }} to={'/admin'} href="#">Home</Link></li>
                                    <li className="breadcrumb-item " aria-current="page" style={{ fontSize: '20px' }}><Link style={{ fontSize: '20px' }} to={'/admin/user'} href="#">User</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: '20px' }}>Add User</li>
                                </ol>
                            </nav>
                            <div className="card w-50 mx-auto my-5 " >
                                <div className="card-header">
                                    <h4>Add new User</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={registerSubmit}>
                                        <div>
                                            <div className="mb-3">
                                                <label className="form-label">Name</label>
                                                <input onChange={handleInput} name="name" type="text" className="form-control" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Email address</label>
                                                <input onChange={handleInput} name="email" type="email" className="form-control" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Number</label>
                                                <input onChange={handleInput} name="number" type="number" className="form-control" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Avatar</label>
                                                <input onChange={handleImage} name="image" type="file" className="form-control" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Password</label>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="form-control"
                                                    id="passwordInput"
                                                    placeholder="Enter your password"
                                                    onChange={handleInput}
                                                    name="password"
                                                />
                                            </div>
                                            {/* <div className="mb-3">
                                    <label className="form-label">Confirm Password</label>
                                    <input onChange={handleInput} name="cfpassword" type="cfpassword" className="form-control" />
                                </div> */}
                                            <div className="mb-3 form-check">
                                                <input onChange={HandleShowPassword} type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" htmlFor="exampleCheck1">Show password</label>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </Master>
        </div>
    );
}

export default AddUserForm;
