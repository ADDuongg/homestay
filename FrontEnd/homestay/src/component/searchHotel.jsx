import React, { useState, useEffect } from 'react';
import http from '../Axios';
const SearchHotel = ({ room, setRoom, setSearchValue,
    searchValue,
    setPerPage }) => {
    console.log(room);

    function handleSearchValue(e) {
        var valueSearch = e.target.value
        setSearchValue({
            ...searchValue, [e.target.name]: valueSearch
        })
    }

    async function handleSearch() {
        const url = `/getroom?limit=4&type_room=${searchValue.type_room}&max_number_people=${searchValue.max_number_people}&rent_cost=${searchValue.rent_cost}&status=${searchValue.status}`;
        await http.get(url)
            .then(res => {
                var dataPagination = res.data.rooms
                var dataUser = dataPagination.data
                var perPage = dataPagination.last_page
                setRoom(dataUser)
                setPerPage(perPage)
                window.location.href = '#searchRoom';
            })
    }
    return (
        <div>
            <section className='searchHomestay my-5 '>
                <div className="container py-4 shadow">
                    <div className="row  px-0 g-4">

                        <div className="col-12 col-lg">
                            <p style={{ color: 'orange', fontWeight: 'bold' }}>Loại phòng</p>
                            <select onChange={handleSearchValue} name="type_room" id="" className='form-select'>
                                <option value="">--- Chọn loại phòng ---</option>
                                <option value="1">Phòng VIP</option>
                                <option value="0">Phòng Thường</option>
                            </select>
                        </div>
                        <div className="col-12 col-lg">
                            <p style={{ color: 'orange', fontWeight: 'bold' }}>Số lượng người</p>
                            <select onChange={handleSearchValue} name="max_number_people" id="" className='form-select'>
                                <option value="">--- Chọn số lượng người ---</option>
                                {[...Array(10)].map((_, index) => (
                                    <option key={index + 1} value={index + 1}>{index + 1} người</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 col-lg">
                            <p style={{ color: 'orange', fontWeight: 'bold' }}>Trạng thái</p>
                            <select onChange={handleSearchValue} name="status" id="" className='form-select'>
                                <option value="">--- Chọn trạng thái ---</option>
                                <option value="0">Đang trống</option>
                                <option value="1">Đang thuê</option>
                            </select>
                        </div>
                        <div className="col-12 col-lg">
                            <p style={{ color: 'orange', fontWeight: 'bold' }}>Mức giá</p>
                            <select onChange={handleSearchValue} name="rent_cost" id="" className='form-select'>
                                <option value="">--- Chọn mức giá ---</option>
                                <option value="500">0 - 500.000</option>
                                <option value="500-1500">500.000 - 1.500.000</option>
                                <option value="1500-3000">1.500.000 - 3.000.000</option>
                                <option value="3000">Trên 3.000.000</option>
                            </select>
                        </div>
                        <div className="col-12 col-lg">
                            <button onClick={handleSearch} className='btn btn-success h-100 w-100'>SEARCH</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SearchHotel;
