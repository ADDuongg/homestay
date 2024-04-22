import './App.css'
import './swiper.css'
import Header from './component/header.jsx';
import Footer from './component/footer.jsx';
import SearchHotel from './component/searchHotel.jsx';
import Contact from './component/contact.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import http from './Axios.js';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';

function App() {
  const [room, setRoom] = useState([]);
  const [blog, setBlog] = useState([]);
  const [comment, setComment] = useState([]);
  useEffect(() => {
    async function getRoom() {
      try {
        const response = await http.get('/getroom');

        setRoom(response.data.rooms.data);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    }
    async function getComment() {
      try {
        const response = await http.get('/getcomment');

        setComment(response.data.comment_blog.data);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    }

    async function getBlog() {
      try {
        const response = await http.get('/post');

        setBlog(response.data.posts.data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    }


    getRoom()
    getBlog()
    getComment()
  }, [])
  function handleBlog(id) {
    window.location.href = `/detailBlog/${id}`
  }
  function handleRoom(id) {
    window.location.href = `/detailRoom/${id}`
  }
  function handleAllRoom() {
    window.location.href = `/room`
  }
  function handleRoomShow() {
    window.location.href = `#emptyroom`
  }
  console.log(comment);
  return (
    <div className="App ">
      <Header />
      <main>
        <section className='imgHomepage '>
          <div className="welcomeText container text-white " style={{ zIndex: '2' }}>
            <div className='w-50'>
              <p style={{ fontSize: '30px' }}>Welcome to</p>
              <h2 className='fw-bold' style={{ fontSize: '80px' }}>HT Hotel in Cat Ba Town</h2>
              <p>Gravida maecenas mi iaculis non, posuere mattis urna, ac risus sit porta nunc nibh dictum proin leo dolor sed bibendum mi vitae mattis ipsum, in odio vitae purus pellentesque integer at ac.</p>
              <button onClick={handleRoomShow} className='btn btn-light'>Check Availability</button>
            </div>
          </div>
          <div className='h-100 w-100 bgimg' ></div>
        </section>

        {/* <SearchHotel setRoom = {setRoom} /> */}

        <section className='location pt-5' style={{ height: '400px' }}>
          <div className="container text-center">
            <p className='listLocation'>Danh sách </p>
            <h2>Địa danh nổi tiếng ở Cát Bà</h2>
          </div>
          <Swiper
            slidesPerView={'auto'}
            centeredSlides={true}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide className='position-relarive'>

              <div className="card" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <img src="https://static-images.vnncdn.net/files/publish/2022/7/30/vinh-lan-ha-767.jpg " className="card-img-top ww-100 h-100 rounded" alt="..." />
                <div className='w-auto px-3 nameLocation'>Vịnh Hạ Lan</div>
              </div>

            </SwiperSlide>
            <SwiperSlide className='position-relarive'>
              <div className="card" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <img src="images/baicatdua.png" className="card-img-top ww-100 h-100 rounded" alt="..." />
                <div className='w-auto px-3 nameLocation'>Bãi Cát Dứa</div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='position-relarive'>
              <div className="card" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <img src="https://manmo.vn/wp-content/uploads/2023/08/dao-khi-cat-ba-4.jpg" className="card-img-top ww-100 h-100 rounded" alt="..." />
                <div className='w-auto px-3 nameLocation'>Đảo khỉ</div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='position-relarive'>
              <div className="card" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <img src="https://catba.net.vn/wp-content/uploads/2023/07/kham-pha-vuon-quoc-gia-cat-ba-2.jpg" className="card-img-top ww-100 h-100 rounded" alt="..." />
                <div className='w-auto px-3 nameLocation'>Vườn Quốc Gia Cát Bà</div>
              </div>
            </SwiperSlide>

          </Swiper>

        </section>
        <section className='howToReach ' style={{ paddingTop: '10rem' }}>
          <div className="container">
            <p className='fw-bold' style={{ fontSize: '50px' }}>How to Reach</p>
            <p>Nibh tempor euismod nulla risus, elementum sed volutpat</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14912.190587153604!2d106.64655084924198!3d20.87012969183372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7a463c156bdb%3A0x61eb5d5557ce813d!2zU-G7nyBE4bqndSwgSOG7k25nIELDoG5nLCBI4bqjaSBQaMOybmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1708181622460!5m2!1svi!2s" style={{ border: 0, width: '100%', height: '450px' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </section>


        <section id='emptyroom' className='emptyroom py-5'>
          <div className="container ">
            <div className='text-center w-100'>
              <p className='listLocation'>Danh sách </p>
              <h2>Phòng trống</h2>
            </div>
            <div className='w-100 d-flex justify-content-end'>
              <button onClick={handleAllRoom} className='btnSeeAllRoom'>See All</button>
            </div>
            <div className="row mt-2 g-5">
              {room?.map((item, index) => {
                return (
                  <div key={index} className="col-12 col-md-6 col-lg-4 position-relative">
                    <div className="card border-0 rounded" style={{ width: '100%', height: '23rem' }}>
                      <div className="room h-100 w-100">
                        <img src={process.env.REACT_APP_IMAGE_PATH + `${item.image_path}`} className="card-img-top h-75 " alt="..." />
                      </div>
                      <div className='w-25 sale'>10%</div>
                      <div className=' price'>{item.rent_cost}</div>
                    </div>
                    <div className='roomDescription shadow rounded border-1 border'>
                      <p>Số người thuê tối đã: {item.max_number_people}</p>
                      <div className='d-flex align-item-center'>
                        <div>loại phòng: </div>
                        {item.type_room === '1' ? (<div className='d-flex align-items-center ms-3 text-danger fw-bold'>Phòng vip <i className="fa-solid fa-crown ms-3 text-warning"></i></div>) : (<div className='ms-3 text-primary'>Phòng thường</div>)}
                      </div>
                      <button onClick={() => handleRoom(item.id)} className='btn btn-warning text-white mt-3'>Chi tiết</button>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        </section>

        <section className='facilities pt-5'>
          <div className="container text-center">
            <p className='fw-bold' style={{ fontSize: '40px' }}>Facilities</p>
            <p className='w-75 mx-auto' style={{ fontSize: '20px' }}>Interdum curabitur platea turpis orci auctor in scelerisque ac ut eleifend at at leo laoreet at ut semper eget laoreet vestibulum a elementum nec</p>
            <div className="row g-5 mt-5">
              <div className="col-6 col-lg-3 text-center">
                <i className="fa-solid fa-square-parking text-primary mb-3" style={{ fontSize: '60px' }} />
                <p className='fw-bold' style={{ fontSize: '20px' }}>Free Parking</p>
              </div>
              <div className="col-6 col-lg-3 text-center">
                <i className="fa-solid fa-wifi text-primary mb-3" style={{ fontSize: '60px' }} />
                <p className='fw-bold' style={{ fontSize: '20px' }}>Free Wi-Fi</p>
              </div>
              <div className="col-6 col-lg-3 text-center">
                <i className="fa-solid fa-dog text-primary mb-3" style={{ fontSize: '60px' }} />
                <p className='fw-bold' style={{ fontSize: '20px' }}>Pet friendly</p>
              </div>
              <div className="col-6 col-lg-3 text-center">
                <i className="fa-solid fa-martini-glass-empty text-primary mb-3" style={{ fontSize: '60px' }} />
                <p className='fw-bold' style={{ fontSize: '20px' }}>Mini Bar</p>
              </div>
              <div className="col-6 col-lg-3 text-center">
                <i className="fa-solid fa-clock text-primary mb-3" style={{ fontSize: '60px' }} />
                <p className='fw-bold' style={{ fontSize: '20px' }}>24-Hours Front Desk</p>
              </div>
              <div className="col-6 col-lg-3 text-center">
                <i className="fa-solid fa-bus text-primary mb-3" style={{ fontSize: '60px' }} />
                <p className='fw-bold' style={{ fontSize: '20px' }}>Shuttle Bus Service</p>
              </div>
              <div className="col-6 col-lg-3 text-center">
                <i className="fa-solid fa-person-biking text-primary mb-3" style={{ fontSize: '60px' }} />
                <p className='fw-bold' style={{ fontSize: '20px' }}>Bicycle Rental</p>
              </div>
              <div className="col-6 col-lg-3 text-center">
                <i className="fa-solid fa-location-dot text-primary mb-3" style={{ fontSize: '60px' }} />
                <p className='fw-bold' style={{ fontSize: '20px' }}>Downtown Location</p>
              </div>
            </div>
          </div>
        </section>

        <section className='aboutUs mt-5'>
          <div className="container">
            <div className="row">
              <div className="col-md-7 col-sm-5 p-2 border border-2 shadow-lg" style={{ height: '30rem' }}>
                {/* <div className="" style={{height: '30rem'}}> */}
                <img src="images/beach.png" alt="" className='w-100 h-100 ' />
                {/* </div> */}
              </div>
              <div className="col-md-5 col-sm-7 p-5">
                <p className='textAboutUs'>Về chúng tôi</p>
                <h2 className='my-3'>Hãy làm cho chuyến nghỉ dưỡng của bạn thật tuyệt vời</h2>
                <p>Với những HomeStay đạt chuẩn 5*. Chúng tôi xin hân hạnh phục vụ bạn với những chuyến nghỉ dưỡng tuyệt vời nhất</p>
              </div>
            </div>
          </div>
        </section>


        <section className='comment mt-5'>
          <div className="divCommentDetail container text-white " style={{ zIndex: '2' }}>
            <p className='textComment text-center'>Danh sách</p>
            <p className='fw-bold text-center' style={{ fontSize: '40px' }}>Bình luận nổi bật</p>
            <div className="row mx-5 g-4">
              {comment?.map((item, index) => (
                <div className="col-md-4">
                  <div className="cardComment d-flex flex-column rounded bg-white" style={{ height: '15rem', width: '100%' }}>
                    <div className="commentDetail text-dark px-4 pt-4" style={{ flex: '7' }}>{item.content}</div>
                    <div className="userDetail d-flex  px-4 py-2" style={{ flex: '3' }}>

                      <img src={process.env.REACT_APP_API_BASE_URL + `/${item.avatar}`} alt="" className='avatar me-4' />

                      <div className="detail">
                        <p className='fw-bold' style={{ color: 'black' }}>{item.fullname}</p>
                        <p className='fw-bold' style={{ color: 'orange' }}>Thành viên</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
          <div className='h-100 w-100 bgcomment' ></div>
        </section>

        <section className='blog pt-5'>
          <div className="container ">
            <div className='text-center w-100'>
              <p className='listLocation'>Danh sách </p>
              <h2>Bài đăng gần đây</h2>
            </div>
            <div className="row mt-5 g-5">
              {blog?.map((item, index) => {
                return (
                  <div key={index} className="col-12 col-md-6 col-lg-4 position-relative mb-5">
                    <div className="card border-0 rounded" style={{ width: '100%', height: '23rem' }}>
                      <div className="room h-100 w-100">
                        <img src={process.env.REACT_APP_IMAGE_PATH + `/${item.image_path}`} className="card-img-top h-75 " alt="..." />
                      </div>
                    </div>
                    <div className='detailBlog shadow rounded border-1 border'>
                      <p>{item.content.length > 100 ? item.content.slice(0, 100) + '...' : item.content}</p>
                      {item.content.length > 100 && <button onClick={() => handleBlog(item.id)} className='btn btn-danger text-white'>Xem thêm</button>}
                    </div>
                  </div>

                )
              })}

            </div>
          </div>
        </section>

        <Contact />


      </main>
      <Footer />
    </div>
  );
}

export default App;
