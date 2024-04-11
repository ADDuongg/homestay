import React, { useState, useEffect } from 'react';
import Header from '../component/header';
import Footer from '../component/footer';
import SearchHotel from '../component/searchHotel';
import HotelInfomation from '../component/hotelinfomation';
import ContactComponent from '../component/contact';
import ReactPaginate from 'react-paginate';
import http from '../Axios';
const Room = () => {
    const [room, setRoom] = useState([]);
    const [perPage, setPerPage] = useState(5)
    const [searchValue, setSearchValue] = useState({
        type_room: '',
        max_number_people: '',
        rent_cost: '',
        status: ''
    })
    const [facilities, setFacilities] = useState([]);
    useEffect(() => {
        async function getRoom() {
            await http.get('/getroom')
                .then(res => {
                    setRoom(res.data.rooms.data);
                    setFacilities(res.data.room_facilities)
                    setPerPage(res.data.rooms.last_page)

                })
        }

        getRoom()

    }, [])
    async function handlePageClick(data) {
        var page = data.selected + 1
        await http.get(`/getroom?page=${page}&type_room=${searchValue.type_room}&max_number_people=${searchValue.max_number_people}&rent_cost=${searchValue.rent_cost}&status=${searchValue.status}`)
            .then(res => {
                var dataPagination = res.data.rooms
                var perPage = dataPagination.last_page

                setPerPage(perPage)
                setRoom(dataPagination.data)
                window.location.href = '#searchRoom';
            })

    }
    function handleRent(id) {
        window.location.href = `/detailRoom/${id}`
    }
    return (
        <div>
            <Header />
            <main className=''>
                <section className='imgRoom'>
                    <div className="roomText container text-white " style={{ zIndex: '2' }}>
                        <div className='w-75 mx-auto d-flex justify-content-between align-items-center'>
                            <p className='fw-bold' style={{ fontSize: '80px', flex: '5' }}>Rooms</p>
                            <p style={{ fontSize: '25px', flex: '5' }}>Eu quam vulputate mollis vitae egestas facilisi mauris urna faucibus suspendisse at tempor orci felis eu nascetur.</p>
                        </div>
                    </div>
                    <div className='h-100 w-100 bgroom' ></div>
                </section>

                <SearchHotel room={room} setRoom={setRoom} setSearchValue={setSearchValue} searchValue={searchValue} setPerPage={setPerPage} />

                <section className=' allroom pt-5 pb-3'>
                    <div className="container h-100 w-100">
                        <p className='hotelName  text-center' style={{ fontSize: '20px' }}>HT Hotel</p>
                        <p className='fw-bold text-center' style={{ fontSize: '35px' }}>Tìm một khách sạn bình dân hoàn hảo cho gia đình bạn ở Cát bà, hãy đến với chúng tôi</p>

                        <div className="row g-2 pt-5 " id='searchRoom'>
                            {room.length === 0 ? (<h3>Không có thông tin phòng</h3>) : room.map((item, index) => {
                                return (
                                    <div onClick={() => handleRent(item.id)} key={index} className="col-md-6 pb-5 px-0">
                                        <div className="cardRoom  mx-auto border-0 " style={{ width: '90%', height: 'auto' }}>
                                            <img src={process.env.REACT_APP_IMAGE_PATH + `${item.image_path}`} className="card-img-top " style={{ height: '400px' }} alt="..." />
                                            <div className="card-body pt-4">
                                                <div className='w-100 d-flex justify-content-between'>
                                                    <h5 className="card-title">Phòng: {item.name} Tầng: {item.floor}</h5>
                                                    <div className='d-flex'>
                                                        Giá thuê: <div className='priceRoom ps-2'>{item.rent_cost}</div>
                                                    </div>
                                                </div>
                                                <div className="container p-0 my-3">
                                                    <div className="row">
                                                        {facilities.map((facility, fIndex) => (
                                                            facility.room_id === item.id ?
                                                                <div className="col-md-4 d-flex align-items-center mt-2">
                                                                    <div className='fw-bold me-3' dangerouslySetInnerHTML={{ __html: facility.icon }} />
                                                                    <div> {facility.name}</div>
                                                                </div> :
                                                                null
                                                        ))}
                                                        {/* <div className="col-md-4 d-flex align-items-center">
                                                        <div className='fw-bold me-3' dangerouslySetInnerHTML={{ __html: facility.icon }} />
                                                        <div> {facility.name}</div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                                <a href="#" className="btn btn-primary">Đặt phòng</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                        <div className='w-100 d-flex justify-content-end'>
                            <ReactPaginate
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                breakLabel={'...'}
                                pageCount={perPage}

                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName='page-item'
                                previousLinkClassName='page-link'
                                nextClassName='page-item'
                                nextLinkClassName='page-link'
                                breakClassName='page-item'
                                breakLinkClassName='page-link'
                                activeClassName='active'
                            />
                        </div>
                    </div>
                </section>

                <HotelInfomation />
                <ContactComponent />

            </main>
            <Footer />
        </div>
    );
}

export default Room;
