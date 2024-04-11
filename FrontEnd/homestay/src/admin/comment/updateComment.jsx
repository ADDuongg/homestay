import React, { useEffect } from 'react';
import Master from '../master';
import { useState } from 'react';
import swal from 'sweetalert';
import http from '../../Axios';
import { Link, useParams } from 'react-router-dom';

const UpdateComment = () => {
    const [data, setData] = useState({
        content: '',
        status: 0
    });

    var params = useParams();

    useEffect(() => {
        http.get(`/api/commentBlog/${params.id}`)
            .then(res => {
                setData({
                    content: res.data.comment_blog.content,
                    status: res.data.comment_blog.status
                });
            })
            .catch(error => {
                console.error("Error fetching comment blog:", error);
            });
    }, [params.id]); 

    console.log(data);

    function handleInput(e) {
        setData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }
    function handleUpdate(){
        var formData = new FormData()
        formData.append('_method','PUT')
        formData.append('content',data.content)
        formData.append('status',data.status)
        http.post(`/api/commentBlog/${params.id}`, formData)
        .then(res => {
            if(res.data.status === 200){
                swal('Thông báo',res.data.message,'success')
            }
        }).catch(err => {
            swal('Thông báo','Có lỗi xảy ra','error')
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
                                    <li className="breadcrumb-item " aria-current="page" style={{ fontSize: '20px' }}><Link style={{ fontSize: '20px' }} to={'/admin/comment'} href="#">Comment</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: '20px' }}>Update Comment</li>
                                </ol>
                            </nav>
                            <div className="card w-50 mx-auto my-5 " >
                                <div className="card-header">
                                    <h4>Update Comment</h4>
                                </div>
                                <div className="card-body">
                                    <div >
                                        <div>
                                            <div className="mb-3">
                                                <label className="form-label">Content</label>
                                                <input value={data.content || ''} onChange={handleInput} name="content" type="text" className="form-control" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Status</label>
                                                <select value={data.status || 0} onChange={handleInput} name="status" className='form-control' id="">
                                                    <option value="0">Hiển thị</option>
                                                    <option value="1">Ẩn</option>
                                                </select>
                                            </div>
                                            <button onClick={handleUpdate} type="submit" className="btn btn-primary">Submit</button>
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

export default UpdateComment;
