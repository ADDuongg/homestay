import React, { useRef, useEffect, useState } from 'react';
import Header from '../component/header';
import Footer from '../component/footer';
import ContactComponent from '../component/contact';
import { Link, useParams } from 'react-router-dom';

import http from '../Axios';
import CommentBlog from '../component/comment_blog';
const DetailBlog = () => {

    const params = useParams();
    const [show, setShow] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const inputSearch = useRef();
    const searchResultRef = useRef();
    const [blog, setBlog] = useState([]);

    const [currentBlog, setCurrentBlog] = useState({});
    useEffect(() => {
        /* debugger */
        const fetchData = async () => {
            const res = await http.get('/getAllpost');
            setBlog(res.data.posts);
            const currentBlogData = res.data.posts.find(item => item.id === parseInt(params.id));
            /* console.log(currentBlogData); */
            setCurrentBlog(currentBlogData);
        };
        fetchData();
    }, [params.id]);

    const handleClickOutside = (e) => {
        if (!inputSearch.current.contains(e.target) && !searchResultRef.current.contains(e.target)) {
            setShow(false);
        }
    };

    function handleSearch(e) {
        var valueSearch = e.target.value;
        setShow(true);
        const results = blog.filter((item) =>
            item.title.toLowerCase().includes(valueSearch.toLowerCase())
        );
        setSearchResult(results);
    }

    useEffect(() => {


        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    function handleNavigate(id) {
        window.location.href = `/detailBlog/${id}`;
    }

    return (
        <div>
            <Header />
            <main>
                <section className='imgBlog ' style={{ marginBottom: '5rem' }}>
                    <div className="blogText container text-white " style={{ zIndex: '2' }}>
                        <div className=' mx-auto text-center'>
                            <p className='fw-bold' style={{ fontSize: '80px', flex: '5' }}>Blogs</p>
                            <p style={{ fontSize: '20px', flex: '5' }}>Eu quam vulputate mollis vitae egestas facilisi mauris urna faucibus suspendisse at tempor orci felis eu nascetur.</p>
                        </div>
                    </div>
                    <div className='h-100 w-100 bgBlog' ></div>
                </section>
                <section className='blog mt-5'>
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-8 col-md-12" >
                                <div className='w-100 h-100'>
                                    <p style={{ fontSize: '20px', fontWeight: '500' }} dangerouslySetInnerHTML={{ __html: currentBlog ? currentBlog.title : '' }} />
                                    <p dangerouslySetInnerHTML={{ __html: currentBlog ? currentBlog.content : '' }} />
                                    <img className=' w-100' style={{ height: '40rem' }} src={currentBlog ? process.env.REACT_APP_IMAGE_PATH + `/${currentBlog.image_path}` : '...'} alt="" />
                                </div>
                            </div>
                            <div className="divSearchBlog col-lg-4 col-12  order-lg-2 order-1" style={{ height: '50rem' }} >
                                <div className='w-100 border border-1 h-100 p-4 ' style={{ backgroundColor: '#F9FAFE', position: 'relative' }}>
                                    <input onInput={handleSearch} ref={inputSearch} name='search' type="text" className='form-control mt-5 mb-5' placeholder='Tìm kiếm...' />
                                    <div ref={searchResultRef} className='w-100 bg-white border border-1 shadow rounded divSearchValue' style={{ position: 'absolute', zIndex: '999', left: '0', top: '7rem', height: '15rem', overflowY: 'auto', display: show ? 'block' : 'none' }}>
                                        {searchResult.map((item, index) => {
                                            if (item.status === 1) {
                                                return (
                                                    <div key={index}>
                                                        <div style={{ cursor: 'pointer' }}>
                                                            <div onClick={() => handleNavigate(item.id)} style={{ textDecoration: 'none', color: 'black' }} to={`/detailBlog/${item.id}`} className='post d-flex w-100 justify-content-between mb-3 p-3'>
                                                                {item && (
                                                                    <>
                                                                        <div style={{ flex: '3' }} className='me-3 post-image'>
                                                                            <img src={`${process.env.REACT_APP_IMAGE_PATH}/${item.image_path}`} className='h-100 w-100 rounded' alt="" />
                                                                        </div>
                                                                        <div style={{ flex: '7' }} className=''>
                                                                            <div className='mb-4 fw-bold' dangerouslySetInnerHTML={{ __html: item.title }} />
                                                                            <div className='d-flex'>
                                                                                <div className='me-3 d-flex'>
                                                                                    <i className="fa-regular fa-calendar-days mt-1 me-2"></i>
                                                                                    <p>May 20, 2022</p>
                                                                                </div>
                                                                                <i className="fa-solid fa-user mt-1 me-2"></i>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return null; // Không hiển thị mục nào nếu trạng thái khác 1
                                            }
                                        })}



                                    </div>
                                    <p style={{ fontWeight: '600' }}>Danh mục</p>
                                    <div className='w-100 d-flex flex-column'>
                                        <Link className='border-1 border-bottom my-3 pb-3' style={{ color: 'black', textDecoration: 'none' }} to={'/blog'}>Tin Tức</Link>
                                        <Link className='' style={{ color: 'black', textDecoration: 'none' }} to={'/room'}>Room</Link>
                                    </div>
                                    <p className='mt-5' style={{ fontWeight: '600' }}>Bài viết mới</p>
                                    <div className="w-100">
                                        <div className="divWrapper ww-100 " style={{ height: '310px', overflowY: 'auto' }}>
                                            {blog.map((item, index) => {
                                                if (item.status === 1) {
                                                    return (
                                                        <div key={index} onClick={() => handleNavigate(item.id)} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }} className='post d-flex w-100 justify-content-between mb-3'>
                                                            <div style={{ flex: '3' }} className='me-3 post-image'>
                                                                <img src={item ? process.env.REACT_APP_IMAGE_PATH + `/${item.image_path}` : '...'} className='h-100 w-100 rounded' alt="" />
                                                            </div>
                                                            <div style={{ flex: '7' }} className=''>
                                                                <div className='mb-4 fw-bold' dangerouslySetInnerHTML={{ __html: item ? item.title : '' }} />
                                                                <div className='d-flex'>
                                                                    <div className='me-3 d-flex'>
                                                                        <i className="fa-regular fa-calendar-days mt-1 me-2"></i>
                                                                        <p>May 20, 2022</p>
                                                                    </div>
                                                                    <i className="fa-solid fa-user mt-1 me-2"></i>
                                                                    <p>Admin</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                } else {
                                                    return null; // Không hiển thị blog có status khác 1
                                                }
                                            })}



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CommentBlog />
                    </div>
                </section>

                <ContactComponent />
            </main>
            <Footer />
        </div>
    );
}

export default DetailBlog;
