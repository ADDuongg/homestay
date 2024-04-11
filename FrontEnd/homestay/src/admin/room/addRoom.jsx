import React, { useState, useEffect } from 'react';
import Master from '../master';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import http from '../../Axios';
const AddRoom = () => {
    const [loading, setLoading] = useState(false)
    const [iconName, setIconName] = useState({});
    const [icon, setIcon] = useState({});
    const [room, setRoom] = useState({})
    const [selectImage, setSelectImage] = useState(null);
    function handleReset() {
        setRoom({});
        setSelectImage(null);
        document.querySelectorAll('input').forEach(input => input.value = '');
        document.querySelectorAll('select').forEach(select => select.value = '');
    }


    function handleSave() {
        var checkPrice = parseFloat(room.rent_cost);
        if (isNaN(checkPrice)) {
            swal('Thông báo', 'Vui lòng nhập đúng giá thuê phòng', 'error');
            return;
        }
        var data = new FormData();
        data.append('name', room.name);
        data.append('floor', room.floor);
        data.append('type_room', room.type_room);
        data.append('max_number_people', room.max_number_people);
        data.append('rent_cost', room.rent_cost);
        data.append('status', room.status);
        data.append('icon', icon);
        data.append('icon_name', iconName);
        if (selectImage) {
            data.append('image', selectImage);
        }
        http.post('/api/room', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                if (res.data.status === 200) {
                    swal('Thông báo', res.data.message, 'success')
                }
                else {
                    swal('Thông báo', res.data.message, 'error')
                }
            })
    }

    function handleInput(e) {
        setRoom((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectImage(file);
        }
    };
    function handleIcon(e) {
        var index = e.target.selectedIndex
        var name = e.target[index].text
        var icon = e.target.value
        setIconName(name);
        setIcon(icon)
    }
    /* console.log(iconName); */
    return (
        <div>
            <Master>
                <section className='managePost'>
                    <div className="container w-100 mx-auto mt-2">
                        <div className="row justify-content-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link style={{ fontSize: '20px' }} to={'/admin'} href="#">Home</Link></li>
                                    <li className="breadcrumb-item"><Link style={{ fontSize: '20px' }} to={'/admin/listroom'} href="#">Rooms</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: '20px' }}>Add Room</li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row  mt-3 g-4">
                            <div className="bg-white col-lg-9 col-md-6 col-12 shadow p-4" style={{ borderRadius: '10px' }}>
                                <div className='mb-3' >
                                    <label htmlFor="" className='d-flex'><h5>Tên phòng</h5> <div className='text-danger ms-1'>*</div></label>
                                    <input onChange={handleInput} type="text" name='name' className='form-control' />
                                </div>
                                <div className='mb-3 '>
                                    <label htmlFor="" className='d-flex'><h5>Tầng</h5> <div className='text-danger ms-1'>*</div></label>
                                    <select onChange={handleInput} name="floor" id="" className='form-control'>
                                        <option value="">----- Chọn tầng ----</option>
                                        <option value="1">Tầng 1</option>
                                        <option value="2">Tầng 2</option>
                                        <option value="3">Tầng 3</option>
                                        <option value="4">Tầng 4</option>
                                        <option value="5">Tầng 5</option>
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="form-floating">
                                        <input onChange={handleInput} type="text" name='rent_cost' className="form-control" id="floatingInputGroup1" placeholder="Username" />
                                        <label for="rent_cost">Giá thuê</label>
                                    </div>
                                    <span className="input-group-text fw-bold">vnd</span>
                                </div>
                                <div className='mb-3 '>
                                    <label htmlFor="" className='d-flex'><h5>Số người thuê tối đa</h5> <div className='text-danger ms-1'>*</div></label>
                                    <select onChange={handleInput} name="max_number_people" id="" className='form-control'>
                                        <option value="">----- Chọn số người thuê tối đa ----</option>
                                        {[...Array(10)].map((_, index) => (
                                            <option key={index + 1} value={index + 1}>{index + 1} người</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3 '>
                                    <label htmlFor="" className='d-flex'><h5>Loại phòng</h5> <div className='text-danger ms-1'>*</div></label>
                                    <select onChange={handleInput} name="type_room" id="" className='form-control'>
                                        <option value="">----- Chọn loại phòng ----</option>
                                        <option value="1">Phòng VIP</option>
                                        <option value="0">Phòng Thường</option>
                                        
                                    </select>
                                </div>
                                <div className='mb-3 '>
                                    <label htmlFor="" className='d-flex'><h5>Trạng thái</h5> <div className='text-danger ms-1'>*</div></label>
                                    <select onChange={handleInput} name="status" id="" className='form-control'>
                                        <option value="">----- Chọn trạng thái phòng ----</option>
                                        <option value="1">Đang thuê</option>
                                        <option value="0">Đang trống</option>

                                    </select>
                                </div>
                                
                            </div>
                            <div className="bg-white col-lg-3 col-md-6 col-12 shadow  py-3" style={{ borderRadius: '10px' }}>
                                <div className="container px-0">
                                    <div className="row">
                                        <h5 className='border-1 border-bottom pb-2'>Action</h5>
                                        <div className='d-flex justify-content-start pt-2 mb-5'>
                                            <button onClick={handleSave} className='btn btn-primary text-white me-3'><i className="fa-solid fa-check me-2"></i>Save</button>
                                            <button onClick={handleReset} className='btn btn-danger'><i className="fa-solid fa-arrow-rotate-left me-2"></i>Reset</button>
                                        </div>
                                        <h5 className='border-1 border-bottom pb-2'>Images</h5>
                                        <div className='mt-3'>
                                            <input onChange={handleImage} name='image' type="file" className='form-control' />
                                            <div className="images w-100 w-100 mt-3">
                                                {selectImage && <img src={URL.createObjectURL(selectImage)} alt="Selected" style={{ width: '100%', height: '80%' }} />}
                                            </div>
                                        </div>
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

export default AddRoom;
