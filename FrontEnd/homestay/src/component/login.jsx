import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';
import getCookie from '../cookie';
import { Link, useNavigate } from 'react-router-dom';
import http from '../Axios'
import swal from 'sweetalert';
/* import { useContextAPI } from '../contextAPI'; */
import Cookies from 'js-cookie'
const Login = () => {
    /* const { setUser, setAccessToken } = useContextAPI(); */
    const navigate = useNavigate();
    /* const [user, setUser] = useState({}) */
    const [showPassword, setShowPassword] = useState(false);
    const [loginInput, setLoginInput] = useState({
        email: '',
        password: '',
        error_list: []  
    })
   
    function handleInput(e) {
        setLoginInput(prevState => ({ ...prevState, [e.target.name]: e.target.value })
        );

    }
    function HandleShowPassword(e) {
        setShowPassword(e.target.checked);
    }
    async function submitForm(e) {
        e.preventDefault();

        var data = {
            email: loginInput.email,
            password: loginInput.password,

        }
        try {
            await http.get("/sanctum/csrf-cookie").then(res => {
                http.post("/api/login", data)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.validation_errors) {
                            setLoginInput({ ...loginInput, error_list: res.data.validation_errors })
                            swal("Thông báo", "Lỗi đăng nhập", "error");
                        }
                        if (res.data.status == 401) {
                            swal("Thông báo", "Tài khoản mật khẩu không chính xác", "error");
                        }
                        if (res.data.status == 200) {
                            /* setUser(res.data.user) */
                            const user_response = res.data.user
                            const user = JSON.stringify(user_response)
                            Cookies.set('user', user)
                            Cookies.set('access_token', res.data.token)
                            /* console.log(user); */

                            swal("Thông báo", `Đăng nhập thành công`, "success")
                                .then(() => {
                                    navigate('/')
                                    if (res.data.role === 'admin') {
                                        navigate('/admin')
                                    } else if (res.data.role === 'user') {
                                        navigate('/')
                                    }
                                    console.log(res.data.role);
                                });
                        }
                    })
                    .catch(err => {
                        swal('Thông báo','Có lỗi xảy ra, vui lòng thử lại','error')
                    })
            })
        } catch (error) {
            console.log(error);
        }
    }
    const userCookie = Cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie) : null;

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
                        <h4>Login</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={submitForm}>
                            <div>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input name='email' onChange={handleInput} type="email" className="form-control" />
                                    <span className='text-danger'>{loginInput.error_list.email}</span>
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input name='password' onChange={handleInput} type={showPassword ? 'text' : 'password'} className="form-control" />
                                    <span className='text-danger'>{loginInput.error_list.password}</span>
                                </div>
                                <div className="mb-3 p-0 form-check d-flex justify-content-between">
                                    <div className="d-flex">
                                        Not have an account yet? <Link to={'/register'} className="text-primary" >register</Link>
                                    </div>
                                    <div>
                                        <input onChange={HandleShowPassword} type="checkbox" className="form-check-input" />
                                        <label className="form-check-label" >Show password</label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>

                    </div>
                </div>

            </main>
            <Footer /></div>

    );
}

export default Login;
