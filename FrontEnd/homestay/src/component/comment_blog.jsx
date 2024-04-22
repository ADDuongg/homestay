import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import http from '../Axios';
import { useParams } from 'react-router-dom';

const CommentBlog = () => {
    const [commentBlog, setCommentBlog] = useState([]);
    const [comment, setComment] = useState('');
    const [showMore, setShowMore] = useState(false);
    const params = useParams();

    function handleInput(e) {
        setComment(e.target.value);
    }

    useEffect(() => {
        fetchCommentBlog();
    }, []);

    async function fetchCommentBlog() {
        const response = await http.get(`/api/comment_blog/${params.id}`);
        setCommentBlog(response.data.comment_blog);
    }

    async function handleComment() {
        var user = JSON.parse(Cookies.get('user'));
        if (!user) {
            swal('Thông báo', 'Vui lòng đăng nhập để bình luận', 'warning');
            return;
        }
        var data = new FormData();
        data.append('user_id', user.id);
        data.append('comment', comment);
        data.append('blog_id', params.id);
        const response = await http.post('/api/comment_blog', data);
        if (response.data.status === 200) {
            swal('Thông báo', 'Bình luận thành công', 'success');
            fetchCommentBlog();
        }
    }

    function toggleShowMore() {
        setShowMore(prevState => !prevState);
    }
    
    return (
        <div>
            <div className="row g-5 mt-3">
                <p className='fw-bold m-0' style={{ fontSize: '20px' }}>Danh sách bình luận</p>
                <div className="col-md-12 col-lg-8 mt-4">
                    <div className="divListComment h-100">
                        <div className='w-100 divWrapper' style={{ height: showMore ? 'auto' : '10rem', overflowY: 'hidden' }}>
                            {commentBlog.map((item, index) => (
                                item.status === 0 && (
                                    <div key={index} className='d-flex w-50 mb-3 divComment'>
                                        <div className="imageuser h-100" style={{ flex: '2' }}>
                                            <img style = {{height: '50px', width: '50px'}} className=' rounded-circle' src={process.env.REACT_APP_IMAGE_PATH + `/${item.image_path}`} alt="" />
                                        </div>
                                        <div className="commentContent" style={{ flex: '8' }}>
                                            <div className='fw-bold'>{item.name}</div>
                                            <div style={{ color: 'rgb(240, 162, 18)' }}>{item.time}</div>
                                            <div>{item.content}</div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-75 text-center'>
                {commentBlog?.length >= 3 ? (<button onClick={toggleShowMore} className='shadow mt-3 btn '><i className="fa-solid fa-plus"></i> Hiển thị thêm</button>) : (<></>)}
            </div>
            <div className="row g-5 mt-2">
                <div className="col-md-12 col-lg-8 mt-2">
                    <div className="divComment h-100">
                        <div className='p-5' style={{ backgroundColor: '#ECEDF1', height: '20rem' }}>
                            <label htmlFor="form-label">Nội dung</label>
                            <textarea onChange={handleInput} className='form-control mt-2' name="comment" id="" cols="30" rows="7" placeholder='Nhập nội dung bình luận ở đây...'></textarea>
                            <button onClick={handleComment} className='btn btn-warning mt-3 text-white'>Bình luận</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentBlog;
