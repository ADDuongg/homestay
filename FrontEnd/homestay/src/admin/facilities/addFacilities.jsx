import React, { useState } from 'react';
import Master from '../master';
import { Link } from 'react-router-dom';
import http from '../../Axios';
import swal from 'sweetalert';
const AddFacilities = () => {
    const [name, setName] = useState({});
    const [icon, setIcon] = useState({});

    function handleInput(e) {
        var index = e.target.selectedIndex
        var name = e.target[index].text
        var icon = e.target.value
        setName(name);
        setIcon(icon)
    }
    async function handleSubmit(){
        var data = new FormData();
        data.append('name',name);
        data.append('icon',icon);
        /* await http.get("/sanctum/csrf-cookie") */
        await http.post('/api/facilities', data)
        .then((res)=>{
            if(res.data.status === 200){
                swal('Thông báo', res.data.message,'success')
            }
            else{
                swal('Thông báo', res.data.message,'warning')
            }
        })
        
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
                                    <li className="breadcrumb-item " aria-current="page" style={{ fontSize: '20px' }}><Link style={{ fontSize: '20px' }} to={'/admin/facilities'} href="#">Facilities</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: '20px' }}>Add Facilities</li>
                                </ol>
                            </nav>
                            <div className="card w-50 mx-auto my-5 " >
                                <div className="card-header">
                                    <h4>Add new Facilities</h4>
                                </div>
                                <div className="card-body">
                                    <div >
                                        <div>
                                            <div className="mb-3">
                                                <label className="form-label">Chọn cơ sở vật chất</label>
                                                <select onChange={handleInput} name="icon" id="" className='form-control'>
                                                <option value="">-----Select-----</option>
                                                    <option value="<i style={{ fontSize: '20px' }} class='fa-solid fa-temperature-half fw-bold text-primary'></i>">Điều hòa</option>
                                                    <option value="<i style={{ fontSize: '20px' }} class='fa-solid fa-wifi fw-bold text-primary'></i>">WiFi</option>
                                                    <option value="<i style={{ fontSize: '20px' }} class='fa-solid fa-tv fw-bold text-primary'></i>">TV</option>
                                                    <option value="<i style={{ fontSize: '20px' }} class='fa-solid fa-bell-concierge fw-bold text-primary'></i>">Phục Vụ</option>
                                                    <option value="<i style={{ fontSize: '20px' }} class='fa-solid fa-martini-glass-empty fw-bold text-primary'></i>">Đồ uống sẵn</option>
                                                    <option value="<i style={{ fontSize: '20px' }} class='fa-solid fa-laptop fw-bold text-primary'></i>">Laptop</option>
                                                    <option value="<i style={{ fontSize: '20px' }} class='fa-solid fa-vault fw-bold text-primary'></i>">Két an toàn</option>
                                                </select>

                                            </div>


                                            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </Master>
        </div>
    );
}

export default AddFacilities;
