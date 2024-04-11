import React, { useState, useEffect } from 'react';
import Master from '../master';
import { Link, useParams } from 'react-router-dom';
import http from '../../Axios';
import swal from 'sweetalert';
const AddRoomFacilities = () => {
    const [idFacilities, setIdFacilities] = useState('');
    const [room, setRoom] = useState({});
    const [facilities, setFacilities] = useState([]);
    const params = useParams();
    useEffect(() => {
        async function getRoom() {
            await http.get(`/api/room/${params.id}`)
                .then(res => {
                    var userResponse = res.data.detail_room
                    setRoom(userResponse)
                })
        }
        async function getFacilities() {
            await http.get(`/api/getAllFacilities`)
                .then(res => {
                    var userResponse = res.data.facilities
                    setFacilities(userResponse)
                })
        }
        getRoom()
        getFacilities()
    }, [])
    console.log(room);
    function handleInput(e) {
        var id = e.target.value
        setIdFacilities(id);

    }
    function handleSubmit() {
        if (!idFacilities) {
            // Hiển thị thông báo cho người dùng nếu không chọn cơ sở vật chất muốn xóa
            swal('Thông báo', 'Vui lòng chọn cơ sở vật chất muốn thêm', 'warning');
            return;
        }
        var data = new FormData();
        data.append('id', room.id);
        data.append('facilities_id', idFacilities);
        http.post(`/api/roomfacilities/${room.id}`, data)
            .then((res) => {
                if (res.data.status === 200) {
                    swal('Thông báo', res.data.message, 'success')
                }
                else {
                    swal('Thông báo', res.data.message, 'warning')
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
                                    <li className="breadcrumb-item " aria-current="page" style={{ fontSize: '20px' }}><Link style={{ fontSize: '20px' }} to={'/admin/listroom'} href="#">Rooms</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: '20px' }}>Add Room Facilities</li>
                                </ol>
                            </nav>
                            <div className="card w-50 mx-auto my-5 " >
                                <div className="card-header">
                                    <p style={{fontSize: '25px', fontWeight: '400'}}>Add new Room Facilities</p>
                                </div>
                                <div className="card-body">
                                    <div >
                                        <div>
                                            <div className='mb-3' >
                                                <label htmlFor="" className='d-flex'><h5>Tên phòng</h5> <div className='text-danger ms-1'>*</div></label>
                                                <input value={room.name || ''} type="text" name='nameRoom' className='form-control' readOnly style={{ backgroundColor: '#80808073' }} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Chọn cơ sở vật chất</label>
                                                <select onChange={handleInput} name="icon" id="" className='form-control'>
                                                    <option value="">-----Select-----</option>
                                                    {facilities.map((item, index) => (
                                                        <option key={index} value={item.id}>{item.name}</option>
                                                    ))}
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

export default AddRoomFacilities;
