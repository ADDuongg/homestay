import React, { useState } from 'react';
import Master from '../master';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import http from '../../Axios';
import swal from 'sweetalert';
const AddPost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [status, setStatus] = useState(1)
    const [selectImage, setSelectImage] = useState(null);
    function handleTitle(e) {
        setTitle(e.target.value)
    }
    function handleContent(e) {
        setContent(e.target.value)
    }
    function handleStatus(e) {
        setStatus(e.target.value)
    }
    const handleImages = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectImage(file);
        }
    };
    function handleSave() {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('status', status);
        if (selectImage) {
            formData.append('image', selectImage);
        }

        http.post('/api/addPost', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                if (res.data.message) {
                    swal('Thông báo', res.data.message, 'success')
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Xử lý lỗi
            });
    }
    function handleReset() {
        setTitle('')
        setContent('')
        setStatus(1)
        setSelectImage(null)
    }
    console.log(selectImage);
    return (
        <div>
            <Master>
                <section className='addPost mt-5'>
                    <div className="container">
                        <div className="row">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link style={{ fontSize: '20px' }} to={'/admin'} href="#">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: '20px' }}><Link style={{ fontSize: '20px' }} to={'/admin/post'} href="#">Posts</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: '20px' }}>Add Post</li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row  mt-3 g-4">
                            <div className="bg-white col-lg-8 col-md-6 col-12 shadow me-3 p-3" style={{ borderRadius: '10px' }}>
                                <div className='mb-5' style={{ height: '10rem' }}>
                                    <label htmlFor="" className='d-flex'><h5>Title</h5> <div className='text-danger ms-1'>*</div></label>
                                    <input type="text" name='title' className='form-control h-100' onChange={handleTitle} />
                                </div>
                                <div className='mb-3 mt-5' style={{ height: '15rem' }}>
                                    <label htmlFor="" className='d-flex'><h5>Content</h5> <div className='text-danger ms-1'>*</div></label>
                                    
                                    <input type="text" name='content' className='form-control h-100' onChange={handleContent} />
                                </div>
                                <div className='mb-3 mt-5'>
                                    <label htmlFor="" className='d-flex'><h5>Status</h5> <div className='text-danger ms-1'>*</div></label>
                                    <select onChange={handleStatus} name="status" id="" className='form-control'>
                                        <option value="1">Hiển thị</option>
                                        <option value="0">Ẩn</option>
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
                                            <input onChange={handleImages} name='image' type="file" className='form-control' />
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

export default AddPost;
