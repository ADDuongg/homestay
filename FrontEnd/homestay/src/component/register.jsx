import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';
import http from '../Axios';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
const Register = () => {
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        number: '',
        cfpassword: '',
        error: []
    });
    const userCookie = Cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie) : null;
    const [showPassword, setShowPassword] = useState(false);

    function handleInput(e) {

        setRegister(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    function HandleShowPassword(e) {
        setShowPassword(e.target.checked);
    }

    async function registerSubmit(e) {
        e.preventDefault();
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            number: registerInput.number,
        };

        try {
            await http.get('/sanctum/csrf-cookie');
            const response = await http.post('/api/register', data);

            if (response.data.validation_errors) {
                swal('Thông báo', 'Có lỗi xảy ra', 'error')
            }
            else if (response.data.status === 200) {

                swal('Thông báo', 'Đăng kí thành công', 'success')

            }

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    function handleLogout() {
        http.post('/api/logout')
            .then(res => {
                if (res.data.status === 200) {
                    Cookies.remove('access_token')
                    Cookies.remove('user')
                    window.location.reload()
                }
            })
    }
    return (
        <div>
            <Header />
            <main>
                <div className="card w-50 mx-auto my-5">
                    <div className="card-header">
                        <h4>Sign Up</h4>
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
                                <div className="mb-3">
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        className="form-control"
                                        placeholder="Enter your phone number"
                                        onChange={handleInput}
                                        name="number"
                                    />
                                </div>
                                {/* <div className="mb-3">
                                    <label className="form-label">Confirm Password</label>
                                    <input onChange={handleInput} name="cfpassword" type="cfpassword" className="form-control" />
                                </div> */}
                                <div className="mb-3 form-check">
                                    <input checked onChange={HandleShowPassword} type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Show password</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Register;
