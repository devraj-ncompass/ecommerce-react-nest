import React, { useState } from 'react';
import Navbar from '../Components/Home/Navbar';
import ProductsGrid from '../Components/Home/ProductGrid';
import PaginationComponent from '../Components/Home/Pagination';
import LoginModal from '../Components/Auth/LoginModal';
import SortAndFilter from '../Components/Home/SortAndFilter';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(135);
    const [searchQuery, setSearchQuery] = useState('');
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [sort, setSort] = useState('');
    const [filter, setFilter] = useState('');

    const handleLoginClick = () => {
        setLoginModalOpen(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        window.location.reload();
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setLoginModalOpen(false);
        window.location.reload();
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} handleLoginClick={handleLoginClick} handleLogout={handleLogout} setSearchQueryProp={setSearchQuery} page="home" />
            <SortAndFilter setSort={setSort} setFilter={setFilter} />
            <ProductsGrid currentPage={currentPage} searchQuery={searchQuery} sort={sort} filter={filter} />
            <PaginationComponent totalPages={totalPages} currentPage={currentPage} handleChange={handlePageChange} />
            <LoginModal open={loginModalOpen} handleClose={() => setLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />
        </div>
    );
};

export default HomePage;
